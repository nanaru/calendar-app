import { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore, getDoc } from 'firebase/firestore';
import { AgendaSchedule } from 'constants/AgendaSchedule';
import { AgendaEntry } from 'constants/AgendaEntry';
import { TrainingMenu } from 'constants/TrainingMenu';
import { TrainingMenuKind } from 'constants/TrainingMenuKind';
import { Set } from 'constants/Set';
import { RmKind, RmPoint } from 'constants/RmKind';

const useHooks = () => {
  const [agendaSchedule, setAgendaSchedule] = useState<AgendaSchedule>({});
  const [isValidQuery, setIsValidQuery] = useState(false);

  // トレーニングサマリーを取得する
  const fetchTrainingSummaries = async () => {
    const firestore = getFirestore();
    // 単一ドキュメントの取得
    // const docRef = doc(
    //   firestore,
    //   '/users/1805/training_histories/2023-02-13/menus',
    //   'vWsbs6QktxB5mRYwVDRA',
    // );
    // getDoc(docRef).then((snapshot) => {
    //   console.log(snapshot.data()?.memo);
    //   // リレーション先の取得
    //   getDoc(snapshot.data()?.menu_id).then((s) => {
    //     console.log(s.data()?.path);
    //   });
    // });

    // 複数ドキュメントの取得
    const coll = collection(firestore, '/users/1805/training_histories');
    const snapshot = await getDocs(coll);

    // 日付ごとにレンダリング用のデータを整形する
    for (let row = 0; row < snapshot.docs.length; row++) {
      let agendaEntries = new Array<AgendaEntry>();
      const dayDoc = snapshot.docs[row];

      const trainigMenusOfDay = dayDoc.data().menus as unknown as TrainingMenu[];
      // メニューごとにレンダリング用のデータを整形する
      for (let col = 0; col < trainigMenusOfDay.length; col++) {
        const menu = trainigMenusOfDay[col];
        // リレーション先の取得
        const trainingMenuDoc = await getDoc(menu.menu_id);
        const trainigMenuKind = trainingMenuDoc.data() as unknown as TrainingMenuKind;
        agendaEntries.push({
          title: trainigMenuKind.name,
          subTitle: setMenuSubTitle(menu.set, trainigMenuKind.rm_kind),
          content: setMenuContent(menu.set, menu.memo),
          iconPath: trainigMenuKind.path,
        });
      }
      setAgendaSchedule((agendaSchedule) => {
        return { ...agendaSchedule, [dayDoc.id]: agendaEntries };
      });
    }
    console.log(JSON.stringify(agendaSchedule));
    return agendaSchedule;
  };

  // レンダリング用のsubTitleを生成する
  const setMenuSubTitle = (set: Set[], rmKind: RmKind | undefined) => {
    let subTitle: string;
    subTitle = `${set.length}セット / `;

    // 総ボリュームの計算をする
    let totalVolume = 0;
    let maxVolume = 0;
    let maxWeight = 0;
    for (let index = 0; index < set.length; index++) {
      const volume = set[index].weight * set[index].reps;
      totalVolume += volume;

      // 最大ボリュームと最大重量をRM計算用に保持しておく
      if (maxVolume < volume) {
        maxVolume = volume;
        maxWeight = set[index].weight;
      }
    }
    subTitle += `ボリューム ${totalVolume.toFixed(2)}kg`;

    // ベンチプレス・スクワット・デッドリフトの場合、RMを計算する
    let rm = 0;
    if (rmKind !== undefined) {
      rm = Math.floor(maxVolume / RmPoint(rmKind) + maxWeight);
      subTitle += ` / 1RM ${rm}kg`;
    }
    return subTitle;
  };

  // レンダリング用のcontentを生成する
  const setMenuContent = (set: Set[], memo: string) => {
    let content: string;
    content = `■ 記録${'\n\n'}`;
    for (let index = 0; index < set.length; index++) {
      content += `${index + 1}セット目  ${set[index].weight}kg  ${set[index].reps}reps${'\n'}`;
    }
    content += `${'\n\n'}■ メモ${'\n\n'}${memo}`;

    return content;
  };

  useEffect(() => {
    (async () => {
      await fetchTrainingSummaries();
      setIsValidQuery(true);
    })();
  }, []);

  return { agendaSchedule, isValidQuery };
};

export default useHooks;

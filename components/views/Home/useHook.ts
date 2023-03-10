import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  getDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { AgendaSchedule } from 'constants/AgendaSchedule';
import { AgendaEntry } from 'constants/AgendaEntry';
import { TrainingMenu } from 'constants/TrainingMenu';
import { TrainingMenuKind, TrainingMenuKindsInSelectBox } from 'constants/TrainingMenuKind';
import { Set } from 'constants/Set';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'constants/rootStackParamList';
import { auth } from 'src/.env';
import { RmKind, RmPoint } from 'constants/RmKind';
import { toHyphenDateFormat } from 'constants/util';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

const useHooks = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const [agendaSchedule, setAgendaSchedule] = useState<AgendaSchedule>({});
  const [isValidQuery, setIsValidQuery] = useState(false);
  const [date, setDate] = useState(
    route.params?.date !== undefined ? route.params.date : toHyphenDateFormat(new Date()),
  );
  const [fetchedMonthList, setFetchedMonthList] = useState<string[]>([]);
  const [trainingDicInSelectBox, setTrainingDicInSelectBox] = useState<
    TrainingMenuKindsInSelectBox[]
  >([]);

  // トレーニング種目一覧の取得
  const fetchTrainingMenuKinds = async () => {
    const firestore = getFirestore();
    const coll = collection(firestore, '/training_menu_dictionaries');
    const q = query(coll, orderBy('name'));
    const snapshot = await getDocs(q);

    for (let row = 0; row < snapshot.docs.length; row++) {
      const trainingMenuDoc = snapshot.docs[row];
      setTrainingDicInSelectBox((old) => [
        ...old,
        {
          docId: `/training_menu_dictionaries/${trainingMenuDoc.id}`,
          trainingMenuKind: trainingMenuDoc.data() as unknown as TrainingMenuKind,
        },
      ]);
    }
  };

  // トレーニングサマリーを取得する
  const fetchTrainingSummaries = async (year: number, monthIndex: number) => {
    // 既に該当月のトレーニングメニューを取得している場合は、ここで処理を終了する
    if (fetchedMonthList.includes(`${year}-${monthIndex}`)) {
      return;
    }
    setFetchedMonthList([...fetchedMonthList, `${year}-${monthIndex}`]);
    // 開始日の算出
    const startDay = new Date(year, monthIndex - 1, 1);
    const endDay = new Date(year, monthIndex, 1);

    const firestore = getFirestore();
    const currentUser = auth().currentUser;
    if (currentUser === null) {
      return;
    }
    // 日付ごとにデータを取得する
    for (let d = startDay; d < endDay; d.setDate(d.getDate() + 1)) {
      const formatedDay = toHyphenDateFormat(d);
      const coll = collection(
        firestore,
        `/users/${currentUser.uid}/training_histories/${formatedDay}/menus`,
      );
      const q = query(coll, orderBy('sort_at'));
      const snapshot = await getDocs(q);
      let agendaEntries = new Array<AgendaEntry>();
      // トレーニングメニュー毎にループする
      for (let row = 0; row < snapshot.docs.length; row++) {
        const menuDoc = snapshot.docs[row];
        const menu = menuDoc.data() as unknown as TrainingMenu;
        // リレーション先の取得
        const docRef = doc(firestore, menu.menu_id);
        const trainingMenuDoc = await getDoc(docRef);
        const trainigMenuKind = trainingMenuDoc.data() as unknown as TrainingMenuKind;

        agendaEntries.push({
          docId: menuDoc.id,
          date: formatedDay,
          title: trainigMenuKind.name,
          subTitle: setMenuSubTitle(menu.set, trainigMenuKind.rm_kind),
          content: setMenuContent(menu.set, menu.memo),
          color: trainigMenuKind.color,
          trainingMenu: menu,
        });
      }
      setAgendaSchedule((agendaSchedule) => {
        return { ...agendaSchedule, [formatedDay]: agendaEntries };
      });
    }
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
      const volume = Number(set[index].weight) * Number(set[index].reps);
      totalVolume += volume;

      // 最大ボリュームと最大重量をRM計算用に保持しておく
      if (maxVolume < volume) {
        maxVolume = volume;
        maxWeight = Number(set[index].weight);
      }
    }
    subTitle += `ボリューム ${totalVolume.toFixed(2)}kg`;

    // ベンチプレス・スクワット・デッドリフトの場合、RMを計算する
    let rm = 0;
    if (rmKind !== undefined) {
      rm = Math.floor(maxVolume / RmPoint(rmKind) + maxWeight);
      subTitle += ` / 1RM ${rm.toFixed(1)}kg`;
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

  // トレーニングメニューを削除する
  const deleteTrainingMenu = (date: string, docId: string) => {
    const currentUser = auth().currentUser;
    if (currentUser === null) {
      return;
    }
    // firebaseから削除する
    const firestore = getFirestore();
    const docRef = doc(
      firestore,
      `/users/${currentUser.uid}/training_histories/${date}/menus/${docId}`,
    );
    deleteDoc(docRef);

    // stateから削除する
    const resizedAgendaSchedule = agendaSchedule[date].filter((agenda) => {
      if (agenda.docId !== docId) return agenda;
    });

    setAgendaSchedule((agendaSchedule) => {
      return { ...agendaSchedule, [date]: resizedAgendaSchedule };
    });
  };
  useEffect(() => {
    (async () => {
      await requestTrackingPermissionsAsync();
      await fetchTrainingMenuKinds();
      setIsValidQuery(true);
    })();
  }, []);

  return {
    agendaSchedule,
    isValidQuery,
    date,
    setDate,
    trainingDicInSelectBox,
    fetchTrainingSummaries,
    deleteTrainingMenu,
  };
};

export default useHooks;

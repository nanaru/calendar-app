import { useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { collection, getFirestore, addDoc } from 'firebase/firestore';
import { TrainingMenu } from 'constants/TrainingMenu';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { auth } from '../../../.env';
import { setDefaulSetAndRepList } from 'constants/util';
import { RootStackParamList } from 'constants/rootStackParamList';
import { toHyphenDateFormat } from 'constants/util';

const useHooks = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'NewTrainingMenuForm'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'NewTrainingMenuForm'>>();
  const [date, setDate] = useState(route.params.date);
  const trainingDicInSelectBox = route.params.trainingDicInSelectBox;
  const [trainingMenu, setTrainingMenu] = useState<TrainingMenu>({
    menu_id: '',
    memo: '',
    sort_at: 0,
    set: setDefaulSetAndRepList(),
  });
  const [isValidQuery, setIsValidQuery] = useState(false);

  // 日付の選択
  const handleChangeInTrainingDate = (inputValue: Date) => {
    setDate(toHyphenDateFormat(inputValue));
  };

  // 種目の選択
  const handleChangeInTrainingMenu = (inputValue: string) => {
    setTrainingMenu((trainingMenu) => ({ ...trainingMenu, menu_id: inputValue }));
  };

  // 記録の入力（重さ）
  const handleInputInWeight = (inputValue: number, key: number) => {
    let tmpSets = trainingMenu.set;
    for (let index = 0; index < tmpSets.length; index++) {
      if (tmpSets[index].sort_at === key) {
        tmpSets[index] = {
          weight: inputValue,
          reps: tmpSets[index].reps,
          sort_at: tmpSets[index].sort_at,
        };
      } else {
        tmpSets[index] = tmpSets[index];
      }
    }
    setTrainingMenu((trainingMenu) => ({ ...trainingMenu, set: tmpSets }));
  };

  // 記録の入力（回数）
  const handleInputInRep = (inputValue: number, key: number) => {
    let tmpSets = trainingMenu.set;
    for (let index = 0; index < tmpSets.length; index++) {
      if (tmpSets[index].sort_at === key) {
        tmpSets[index] = {
          weight: tmpSets[index].weight,
          reps: inputValue,
          sort_at: tmpSets[index].sort_at,
        };
      } else {
        tmpSets[index] = tmpSets[index];
      }
    }
    setTrainingMenu((trainingMenu) => ({ ...trainingMenu, set: tmpSets }));
  };

  // メモの入力
  const handleInputInTrainingMemo = (inputValue: string) => {
    setTrainingMenu((trainingMenu) => ({ ...trainingMenu, memo: inputValue }));
  };

  // 保存処理
  const save = async () => {
    setIsValidQuery(true);
    const currentUser = auth().currentUser;
    if (currentUser === null) {
      setIsValidQuery(false);
      return;
    }
    // 回数または重量の記入があるセットのみ抽出する
    const resizedSets = trainingMenu.set.filter((item) => item.reps > 0 || item.weight > 0);

    const firestore = getFirestore();
    const coll = collection(
      firestore,
      `/users/${currentUser.uid}/training_histories/${date}/menus`,
    );
    await addDoc(coll, {
      menu_id: trainingMenu.menu_id,
      memo: trainingMenu.memo,
      sort_at: trainingMenu.sort_at,
      set: resizedSets,
    });
    setIsValidQuery(false);
    navigation.reset({ index: 0, routes: [{ name: 'Home', params: { date: date } }] });
  };

  return {
    date,
    isValidQuery,
    trainingMenu,
    trainingDicInSelectBox,
    handleChangeInTrainingDate,
    handleChangeInTrainingMenu,
    handleInputInWeight,
    handleInputInRep,
    handleInputInTrainingMemo,
    save,
  };
};

export default useHooks;

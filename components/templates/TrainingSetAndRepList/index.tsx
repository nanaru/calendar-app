import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FormControl } from 'native-base';
import TrainingSetAndRepItemInput from 'components/parts/TrainingSetAndRepItemInput';
import { DEFALUT_SET_COUNTS } from 'constants/const';
import { Set } from 'constants/Set';

export type Props = {
  sets: Set[];
  handleInputInWeight: (inputValue: number, key: number) => void;
  handleInputInRep: (inputValue: number, key: number) => void;
};

const TrainingSetAndRepList: FC<Props> = ({ sets, handleInputInWeight, handleInputInRep }) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      textAlign: 'left',
    },
    selectInput: {
      borderColor: 'gray',
      alignItems: 'flex-start',
      borderWidth: 0,
      borderBottomWidth: 1,
      width: '100%',
    },
    background: {
      paddingHorizontal: 20,
      paddingVertical: 25,
      backgroundColor: 'white',
    },
  });
  const TrainingSetAndRepItemList = () => {
    const list = [];
    for (let index = 0; index < DEFALUT_SET_COUNTS; index++) {
      list.push(
        <TrainingSetAndRepItemInput
          key={index}
          setNumber={index + 1}
          weight={sets[index].weight !== 0 ? sets[index].weight : undefined}
          reps={sets[index].reps !== 0 ? sets[index].reps : undefined}
          handleInputInWeight={handleInputInWeight}
          handleInputInRep={handleInputInRep}
        />,
      );
    }
    return list;
  };
  return (
    <FormControl style={styles.background}>
      <FormControl.Label>■ 記録</FormControl.Label>
      {TrainingSetAndRepItemList()}
    </FormControl>
  );
};

export default TrainingSetAndRepList;

import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, TextArea } from 'native-base';

export type Props = {
  memo: string;
  handleInputInTrainingMemo: (itemValue: string) => void;
};

const TrainingMemo: FC<Props> = ({ memo, handleInputInTrainingMemo }) => {
  const styles = StyleSheet.create({
    input: {
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
  return (
    <FormControl style={styles.background}>
      <FormControl.Label>■ メモ</FormControl.Label>
      <TextArea
        autoCompleteType={undefined}
        h={20}
        variant='unstyled'
        style={styles.input}
        onChangeText={(value: string) => {
          handleInputInTrainingMemo(value);
        }}
        value={memo}
      />
    </FormControl>
  );
};

export default TrainingMemo;

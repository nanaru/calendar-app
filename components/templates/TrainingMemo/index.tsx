import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, TextArea } from 'native-base';

export type Props = {
  memo: string;
  errors: object;
  handleInputInTrainingMemo: (itemValue: string) => void;
};

const TrainingMemo: FC<Props> = ({ memo, errors, handleInputInTrainingMemo }) => {
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
    <FormControl style={styles.background} isInvalid={'memo' in errors}>
      <FormControl.Label>■ メモ（任意:140文字以内）</FormControl.Label>
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
      {'memo' in errors ? (
        <FormControl.ErrorMessage>{errors.memo}</FormControl.ErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export default TrainingMemo;

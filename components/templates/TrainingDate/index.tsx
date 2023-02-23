import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FormControl } from 'native-base';
import DatePicker from '@react-native-community/datetimepicker';

export type Props = {
  date: string;
  handleChangeInDate: (inputValue: Date) => void;
};

const TrainingDate: FC<Props> = ({ date, handleChangeInDate }) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start',
      paddingVertical: 10,
    },
    background: {
      paddingHorizontal: 20,
      paddingVertical: 25,
      backgroundColor: 'white',
    },
  });

  return (
    <FormControl style={styles.background}>
      <FormControl.Label>■ 日付</FormControl.Label>
      <DatePicker
        value={new Date(date)}
        mode='date'
        display='inline'
        locale='ja'
        accentColor='#00BFFF'
        minimumDate={new Date(2000, 1, 1)}
        maximumDate={new Date(2099, 1, 1)}
        onChange={(_event, date?: Date) => {
          if (date !== undefined) {
            handleChangeInDate(date);
          }
        }}
        style={styles.container}
      />
    </FormControl>
  );
};

export default TrainingDate;

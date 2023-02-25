import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Input } from 'native-base';
import DatePicker from '@react-native-community/datetimepicker';

export type Props = {
  defaultDate: string;
  disabled: boolean;
  errors: object;
  handleChangeInDate?: (inputValue: Date) => void;
};

const TrainingDate: FC<Props> = ({ defaultDate, disabled, errors, handleChangeInDate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start',
      paddingVertical: 10,
    },
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
    <FormControl style={styles.background} isInvalid={'date' in errors}>
      <FormControl.Label>■ 日付</FormControl.Label>
      <Input
        variant='unstyled'
        style={styles.input}
        value={defaultDate}
        isDisabled={disabled}
        onFocus={() => setIsVisible(true)}
      />
      {isVisible ? (
        <DatePicker
          value={new Date(defaultDate)}
          mode='date'
          display='spinner'
          locale='ja'
          minimumDate={new Date(2000, 1, 1)}
          maximumDate={new Date(2099, 1, 1)}
          onChange={(_event, date?: Date) => {
            if (date !== undefined && handleChangeInDate !== undefined && !disabled) {
              handleChangeInDate(date);
              setIsVisible(false);
            }
          }}
        />
      ) : null}
      {'date' in errors ? (
        <FormControl.ErrorMessage>{errors.date}</FormControl.ErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export default TrainingDate;

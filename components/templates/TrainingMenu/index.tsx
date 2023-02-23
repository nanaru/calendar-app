import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormControl, Select, CheckIcon } from 'native-base';
import { TrainingMenuKindsInSelectBox } from 'constants/TrainingMenuKind';

export type Props = {
  trainingDicInSelectBox: TrainingMenuKindsInSelectBox[];
  handleChangeInTrainingMenu: (itemValue: string) => void;
};

const TrainingMenu: FC<Props> = ({ trainingDicInSelectBox, handleChangeInTrainingMenu }) => {
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

  return (
    <FormControl style={styles.background} isRequired={true}>
      <FormControl.Label>■ 種目名</FormControl.Label>
      <Select
        accessibilityLabel='Choose Service'
        _selectedItem={{
          endIcon: <CheckIcon size='5' color='rose.400' />,
        }}
        onValueChange={(itemValue) => handleChangeInTrainingMenu(itemValue)}
        variant='unstyled'
        style={styles.selectInput}
        dropdownIcon={<View />}
      >
        {trainingDicInSelectBox.map((dic, key) => {
          return <Select.Item key={key} label={dic.trainingMenuKind.name} value={dic.docId} />;
        })}
      </Select>
    </FormControl>
  );
};

export default TrainingMenu;

import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormControl, Select, CheckIcon } from 'native-base';
import { TrainingMenuKindsInSelectBox } from 'constants/TrainingMenuKind';

export type Props = {
  selectedItem?: string;
  errors: object;
  trainingDicInSelectBox: TrainingMenuKindsInSelectBox[];
  handleChangeInTrainingMenu: (itemValue: string) => void;
};

const TrainingMenu: FC<Props> = ({
  selectedItem,
  errors,
  trainingDicInSelectBox,
  handleChangeInTrainingMenu,
}) => {
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
    <FormControl style={styles.background} isInvalid={'menu_id' in errors}>
      <FormControl.Label>■ 種目名</FormControl.Label>
      <Select
        selectedValue={selectedItem}
        onValueChange={(itemValue) => handleChangeInTrainingMenu(itemValue)}
        variant='unstyled'
        style={styles.selectInput}
        dropdownIcon={<View />}
      >
        {trainingDicInSelectBox.map((dic, key) => {
          return <Select.Item key={key} label={dic.trainingMenuKind.name} value={dic.docId} />;
        })}
      </Select>
      {'menu_id' in errors ? (
        <FormControl.ErrorMessage>{errors.menu_id}</FormControl.ErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export default TrainingMenu;

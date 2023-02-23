import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputGroup, Stack, InputLeftAddon, InputRightAddon } from 'native-base';

export type Props = {
  setNumber: number;
  weight?: number;
  reps?: number;
  handleInputInWeight: (inputValue: number, key: number) => void;
  handleInputInRep: (inputValue: number, key: number) => void;
};

const TrainingSetAndRepItemInput: FC<Props> = ({
  setNumber,
  weight,
  reps,
  handleInputInWeight,
  handleInputInRep,
}) => {
  const styles = StyleSheet.create({
    input: {
      borderColor: 'gray',
      alignItems: 'flex-start',
      borderWidth: 0,
      borderBottomWidth: 1,
    },
    label: {
      borderWidth: 0,
      backgroundColor: 'white',
    },
  });

  return (
    <Stack alignItems='left'>
      <InputGroup
        w={{
          base: '70%',
          md: '285',
        }}
        variant='unstyled'
      >
        <InputLeftAddon children={`${setNumber}セット目`} style={styles.label} />
        <Input
          w={{
            base: '30%',
            md: '100%',
          }}
          value={weight?.toString()}
          variant='unstyled'
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(value: string) => {
            handleInputInWeight(value as unknown as number, setNumber - 1);
          }}
        />
        <InputRightAddon children={'kg'} style={styles.label} />
        <Input
          w={{
            base: '30%',
            md: '100%',
          }}
          value={reps?.toString()}
          variant='unstyled'
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(value: string) => {
            handleInputInRep(value as unknown as number, setNumber - 1);
          }}
        />
        <InputRightAddon children={'reps'} style={styles.label} />
      </InputGroup>
    </Stack>
  );
};

export default TrainingSetAndRepItemInput;

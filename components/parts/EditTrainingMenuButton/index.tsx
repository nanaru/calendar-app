import React, { FC } from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';
import { Button } from '@rneui/themed';

export type Props = {
  onPress: (e: GestureResponderEvent) => void;
  onPressOut: (e: GestureResponderEvent) => void;
};

const EditTrainingMenuButton: FC<Props> = ({ onPress, onPressOut }) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'deepskyblue',
    },
  });

  return (
    <Button
      title='Edit'
      onPress={onPress}
      onPressOut={onPressOut}
      icon={{ name: 'edit', color: 'white' }}
      buttonStyle={styles.container}
    />
  );
};

export default EditTrainingMenuButton;

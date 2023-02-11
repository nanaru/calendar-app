import React, { FC } from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';
import { Button } from '@rneui/themed';

export type Props = {
  onPress: (e: GestureResponderEvent) => void;
};

const DeleteTrainingMenuButton: FC<Props> = ({ onPress }) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    },
  });

  return (
    <Button
      title='Delete'
      onPress={onPress}
      icon={{ name: 'delete', color: 'white' }}
      buttonStyle={styles.container}
    />
  );
};

export default DeleteTrainingMenuButton;

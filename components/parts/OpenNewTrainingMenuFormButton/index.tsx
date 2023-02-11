import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Fab } from 'native-base';
import { Icon } from '@rneui/themed';

export type Props = {
  onPress: (e: GestureResponderEvent) => void;
};

const OpenNewTrainingMenuFormButton: FC<Props> = ({ onPress }) => {
  return (
    <Fab
      renderInPortal={false}
      bg='rose.400'
      shadow={8}
      right={30}
      bottom={30}
      size='sm'
      onPress={onPress}
      icon={<Icon color='white' name='add' size={25} />}
    />
  );
};

export default OpenNewTrainingMenuFormButton;

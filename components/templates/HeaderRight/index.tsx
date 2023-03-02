import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Menu, Pressable } from 'native-base';
import { Avatar } from '@rneui/themed';
import useHooks from './useHook';

type Props = {
  isAnonymous: boolean;
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 120,
  },
});

const HeaderRight: FC<Props> = ({ isAnonymous }) => {
  const { handleToSignUp, handleSignOut, onPressAlert } = useHooks();

  return (
    <View style={styles.iconContainer}>
      <Menu
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel='More options menu' {...triggerProps}>
              <Avatar
                icon={{ name: 'account', size: 24 }}
                rounded
                containerStyle={{ backgroundColor: '#575757' }}
              />
            </Pressable>
          );
        }}
        placement='bottom'
      >
        {isAnonymous ? (
          <Menu.Item onPress={() => handleToSignUp()}>アカウント登録</Menu.Item>
        ) : (
          <>
            <Menu.Item onPress={() => handleSignOut()}>
              <Text>ログアウト</Text>
            </Menu.Item>
            <Menu.Item onPress={() => onPressAlert()}>
              <Text style={{ color: 'red' }}>アカウント削除</Text>
            </Menu.Item>
          </>
        )}
      </Menu>
    </View>
  );
};

export default HeaderRight;

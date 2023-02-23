import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
  isLoading: boolean;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 5,
  },
});

const Loading: FC<Props> = ({ isLoading }) => {
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : null;
};

export default Loading;

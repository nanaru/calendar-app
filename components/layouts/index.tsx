import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/HomeScreen';
import NewTrainingMenuFormScreen from 'screens/NewTrainingMenuFormScreen';
import { RootStackParamList } from 'constants/rootStackParamList';

const Layout = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <View style={{ height: '100%' }}>
          {/* ルーティング */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ headerTitle: 'ホーム' }}
              />
              <Stack.Screen
                name='NewTrainingMenuForm'
                component={NewTrainingMenuFormScreen}
                options={{ headerTitle: 'トレーニング追加' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Layout;

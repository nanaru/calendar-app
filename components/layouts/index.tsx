import React from 'react';
import { View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/HomeScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import NewTrainingMenuFormScreen from 'screens/NewTrainingMenuFormScreen';
import EditTrainingMenuFormScreen from 'screens/EditTrainingMenuFormScreen';
import { RootStackParamList } from 'constants/rootStackParamList';
import { initializeFirebase } from '../../.env';

initializeFirebase();

const Layout = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NativeBaseProvider>
      <View style={{ height: '100%' }}>
        {/* ルーティング */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='SignIn'
            screenOptions={{
              headerStyle: {
                backgroundColor: '#33B7D3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{ headerTitle: 'ログイン' }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUpScreen}
              options={{ headerTitle: '新規登録' }}
            />
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerTitle: 'ホーム' }} />
            <Stack.Screen
              name='NewTrainingMenuForm'
              component={NewTrainingMenuFormScreen}
              options={{ headerTitle: 'トレーニング追加' }}
            />
            <Stack.Screen
              name='EditTrainingMenuForm'
              component={EditTrainingMenuFormScreen}
              options={{ headerTitle: 'トレーニング編集' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </NativeBaseProvider>
  );
};

export default Layout;

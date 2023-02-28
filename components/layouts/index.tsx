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
import { initializeFirebase } from 'src/.env';
import HeaderRight from 'components/templates/HeaderRight';
import useHooks from './useHook';

initializeFirebase();

const Layout = () => {
  const { isAnonymous } = useHooks();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NativeBaseProvider>
      <View style={{ height: '100%' }}>
        {/* ルーティング */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerStyle: {
                backgroundColor: '#33B7D3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => <HeaderRight isAnonymous={isAnonymous} />,
            }}
          >
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{ headerTitle: 'ログイン', headerRight: () => undefined }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUpScreen}
              options={{ headerTitle: '新規登録', headerRight: () => undefined }}
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

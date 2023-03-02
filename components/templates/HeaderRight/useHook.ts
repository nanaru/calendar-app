import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'constants/rootStackParamList';
import { signOut, deleteUser } from 'firebase/auth';
import { auth } from 'src/.env';

const useHooks = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  // サインアップ画面へ遷移
  const handleToSignUp = () => {
    navigation.navigate('SignUp');
  };

  // サインアウト
  const handleSignOut = () => {
    try {
      // ユーザーをサインアウト
      signOut(auth()).then(() => {
        // サインアウト後ログイン画面に遷移
        navigation.replace('SignIn');
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const onPressAlert = () => {
    Alert.alert('アカウントの削除', 'アカウントの削除を行います。よろしいですか。', [
      { text: 'はい', onPress: () => handleDeleteAuth() },
      {
        text: 'いいえ',
        style: 'cancel',
      },
    ]);
  };

  const handleDeleteAuth = () => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser === null) {
        return;
      }
      // ユーザーをサインアウト
      deleteUser(currentUser).then(() => {
        // サインアウト後サインアップ画面に遷移
        navigation.replace('SignUp');
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
  return { handleToSignUp, handleSignOut, onPressAlert };
};

export default useHooks;

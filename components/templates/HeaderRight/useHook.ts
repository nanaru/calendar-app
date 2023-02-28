import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'constants/rootStackParamList';
import { signOut } from 'firebase/auth';
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
  return { handleToSignUp, handleSignOut };
};

export default useHooks;

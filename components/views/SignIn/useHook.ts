import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../.env';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'constants/rootStackParamList';

const useHooks = () => {
  // メールアドレス入力用
  const [email, setEmail] = useState('');
  // パスワード入力用
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), (user) => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      }
    });
    return unsubscribe;
  }, []);
  // メールアドレス入力
  const handleChangeInEmail = (inputValue: string) => {
    setEmail(inputValue);
  };

  // パスワード入力
  const handleChangeInPassword = (inputValue: string) => {
    setPassword(inputValue);
  };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();
  // SignIn処理
  const handleSignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth(), email, password);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  // 新規登録画面への遷移
  const handleLinkToSignUp = () => {
    navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] });
  };

  return {
    email,
    password,
    handleSignIn,
    handleChangeInEmail,
    handleChangeInPassword,
    handleLinkToSignUp,
  };
};

export default useHooks;

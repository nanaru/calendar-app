import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'constants/rootStackParamList';
import { auth } from '../../../.env';

const useHooks = () => {
  // メールアドレス入力用
  const [email, setEmail] = useState('');
  // パスワード入力用
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();

  // メールアドレス入力
  const handleChangeInEmail = (inputValue: string) => {
    setEmail(inputValue);
  };

  // パスワード入力
  const handleChangeInPassword = (inputValue: string) => {
    setPassword(inputValue);
  };

  // SignUp処理
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth(), email, password);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  // ログイン画面への遷移
  const handleLinkToSignIn = () => {
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  };

  return {
    email,
    password,
    handleRegister,
    handleChangeInEmail,
    handleChangeInPassword,
    handleLinkToSignIn,
  };
};

export default useHooks;

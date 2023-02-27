import { useState } from 'react';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'constants/rootStackParamList';
import { auth } from '../../../.env';

const useHooks = () => {
  // メールアドレス入力用
  const [email, setEmail] = useState('');
  // パスワード入力用
  const [password, setPassword] = useState('');
  const [isValidQuery, setIsValidQuery] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>();

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
      setIsValidQuery(true);
      const currentUser = auth().currentUser;
      if (currentUser === null) {
        setIsValidQuery(false);
        return;
      }

      // 匿名ユーザと紐付け
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(currentUser, credential);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    } finally {
      setIsValidQuery(false);
    }
  };

  // ログイン画面への遷移
  const handleLinkToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return {
    email,
    password,
    isValidQuery,
    handleRegister,
    handleChangeInEmail,
    handleChangeInPassword,
    handleLinkToSignIn,
  };
};

export default useHooks;

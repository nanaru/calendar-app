import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../.env';

const useHooks = () => {
  // メールアドレス入力用
  const [email, setEmail] = useState('');
  // パスワード入力用
  const [password, setPassword] = useState('');

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
      const user = await createUserWithEmailAndPassword(auth(), email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { email, password, handleRegister, handleChangeInEmail, handleChangeInPassword };
};

export default useHooks;

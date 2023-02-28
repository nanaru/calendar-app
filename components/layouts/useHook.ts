import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from 'src/.env';

const useHooks = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    (async () => {
      onAuthStateChanged(auth(), async (user) => {
        if (user) {
          setIsAnonymous(user.isAnonymous);
        } else {
          // 匿名ログイン
          await signInAnonymously(auth());
        }
      });
    })();
  }, []);

  return {
    isAnonymous,
  };
};

export default useHooks;

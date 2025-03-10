import { useContext,useEffect, useState } from 'react';
import { NearContext } from '@/wallets/near';
import styles from '../styles/user_login_button.module.css';



export const NEAR_LOGIN = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => {});
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className={styles.loginContainer}>
      <button className={styles.loginButton} onClick={action}>
        {label}
      </button>
    </nav>
  );
};

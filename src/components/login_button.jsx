import { useContext,useEffect, useState } from 'react';
import { NearContext } from '@/wallets/near';



export const Navigation = () => {
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
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="ms-auto">
          <button className="btn btn-primary" onClick={action}>
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};

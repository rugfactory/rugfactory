import { useEffect, useState, useContext } from 'react';
import styles from '../styles/network_toggle_button.module.css';
import { NearContext } from '@/wallets/near';

export const NetworkToggleButton = () => {
  const { signedAccountId } = useContext(NearContext);
  const [currentNetwork, setCurrentNetwork] = useState(() => {
    return localStorage.getItem('networkId') || 'testnet';
  });

  useEffect(() => {
    localStorage.setItem('networkId', currentNetwork);
  }, [currentNetwork]);

  const toggleNetwork = () => {
    if (signedAccountId) return;
    
    const newNetwork = currentNetwork === 'testnet' ? 'mainnet' : 'testnet';
    setCurrentNetwork(newNetwork);
    window.location.reload();
  };

  return (
    <nav className={styles.networkContainer}>
      <button 
        className={`${styles.networkButton} ${styles[currentNetwork]}`}
        onClick={toggleNetwork}
        disabled={!!signedAccountId}
        title={signedAccountId ? 'Log out to change network' : ''}
      >
        {currentNetwork.toUpperCase()}
      </button>
    </nav>
  );
};
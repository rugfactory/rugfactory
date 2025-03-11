import { useContext, useEffect, useState } from 'react';
import { NearContext } from '@/wallets/near';
import styles from '../styles/network_toggle_button.module.css';

export const NetworkToggleButton = () => {
  const { wallet } = useContext(NearContext);
  const [currentNetwork, setCurrentNetwork] = useState(() => {
    return localStorage.getItem('networkId') || 'testnet';
  });

  useEffect(() => {
    // Update localStorage when network changes
    localStorage.setItem('networkId', currentNetwork);
  }, [currentNetwork]);

  const toggleNetwork = () => {
    const newNetwork = currentNetwork === 'testnet' ? 'mainnet' : 'testnet';
    setCurrentNetwork(newNetwork);
    // Reload the page to apply new network settings
    window.location.reload();
  };

  return (
    <nav className={styles.networkContainer}>
      <button 
        className={`${styles.networkButton} ${styles[currentNetwork]}`}
        onClick={toggleNetwork}
      >
        {currentNetwork.toUpperCase()}
      </button>
    </nav>
  );
};
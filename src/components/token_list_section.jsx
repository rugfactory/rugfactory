import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import { RugFactoryContract } from '@/config';
import styles from '../styles/token_list_section.module.css';

export function TokenListSection() {
  const { wallet } = useContext(NearContext);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!wallet) {
        setError('Wallet not initialized');
        setLoading(false);
        return;
      }

      try {
        // Fetch tokens using wallet's viewMethod
        const response = await wallet.viewMethod({
          contractId: RugFactoryContract,
          method: 'token_list_all',
          args: {}
        });
        const formattedTokens = Object.entries(response).map(([symbol, data]) => ({
          name: data.name,
          symbol: symbol,
          creatorId: data.creator_id,
          icon: data.icon,
          contractAddress: `${symbol}.rugfun.testnet`
        }));
        setTokens(formattedTokens);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch tokens: ${err.message}`);
        setLoading(false);
      }
    };

    fetchTokens();
  }, [wallet]);

  if (loading) return <div className={styles.loading}>Loading tokens...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.tokenListContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>Available Tokens</h2>
        <div className={styles.tokenGrid}>
          {tokens.map((token) => (
            <div key={token.symbol} className={styles.tokenCard}>
              {token.icon && (
                <div className={styles.iconContainer}>
                  <img src={token.icon} alt={`${token.name} icon`} className={styles.tokenIcon} />
                </div>
              )}
              <h3>{token.name}</h3>
              <p className={styles.symbol}>{token.symbol}</p>
              <p className={styles.creatorId}>Created by: {token.creatorId}</p>
              <p className={styles.contractAddress}>Contract: {token.contractAddress}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
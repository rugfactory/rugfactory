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

        // Handle empty response or invalid data
        if (!response || !Array.isArray(response)) {
          setTokens([]);
          setLoading(false);
          return;
        }

        // Format the token data from the contract response
        const formattedTokens = response.map(([tokenId, tokenData]) => ({
          name: tokenData.name,
          symbol: tokenData.symbol,
          creatorId: tokenData.creator_id,
          icon: tokenData.icon || '',
          contractAddress: tokenId
        }));

        setTokens(formattedTokens);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tokens:', err);
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
        <h2 className={styles.title}>RUGFACTORY TOKENS</h2>
        <div className={styles.tokenGridContainer}>
          <p className={styles.scrollHint}>Swipe to see more tokens →</p>
          <div className={styles.tokenGrid}>
            {tokens.length === 0 ? (
              <div className={styles.noTokens}>No tokens available</div>
            ) : (
              tokens.map((token) => (
                <div 
                  key={token.contractAddress} 
                  className={styles.tokenCard}
                >
                  {token.icon && (
                    <div className={styles.iconContainer}>
                      <img src={token.icon} alt={`${token.name} icon`} className={styles.tokenIcon} />
                    </div>
                  )}
                  <h3>{token.name}</h3>
                  <div className={styles.tokenDetails}>
                    <p className={styles.contractAddress}>Contract: {token.symbol}.{RugFactoryContract}</p>
                    <p className={styles.creatorId}>Created by: {token.creatorId}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
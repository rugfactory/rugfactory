import { useState, useEffect } from 'react';
import styles from '../styles/token_list_section.module.css';

export function TokenListSection() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        // TODO: Implement actual contract call to token_list_all
        // Placeholder data for now
        const mockTokens = [
          { name: 'Sample Token 1', symbol: 'ST1', totalSupply: '1000000' },
          { name: 'Sample Token 2', symbol: 'ST2', totalSupply: '2000000' },
        ];
        setTokens(mockTokens);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch tokens: ${err.message}`);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) return <div className={styles.loading}>Loading tokens...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.tokenListContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>Available Tokens</h2>
        <div className={styles.tokenGrid}>
          {tokens.map((token, index) => (
            <div key={index} className={styles.tokenCard}>
              <h3>{token.name}</h3>
              <p className={styles.symbol}>{token.symbol}</p>
              <p className={styles.supply}>Total Supply: {token.totalSupply}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import styles from '../styles/token_creation_section.module.css';

export function TokenCreationSection() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [decimals, setDecimals] = useState('18');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Token creation logic will be implemented here
    console.log({ tokenName, tokenSymbol, initialSupply, decimals });
  };

  return (
    <section className={styles.tokenCreationContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>Create Your Token</h2>
        <p className={styles.description}>
          Fill in the details below to create your custom token on NEAR blockchain
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="tokenName">Token Name</label>
            <input
              type="text"
              id="tokenName"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="e.g., My Token"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tokenSymbol">Token Symbol</label>
            <input
              type="text"
              id="tokenSymbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="e.g., MTK"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="initialSupply">Initial Supply</label>
            <input
              type="number"
              id="initialSupply"
              value={initialSupply}
              onChange={(e) => setInitialSupply(e.target.value)}
              placeholder="e.g., 1000000"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="decimals">Decimals</label>
            <input
              type="number"
              id="decimals"
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
              min="0"
              max="24"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Create Token
          </button>
        </form>
      </div>
    </section>
  );
}
import styles from '../styles/welcome_section.module.css';
import { RugFactoryContract, NearBlocksUrl } from '../config';

export function WelcomeSection() {
  return (
    <section className={styles.welcomeContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>WELCOME TO RUGFACTORY</h1>
        <p className={styles.description}>
          create and rug tokens
          <br/>
          without writing a single line of code
          <br/>
          the ultimate token creation platform.
        </p>
        <p className={`${styles.warning} ${styles.alertBox}`}>
          NOTE: OUR PLATFORM IS IN BETA, ANY FUNDS YOU DEPOSIT INTO THE CONTRACT MAY BE LOST.
        </p>
        <p className={`${styles.contractInfo} ${styles.alertBox}`}>
          You are interacting with the RugFactory contract.
          If this UI becomes unavailable,
          you can still interact with the contract directly
          through <a href={`${NearBlocksUrl}/address/${RugFactoryContract}`} target="_blank" rel="noopener noreferrer">NearBlocks Explorer</a>
          (contract address: {RugFactoryContract}) or contact us 
          on <a href="https://t.me/huggiesdotnear" target="_blank" rel="noopener noreferrer">Telegram</a> for assistance.
        </p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>Easy Token Creation</h3>
            <p>Launch your token in minutes with our intuitive interface</p>
          </div>
          <div className={styles.feature}>
            <h3>Secure & Reliable</h3>
            <p>Built on NEAR Protocol for maximum security and efficiency</p>
          </div>
        </div>
        <div className={styles.features} style={{ marginTop: '3rem' }}>
          <h3 style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}>How to Use</h3>
          <div className={styles.feature}>
            <h3>1. Deposit</h3>
            <p>Deposit both NEAR and SHIT tokens into our contract to get started</p>
          </div>
          <div className={styles.feature}>
            <h3>2. Create Token</h3>
            <p>Create your custom token with our simple interface</p>
          </div>
          <div className={styles.feature}>
            <h3>3. Add Liquidity</h3>
            <p>Go to REF and add liquidity to your token</p>
          </div>
          <div className={styles.feature}>
            <h3>4. Manage Token</h3>
            <p>Rug whenever you want!</p>
          </div>
          <div className={styles.feature}>
            <h3>5. Start Fresh</h3>
            <p>Come back to delete your token and create a new one</p>
          </div>
        </div>
      </div>
    </section>
  );
}
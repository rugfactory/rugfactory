import styles from '../styles/welcome_section.module.css';

export function WelcomeSection() {
  return (
    <section className={styles.welcomeContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to RugFactory</h1>
        <p className={styles.description}>
          Create and manage your own tokens on the NEAR blockchain.
          Our platform provides a simple and secure way to deploy your custom tokens.
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
      </div>
    </section>
  );
}
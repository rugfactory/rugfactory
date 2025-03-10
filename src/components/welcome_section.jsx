import styles from '../styles/welcome_section.module.css';

export function WelcomeSection() {
  return (
    <section className={styles.welcomeContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>WELCOME TO RUGFACTORY</h1>
        <p className={styles.description}>
          Create and manage your own tokens on the NEAR blockchain.<br/>
          Our platform provides a simple and secure way to deploy your custom tokens.
          <br/>
          NOTE: OUR PLATFORM IS IN BETA, ANY FUNDS YOU DEPOSIT INTO THE CONTRACT MAY BE LOST.
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
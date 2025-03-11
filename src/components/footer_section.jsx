import styles from '../styles/footer_section.module.css';

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.socialLinks}>
          <a href="https://github.com/rugfactory" target="_blank" rel="noopener noreferrer">🐱 GitHub</a>
          <a href="https://x.com/rugfactoryfun" target="_blank" rel="noopener noreferrer">𝕏 Twitter</a>
          <a href="https://t.me/huggiesdotnear" target="_blank" rel="noopener noreferrer">✈️ Telegram</a>
          <a href="https://rugfactory.near.social" target="_blank" rel="noopener noreferrer">〇 NEAR Social</a>
        </div>
        <p className={styles.copyright}>
          © 2025 by sleet.near, in partnership with huggies.near
        </p>
      </div>
    </footer>
  );
}
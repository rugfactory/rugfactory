import styles from '../styles/footer_section.module.css';

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          © 2025 by sleet.near, in partnership with huggies.near
        </p>
        <div className={styles.partnerInfo}>
          <p>A partnership between</p>
          <div className={styles.partners}>
            <a href="https://near.org/sleet.near" target="_blank" rel="noopener noreferrer">
              sleet.near
            </a>
            <span>&</span>
            <a href="https://near.org/huggies.near" target="_blank" rel="noopener noreferrer">
              huggies.near
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
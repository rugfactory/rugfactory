import styles from '../styles/footer_section.module.css';

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          © 2025 by sleet.near, in partnership with huggies.near
        </p>
      </div>
    </footer>
  );
}
import React from 'react';
import styles from './index.module.css';

function Footer() {
  return (
    <footer className={styles.Footer}>
      © 2022 Peter Wu. like this app?{' '}
      <a
        href="https://www.buymeacoffee.com/peterwu"
        target="_blank"
        rel="noreferrer"
      >
        buy me a coffee (or 奶茶)
      </a>
      !
    </footer>
  );
}

export default Footer;

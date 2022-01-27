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
      ! this project is{' '}
      <a
        href="https://github.com/ptwu/acad-fe"
        target="_blank"
        rel="noreferrer"
      >
        open-sourced
      </a>{' '}
      on{' '}
      <a
        href="https://github.com/ptwu/acad-be"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      .
    </footer>
  );
}

export default Footer;

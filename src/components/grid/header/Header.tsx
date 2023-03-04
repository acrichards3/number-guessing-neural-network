import React from 'react';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.textArea}>
      <h1 className={styles.header}>Number Guessing Neural Network</h1>
      <p className={styles.text}>
        Draw a number 0 through 9 in the canvas below. This neural network will
        attempt to predict the number youve written in the grid.
      </p>
    </div>
  );
}

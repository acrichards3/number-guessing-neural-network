import React from 'react';
import Grid from '../grid/Grid';
import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Grid rows={28} columns={28} />
    </div>
  );
}

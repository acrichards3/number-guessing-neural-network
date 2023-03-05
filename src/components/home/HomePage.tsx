import React from 'react';
import Grid from '../grid/Grid';
import { runPrediction } from '~/layers/runPrediction';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const [submittedGrid, setSubmittedGrid] = React.useState<
    number[][] | undefined
  >(undefined);

  runPrediction(submittedGrid);

  return (
    <div className={styles.container}>
      <Grid
        rows={28}
        columns={28}
        submittedGrid={submittedGrid}
        setSubmittedGrid={setSubmittedGrid}
      />
    </div>
  );
}

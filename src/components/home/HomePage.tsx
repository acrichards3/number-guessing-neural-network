import React from 'react';
import Grid from '../grid/Grid';
import { runPrediction } from '~/layers/runPrediction';
import Prediction from './prediction/Prediction';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const [submittedGrid, setSubmittedGrid] = React.useState<
    number[][] | undefined
  >(undefined);

  runPrediction(submittedGrid);

  const beforeSubmit = (
    <div className={styles.before}>
      <p className={styles.text}>Submit a number to see the prediction</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.half}>
        <Grid
          rows={28}
          columns={28}
          submittedGrid={submittedGrid}
          setSubmittedGrid={setSubmittedGrid}
        />
      </div>
      <div className={styles.half}>
        {runPrediction(submittedGrid) !== undefined ? (
          <Prediction submittedGrid={submittedGrid ?? []} />
        ) : (
          beforeSubmit
        )}
      </div>
    </div>
  );
}

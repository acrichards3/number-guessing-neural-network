import React from 'react';
import Grid from '../grid/Grid';
import Prediction from './prediction/Prediction';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const [submittedGrid, setSubmittedGrid] = React.useState<
    number[][] | undefined
  >(undefined);
  const [desiredResult, setDesiredResult] = React.useState<
    number[] | undefined
  >(undefined);

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
          setDesiredResult={setDesiredResult}
        />
      </div>
      <div className={styles.half}>{beforeSubmit}</div>
    </div>
  );
}

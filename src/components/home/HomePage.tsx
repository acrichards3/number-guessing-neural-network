import React from 'react';
import Grid from '../grid/Grid';
import { inputLayer } from '~/layers/input/inputLayer';
import { prediction } from '~/layers/prediction';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const [submittedGrid, setSubmittedGrid] = React.useState<
    number[][] | undefined
  >(undefined);

  prediction(submittedGrid);
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

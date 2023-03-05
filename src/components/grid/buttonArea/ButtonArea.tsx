import React from 'react';
import styles from './ButtonArea.module.scss';

interface ButtonAreaProps {
  rows: number;
  columns: number;
  grid: number[][];
  setGrid: (grid: number[][]) => void;
  setSubmittedGrid: (grid: number[][] | undefined) => void;
}

export default function ButtonArea(props: ButtonAreaProps) {
  const newGrid: number[][] = Array.from({ length: props.rows }, () =>
    new Array(props.columns).fill(0)
  );

  const handleReset = () => {
    props.setGrid(newGrid);
    props.setSubmittedGrid(undefined);
  };

  const handleSubmit = () => {
    props.setSubmittedGrid(props.grid);
  };

  return (
    <div className={styles.buttonArea}>
      <button onClick={() => handleReset()} className={styles.reset}>
        Reset Grid
      </button>
      <button onClick={() => handleSubmit()} className={styles.submit}>
        Submit
      </button>
    </div>
  );
}

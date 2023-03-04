import React from 'react';
import classNames from 'classnames';
import styles from './Grid.module.scss';

interface GridProps {
  rows: number;
  columns: number;
}

export default function Grid(props: GridProps) {
  const initialGrid = Array.from({ length: props.rows }, () =>
    new Array(props.columns).fill(0)
  );

  console.log(initialGrid);

  return (
    <div className={styles.grid}>
      {initialGrid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={classNames(styles.cell, {
                [styles.filled as string]: cell === 1,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

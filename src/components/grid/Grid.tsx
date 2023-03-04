import React from 'react';
import classNames from 'classnames';
import styles from './Grid.module.scss';

interface GridProps {
  rows: number;
  columns: number;
}

export default function Grid(props: GridProps) {
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const [grid, setGrid] = React.useState(() => {
    return Array.from({ length: props.rows }, () =>
      new Array(props.columns).fill(0)
    );
  });

  const handleCellClick = (x: number, y: number) => {
    const newGrid = [...grid];
    newGrid[y]![x] = 1;
    setGrid(newGrid);
  };

  const handleCellEnter = (x: number, y: number) => {
    if (isMouseDown) {
      const newGrid = [...grid];
      newGrid[y]![x] = 1;
      setGrid(newGrid);
    }
  };

  console.log(grid);

  return (
    <>
      <div className={styles.grid}>
        {grid.map((row, x) => (
          <div key={x} className={styles.row}>
            {row.map((cell, y) => (
              <div
                key={`${x}-${y}`}
                className={classNames(styles.cell, {
                  [styles.filled as string]: cell === 1,
                })}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
                onMouseEnter={() => handleCellEnter(y, x)}
                onClick={() => handleCellClick(y, x)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.buttonArea}>
        <button
          onClick={() =>
            setGrid(() => {
              return Array.from({ length: props.rows }, () =>
                new Array(props.columns).fill(0)
              );
            })
          }
          className={styles.reset}
        >
          Reset Grid
        </button>
        <button className={styles.submit}>Submit</button>
      </div>
    </>
  );
}

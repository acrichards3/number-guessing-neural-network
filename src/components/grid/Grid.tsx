import React from 'react';
import classNames from 'classnames';
import Header from './header/Header';
import ButtonArea from './buttonArea/ButtonArea';
import styles from './Grid.module.scss';

interface GridProps {
  rows: number;
  columns: number;
  submittedGrid: number[][] | undefined;
  setSubmittedGrid: (grid: number[][] | undefined) => void;
  setDesiredResult: (desiredResult: number[] | undefined) => void;
}

export default function Grid(props: GridProps) {
  const rowArr: number[] = new Array(props.rows).fill(0);
  const InitialGrid: number[][] = rowArr.map(() =>
    new Array(props.columns).fill(0)
  );

  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [grid, setGrid] = React.useState<number[][]>(InitialGrid);

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

  return (
    <div className={styles.container}>
      <Header />
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
      <ButtonArea
        rows={props.rows}
        columns={props.columns}
        grid={grid}
        setGrid={setGrid}
        setSubmittedGrid={props.setSubmittedGrid}
        setDesiredResult={props.setDesiredResult}
      />
    </div>
  );
}

import React from 'react';
import styles from './PredictionButtons.module.scss';

interface PredictionButtonProps {
  setIsCorrect: (isCorrect: boolean) => void;
  setDisplayButtons: (displayButtons: boolean) => void;
}

export default function PredictionButtons(props: PredictionButtonProps) {
  const handleCorrect = () => {
    props.setIsCorrect(true);
    props.setDisplayButtons(false);
  };

  const handleIncorrect = () => {
    props.setIsCorrect(false);
    props.setDisplayButtons(false);
  };

  return (
    <div className={styles.buttonContainer}>
      <button onClick={() => handleCorrect()} className={styles.correct}>
        Correct!
      </button>
      <button onClick={() => handleIncorrect()} className={styles.incorrect}>
        Incorrect!
      </button>
    </div>
  );
}

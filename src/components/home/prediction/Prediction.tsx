import React from 'react';
import { runPrediction } from '~/layers/runPrediction';
import styles from './Prediction.module.scss';

interface PredictionProps {
  submittedGrid: number[][];
}

export default function Prediction(props: PredictionProps) {
  const [displayButtons, setDisplayButtons] = React.useState(true);
  const [isCorrect, setIsCorrect] = React.useState<boolean | undefined>(
    undefined
  );
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSubmitted(true);
    e.preventDefault();
    console.log('submit');
  };

  const form = (
    <form className={styles.form}>
      <input
        className={styles.input}
        maxLength={1}
        type="text"
        placeholder="What's the correct number?"
      ></input>
      <button
        onClick={(e) => handleSubmit(e)}
        className={styles.submit}
        type="submit"
      >
        Submit Correct Answer
      </button>
    </form>
  );

  const correct = <p className={styles.thanks}>Thanks for your input!</p>;

  const incorrect = <div>{!submitted ? form : correct}</div>;

  const handleCorrect = () => {
    setIsCorrect(true);
    setDisplayButtons(false);
  };

  const handleIncorrect = () => {
    setIsCorrect(false);
    setDisplayButtons(false);
  };

  const buttons = (
    <div className={styles.buttonContainer}>
      <button onClick={() => handleCorrect()} className={styles.correct}>
        Correct!
      </button>
      <button onClick={() => handleIncorrect()} className={styles.incorrect}>
        Incorrect!
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.predictionContainer}>
        <p className={styles.text}>Predicted Number:</p>
        <p className={styles.prediction}>
          {runPrediction(props.submittedGrid)}
        </p>
      </div>
      {displayButtons ? buttons : null}
      {isCorrect !== undefined && isCorrect ? correct : null}
      {isCorrect !== undefined && !isCorrect ? incorrect : null}
    </div>
  );
}

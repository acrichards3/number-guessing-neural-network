import React from 'react';
import { runPrediction } from '~/layers/runPrediction';
import Form from './form/Form';
import PredictionButtons from './buttons/PredictionButtons';
import styles from './Prediction.module.scss';

interface PredictionProps {
  submittedGrid: number[][];
}

export default function Prediction(props: PredictionProps) {
  const prediction = runPrediction(props.submittedGrid);
  const softmaxOutput = prediction !== undefined ? prediction[0] : null;
  const [actualAnswer, setActualAnswer] = React.useState<number[] | undefined>(
    undefined
  );
  const [displayButtons, setDisplayButtons] = React.useState(true);
  const [isCorrect, setIsCorrect] = React.useState<boolean | undefined>(
    undefined
  );
  const [submitted, setSubmitted] = React.useState(false);

  const correct = <p className={styles.thanks}>Thanks for your input!</p>;

  const incorrect = (
    <div>
      {!submitted ? (
        <Form setActualAnswer={setActualAnswer} setSubmitted={setSubmitted} />
      ) : (
        correct
      )}
    </div>
  );

  console.log(actualAnswer, 'actual Answer');

  return (
    <div className={styles.container}>
      <div className={styles.predictionContainer}>
        <p className={styles.text}>Predicted Number:</p>
        <p className={styles.prediction}>
          {prediction !== undefined ? prediction[1] : null}
        </p>
      </div>
      {displayButtons ? (
        <PredictionButtons
          setIsCorrect={setIsCorrect}
          setDisplayButtons={setDisplayButtons}
        />
      ) : null}
      {isCorrect !== undefined && isCorrect ? correct : null}
      {isCorrect !== undefined && !isCorrect ? incorrect : null}
    </div>
  );
}

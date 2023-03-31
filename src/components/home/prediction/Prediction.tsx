import React from 'react';
import Form from './form/Form';
import PredictionButtons from './buttons/PredictionButtons';
import styles from './Prediction.module.scss';

interface PredictionProps {
  submittedGrid: number[][];
  setDesiredResult: (desiredResult: number[]) => void;
}

export default function Prediction(props: PredictionProps) {
  const [displayButtons, setDisplayButtons] = React.useState(true);
  const [isCorrect, setIsCorrect] = React.useState<boolean | undefined>(
    undefined
  );
  const [submitted, setSubmitted] = React.useState(false);

  const predictedAnswer = (
    softmaxRes: number[] | undefined
  ): number | undefined => {
    if (softmaxRes === undefined) return undefined;

    const ans = softmaxRes.indexOf(Math.max(...softmaxRes));
    if (softmaxRes[ans] === undefined) {
      throw new Error(
        'Fix this terrible code, you idiot. The prediction index doesnt exist within the possibleOutputs array.'
      );
    }
    return ans;
  };

  const correct = <p className={styles.thanks}>Thanks for your input!</p>;
  const incorrect = (
    <div>
      {!submitted ? (
        <Form
          setDesiredResult={props.setDesiredResult}
          setSubmitted={setSubmitted}
        />
      ) : (
        correct
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.predictionContainer}>
        <p className={styles.text}>Predicted Number:</p>
        <p className={styles.prediction}>
          {predictedAnswer(prediction) !== undefined
            ? predictedAnswer(prediction)
            : '...'}
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

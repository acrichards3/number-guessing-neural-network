import React from 'react';
import styles from './Form.module.scss';

interface FormProps {
  setSubmitted: (submitted: boolean) => void;
  setActualAnswer: (actualAnswer: number[]) => void;
}

export default function Form(props: FormProps) {
  const possibleAnswers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleSubmit = (answer: number) => {
    function createActualAnswerArray(size: number, index: number): number[] {
      if (index < 0 || index >= size) {
        throw new Error('Index out of range');
      }

      const arr = new Array(size).fill(0);
      arr[index] = 1;

      return arr;
    }

    props.setActualAnswer(
      createActualAnswerArray(possibleAnswers.length, answer)
    );
    props.setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>Select the Correct Answer</p>
      <div className={styles.buttonArea}>
        {possibleAnswers.map((answer, index) => {
          return (
            <button
              onClick={() => handleSubmit(index)}
              key={answer}
              className={styles.button}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}

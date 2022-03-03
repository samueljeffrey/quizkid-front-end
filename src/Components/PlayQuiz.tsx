import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, dateSlicer } from "../Utils/utils";
import { Quiz } from "..//Types/quiz.interface";

export const PlayQuiz: React.FC = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>();
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setStarted(false);
    setEnded(false);
    getQuiz(quizId).then((response: Quiz) => {
      setQuiz(response);
    });
  }, [quizId]);

  return (
    <div>
      {quiz ? (
        <div>
          <h1>{quiz.title}</h1>
          <h2>{quiz.creator}</h2>
          <h3>Created: {dateSlicer(quiz.created)}</h3>
          {quiz.instructions.map((instruction) => {
            return <h4 key={instruction}>- {instruction}</h4>;
          })}
          {started && !ended ? (
            <button onClick={() => setEnded(true)}>Give Up</button>
          ) : !started ? (
            <button onClick={() => setStarted(true)}>Start</button>
          ) : (
            <h5></h5>
          )}
        </div>
      ) : null}
    </div>
  );
};

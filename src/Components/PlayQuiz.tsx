import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "../Utils/utils";
import { Quiz } from "..//Types/quiz.interface";

export const PlayQuiz: React.FC = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>();
  const [started, setStarted] = useState(false);

  useEffect(() => {
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
          <h3>{quiz.created}</h3>
          {quiz.instructions.map((instruction) => {
            return <h4>{instruction}</h4>;
          })}
          {started ? <button>Give Up</button> : <button>Start</button>}
        </div>
      ) : null}
    </div>
  );
};

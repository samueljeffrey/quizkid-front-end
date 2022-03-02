import React, { useState, useEffect } from "react";
import { SingleQuiz } from "./SingleQuiz";
import { getQuizzes } from "../Utils/utils";

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then((response) => {
      setQuizzes(response);
    });
  });

  return (
    <div>
      <h1>QuizList page</h1>
      {quizzes.length > 0
        ? quizzes.map((quiz) => {
            <SingleQuiz details={quiz} />;
          })
        : null}
    </div>
  );
};

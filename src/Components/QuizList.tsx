import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../Types/quiz.interface";
import { SingleQuiz } from "./SingleQuiz";
import { getQuizzes } from "../Utils/utils";

export const QuizList: React.FC<{ category: string }> = ({ category }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    getQuizzes(category).then((response) => {
      setQuizzes(response.data);
    });
  }, [category]);

  return (
    <div>
      <h1>QuizList page</h1>
      {quizzes.length === 0 ? (
        <p>No quizzes found</p>
      ) : (
        quizzes.map((quiz) => {
          return (
            <Link to={`/quizzes/${quiz["_id"]}`} key={quiz["_id"]}>
              <SingleQuiz details={quiz} />
            </Link>
          );
        })
      )}
    </div>
  );
};

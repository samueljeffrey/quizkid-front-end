import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../Types/quiz.interface";
import { SingleQuiz } from "./SingleQuiz";
import { getQuizzes } from "../Utils/utils";

export const QuizList: React.FC<{ category: string }> = ({ category }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    console.log(`category is now ${category}`);
    getQuizzes(category).then((response) => {
      setQuizzes(response.data);
      console.log(`just fetched ${category} quizzes`);
    });
  }, [category]);

  return (
    <div>
      {/* Setting the heading based on chosen category filter */}
      {category === "All" || category === "Other" ? (
        <h1>Find a Quiz</h1>
      ) : (
        <h1>Find a {category} Quiz</h1>
      )}
      {/* Listing the quizzes fitting the chosen category filter */}
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

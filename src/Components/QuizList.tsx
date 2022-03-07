import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../Types/quiz.interface";
import { SingleQuiz } from "./SingleQuiz";
import { getQuizzes } from "../Utils/utils";

interface Props {
  category: string;
  setCategory: (category: string) => void;
}

export const QuizList: React.FC<Props> = ({ category, setCategory }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  const categories: string[] = [
    "All",
    "Film/TV",
    "Geography",
    "History",
    "Languages",
    "Literature",
    "Maths",
    "Music",
    "Science",
    "Society",
    "Sport",
    "Other",
  ];

  useEffect(() => {
    setQuizzes([]);
    getQuizzes(category).then((response) => {
      setQuizzes(response.data);
    });
  }, [category]);

  return (
    <div>
      <select value={category} className="every-button category-selector">
        {categories.map((category) => {
          return (
            <option key={category} onClick={() => setCategory(category)}>
              {category}
            </option>
          );
        })}
      </select>
      <h1>{category} Quizzes</h1>
      {quizzes && quizzes.length === 0 ? (
        <p>No quizzes found</p>
      ) : quizzes ? (
        <div id="quiz-list-div">
          {quizzes.map((quiz) => {
            return (
              <div className="single-quiz-div">
                <Link
                  className="single-quiz-link"
                  to={`/quizzes/${quiz["_id"]}`}
                  key={quiz["_id"]}
                >
                  <SingleQuiz details={quiz} />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

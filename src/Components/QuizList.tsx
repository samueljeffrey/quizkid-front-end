import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../Types/quiz.interface";
import { SingleQuiz } from "./SingleQuiz";
import { getQuizzes, allCategories } from "../Utils/utils";

export const QuizList: React.FC = () => {
  // Creating a state for array of fetched quizzes
  const [quizzes, setQuizzes] = useState<Quiz[]>();

  // Creating a state for selected category
  const [category, setCategory] = useState("All");

  // Setting category to "All" on loading of page
  useEffect(() => {
    setCategory("All");
  }, []);

  // Fetching quizzes filtered by category chosen
  useEffect(() => {
    getQuizzes(category).then((response) => {
      setQuizzes(response.data);
    });
  }, [category]);

  return (
    <div>
      {/* Category selector is always at the top */}
      <select value={category} className="every-button category-selector">
        <option onClick={() => setCategory("All")}>All</option>
        {allCategories.map((category) => {
          return (
            <option key={category} onClick={() => setCategory(category)}>
              {category}
            </option>
          );
        })}
      </select>

      {/* Title depends on the chosen category */}
      <h1>{category} Quizzes</h1>

      {/* Render loading message, then either a list */}
      {/* of quizzes, or a message if none found */}
      {!quizzes ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found</p>
      ) : (
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
      )}
    </div>
  );
};

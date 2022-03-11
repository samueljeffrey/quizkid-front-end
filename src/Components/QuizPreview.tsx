import React from "react";
import { NewQuestion } from "../Types/quiz.interface";

interface Props {
  questions: NewQuestion[];
}

export const QuizPreview: React.FC<Props> = ({ questions }) => {
  return (
    <div className="quiz-preview-outer">
      <div className="quiz-preview">
        <h2>Preview:</h2>
        {questions.map((question) => {
          return (
            <div className="quiz-whole-row" key={question.question}>
              {/* Each question is rendered in yellow in preview, */}
              {/* or in red if input field is currently empty */}
              <div
                className={
                  question.question.length
                    ? "quiz-question-box quiz-half-row"
                    : "incorrect-answer-box quiz-half-row"
                }
              >
                <p
                  className={
                    question.question.length
                      ? "quiz-question quiz-box-text"
                      : "incorrect-answer quiz-box-text"
                  }
                >
                  {question.question.length ? (
                    question.question
                  ) : (
                    <em>Empty</em>
                  )}
                </p>
              </div>

              {/* Each answer is rendered in green in preview, */}
              {/* or in red if input field is currently empty */}
              <div
                className={
                  question.correct.length
                    ? "correct-answer-box quiz-half-row"
                    : "incorrect-answer-box quiz-half-row"
                }
              >
                <p
                  className={
                    question.correct.length
                      ? "correct-answer quiz-box-text"
                      : "incorrect-answer quiz-box-text"
                  }
                >
                  {question.correct.length ? question.correct : <em>Empty</em>}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from "react";
import { Question } from "../Types/quiz.interface";

interface Props {
  question: Question;
  guessed: Question[];
  ended: boolean;
}

export const QuizRow: React.FC<Props> = ({ question, guessed, ended }) => {
  return (
    <div className="quiz-whole-row" key={question.question}>
      <div className="quiz-question-box quiz-half-row">
        <p className="quiz-question quiz-box-text">{question.question}</p>
      </div>
      {/* For each question, its answer is rendered */}
      {/* with a green background when guessed, */}
      {/* a red background if not guessed when */}
      {/* quiz has ended, or not rendered at all if */}
      {/* not guessed yet and quiz hasn't ended yet */}
      {guessed.indexOf(question) > -1 ? (
        <div className="correct-answer-box quiz-half-row">
          <p className="correct-answer quiz-box-text">{question.correct}</p>
        </div>
      ) : ended ? (
        <div className="incorrect-answer-box quiz-half-row">
          <p className="incorrect-answer quiz-box-text">{question.correct}</p>
        </div>
      ) : null}
    </div>
  );
};

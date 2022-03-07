import React from "react";
import { Quiz } from "../Types/quiz.interface";
import { dateSlicer } from "../Utils/utils";

interface Props {
  details: Quiz;
}

export const SingleQuiz: React.FC<Props> = ({ details }) => {
  return (
    <div className="single-quiz-box">
      <p className="single-quiz-box-title">{details.title}</p>
      <p className="single-quiz-box-details">
        {details.creator} - <em>{dateSlicer(details.created)}</em> -{" "}
        {details.plays} {details.plays === 1 ? "play" : "plays"}
      </p>
    </div>
  );
};

import React from "react";
import { Quiz } from "../Types/quiz.interface";

interface Props {
  details: Quiz;
}

export const SingleQuiz: React.FC<Props> = ({ details }) => {
  return (
    <div>
      <h2>{details.title}</h2>
    </div>
  );
};

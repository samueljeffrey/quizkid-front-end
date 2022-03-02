import React from "react";
import { Quiz } from "../Types/quiz.interface";

interface Props {
  details: Quiz;
}

export const SingleQuiz: React.FC<Props> = ({ details }) => {
  return (
    <div>
      <h1>SingleQuiz item</h1>
      <h2>{details.name}</h2>
    </div>
  );
};

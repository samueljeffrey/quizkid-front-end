import React from "react";
import { NewQuestion } from "../Types/quiz.interface";

interface Props {
  item: NewQuestion;
  attempted: boolean;
  editQuestion: (text: string, index: number, part: string) => void;
  addAccepted: (question: number) => void;
  deleteQuestion: (index: number) => void;
}

export const QuestionBox: React.FC<Props> = ({
  item,
  attempted,
  editQuestion,
  addAccepted,
  deleteQuestion,
}) => {
  return (
    <div className="create-question-outer">
      <div className="create-question-box">
        <h2 className="input-labels">{item.index + 1}.</h2>
        <p className="input-labels">Question:</p>
        {/* If the user attempted to create the quiz */}
        {/* and any "question" field is empty, it will */}
        {/* be rendered in red, until no longer empty */}
        <input
          className={
            attempted && item.question === ""
              ? "details-inputs red-input"
              : "details-inputs"
          }
          onChange={(e) => editQuestion(e.target.value, item.index, "question")}
          value={item.question}
        />

        <p className="input-labels">Correct:</p>
        {/* If the user attempted to create the quiz */}
        {/* and any "correct" field is empty, it will */}
        {/* be rendered in red, until no longer empty */}
        <input
          className={
            attempted && item.correct === ""
              ? "details-inputs red-input"
              : "details-inputs"
          }
          onChange={(e) => editQuestion(e.target.value, item.index, "correct")}
          value={item.correct}
        />

        <p className="input-labels">Accepted:</p>
        {/* Never rendered in red as they aren't required */}
        {item.accepted.map((eachAccepted) => {
          return (
            <input
              className="details.inputs accepted-input"
              onChange={(e) =>
                editQuestion(
                  e.target.value,
                  item.index,
                  `accepted${eachAccepted.index}`
                )
              }
              value={item.accepted[eachAccepted.index].text}
            />
          );
        })}
        {item.accepted.length < 5 ? (
          <button
            className="every-button add-answer-button"
            onClick={() => addAccepted(item.index)}
          >
            Add Answer
          </button>
        ) : null}

        <button
          className="every-button red-button remove-button"
          onClick={() => deleteQuestion(item.index)}
        >
          Remove Question
        </button>
      </div>
    </div>
  );
};

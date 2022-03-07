import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, patchQuiz, dateSlicer, simplify } from "../Utils/utils";
import { Quiz, Question } from "..//Types/quiz.interface";

export const PlayQuiz: React.FC = () => {
  const emptyQuiz: Quiz = {
    title: "",
    category: "",
    instructions: [],
    created: "",
    creator: "",
    average: 0,
    seconds: 0,
    plays: 0,
    __v: 0,
    _id: "",
    quizId: "",
    questions: [{ _id: "", question: "", correct: "", accepted: [] }],
  };

  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>(emptyQuiz);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [guessed, setGuessed] = useState<Question[]>([]);

  useEffect(() => {
    setStarted(false);
    setEnded(false);
    getQuiz(quizId).then((response: Quiz) => {
      setQuiz(response);
      setGuessed([]);
    });
  }, [quizId]);

  const endQuiz = (done: boolean = false) => {
    setEnded(true);
    const newPlays: number = quiz.plays + 1;
    const toAdd = done ? 100 : (guessed.length / quiz.questions.length) * 100;
    const newAverage = (quiz.average * quiz.plays + toAdd) / newPlays;
    if (quizId) patchQuiz(quizId, newPlays, Math.round(newAverage));
  };

  const evaluateText = (e: { target: { value: string } }) => {
    const text = e.target.value;
    const array = [...guessed];
    quiz.questions.forEach((item) => {
      let valid = false;
      if (simplify(text) === simplify(item.correct)) valid = true;
      for (let j = 0; j < item.accepted.length; j++) {
        if (simplify(text) === simplify(item.accepted[j])) valid = true;
      }
      if (valid && array.indexOf(item) === -1) {
        array.push(item);
        e.target.value = "";
        if (array.length === quiz.questions.length) {
          endQuiz(true);
        }
      }
    });
    setGuessed(array);
  };

  return (
    <div id="play-quiz-page">
      <div id="play-quiz-div">
        {/* If quiz has not yet started OR already ended */}
        {quiz.title === "" ? null : !started || ended ? (
          <div>
            <h1>{quiz.title}</h1>
            <p>
              By <strong>{quiz.creator}</strong> -{" "}
              <em>{dateSlicer(quiz.created)}</em> - {quiz.plays}{" "}
              {quiz.plays === 1 ? "play" : "plays"}
            </p>
          </div>
        ) : null}

        {/* Only if quiz has not yet started */}
        {quiz.title !== "" && !started ? (
          <div>
            {quiz.instructions.length ? (
              <div id="instructions-div">
                <p>
                  <strong>Instructions:</strong>
                </p>
                {quiz.instructions.map((instruction) => {
                  return <p key={instruction}>- {instruction}</p>;
                })}
              </div>
            ) : null}

            <button
              className="every-button green-button"
              onClick={() => setStarted(true)}
            >
              Start
            </button>
          </div>
        ) : null}

        {/* Only if quiz has already ended */}
        {ended ? (
          <div>
            <h2 className="end-percentages">
              Score:{" "}
              {Math.round((guessed.length / quiz.questions.length) * 100)}%
            </h2>
            <h3 className="end-percentages">Average: {quiz.average}%</h3>
          </div>
        ) : null}

        {/* Only if quiz is currently in play */}
        {started && !ended ? (
          <div>
            <p id="title-during-quiz">{quiz.title}</p>
            <div>
              <h3 id="current-score">
                {guessed.length}/{quiz.questions.length}
              </h3>
              <input
                id="quiz-input"
                name="text"
                onChange={(e) => evaluateText(e)}
              />
              <button
                className="every-button red-button"
                id="give-up-button"
                onClick={() => endQuiz()}
              >
                Give Up
              </button>
            </div>
          </div>
        ) : null}

        {/* Quiz always displayed once retrieved from API */}
        {quiz.title !== "" ? (
          <div id="quiz-questions-div">
            {quiz.questions.map((question) => {
              return (
                <div className="quiz-whole-row" key={question.question}>
                  <div className="quiz-question-box quiz-half-row">
                    <p className="quiz-question quiz-box-text">
                      {question.question}
                    </p>
                  </div>
                  {guessed.indexOf(question) > -1 ? (
                    <div className="correct-answer-box quiz-half-row">
                      <p className="correct-answer quiz-box-text">
                        {question.correct}
                      </p>
                    </div>
                  ) : ended ? (
                    <div className="incorrect-answer-box quiz-half-row">
                      <p className="incorrect-answer quiz-box-text">
                        {question.correct}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <h1>Quiz not found</h1>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, patchQuiz, dateSlicer, simplify } from "../Utils/utils";
import { Quiz, Question } from "..//Types/quiz.interface";
import { QuizBox } from "./QuizBox";

export const PlayQuiz: React.FC = () => {
  // Creating an empty quiz object to use as starting
  // value for quiz state, to avoid typescript errors
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

  // Creating a state which is initially the empty quiz,
  // but updated with the quiz if received from API
  const [quiz, setQuiz] = useState<Quiz>(emptyQuiz);

  // Creating a state which can be changed if the API
  // has found no quiz with that id in the database
  const [notFound, setNotFound] = useState<boolean>(false);

  // Creating states to monitor start and end of play
  const [started, setStarted] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  // Creating a state, an array of question objects which
  // is updated every time another question is answered
  const [guessed, setGuessed] = useState<Question[]>([]);

  // Fetching the quiz data using id from params,
  // then setting the quiz state to that valid
  // response, or setting the notFound state to true
  const { quizId } = useParams();
  useEffect(() => {
    setNotFound(false);
    setStarted(false);
    setEnded(false);
    getQuiz(quizId)
      .then((response: Quiz) => {
        setQuiz(response);
        setGuessed([]);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [quizId]);

  // Creating a function which changes ended state
  // to true and patches the quiz with the new
  // number of plays and the new average score
  const endQuiz = (done: boolean = false) => {
    setEnded(true);
    const newPlays: number = quiz.plays + 1;
    const toAdd = done ? 100 : (guessed.length / quiz.questions.length) * 100;
    const newAverage = (quiz.average * quiz.plays + toAdd) / newPlays;
    if (quizId) patchQuiz(quizId, newPlays, Math.round(newAverage));
  };

  // Creating a function which adds any question
  // to the guessed state array if it's correct
  // answer or any of its accepted answers
  // matches the currect value of the text input
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

  // Render this if waiting for API response
  if (quiz.title === "") {
    return <h1>Loading...</h1>;
  }

  // Render this if API found no quiz with id
  if (notFound) {
    return <h1>Quiz not found</h1>;
  }

  // Otherwise, render the playable quiz
  return (
    <div id="play-quiz-page">
      <div id="play-quiz-div">
        {/* If quiz has not started yet OR already ended */}
        {!started || ended ? (
          <div>
            <h1>{quiz.title}</h1>
            <p>
              By <strong>{quiz.creator}</strong> -{" "}
              <em>{dateSlicer(quiz.created)}</em> - {quiz.plays}{" "}
              {quiz.plays === 1 ? "play" : "plays"}
            </p>
          </div>
        ) : null}
        {/* Only if quiz has not started yet */}
        {!started ? (
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

        {/* Quiz is always displayed once found */}
        <div id="quiz-questions-div">
          {quiz.questions.map((question) => {
            return (
              <QuizBox question={question} guessed={guessed} ended={ended} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

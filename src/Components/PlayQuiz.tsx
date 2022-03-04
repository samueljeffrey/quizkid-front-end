import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, patchQuiz, dateSlicer } from "../Utils/utils";
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
    quiz?.questions.forEach((item) => {
      let valid = false;
      if (
        text.toLowerCase().replaceAll(" ", "") ===
        item.correct.toLowerCase().replaceAll(" ", "")
      )
        valid = true;
      for (let j = 0; j < item.accepted.length; j++) {
        if (
          text.toLowerCase().replaceAll(" ", "") ===
          item.accepted[j].toLowerCase().replaceAll(" ", "")
        )
          valid = true;
      }
      if (valid && array.indexOf(item) === -1) {
        array.push(item);
        e.target.value = "";
        if (array.length === quiz?.questions.length) {
          endQuiz(true);
        }
      }
    });
    setGuessed(array);
  };

  return (
    <div>
      {quiz ? (
        <div>
          <h1>{quiz.title}</h1>
          <h2>By: {quiz.creator}</h2>
          <h3>Created: {dateSlicer(quiz.created)}</h3>
          <h4>Plays: {quiz.plays}</h4>
          {quiz.instructions.map((instruction) => {
            return <h5 key={instruction}>- {instruction}</h5>;
          })}
          {started && !ended ? (
            <button onClick={() => endQuiz()}>Give Up</button>
          ) : !started ? (
            <button onClick={() => setStarted(true)}>Start</button>
          ) : (
            <div>
              <h2>
                Score:{" "}
                {Math.round((guessed.length / quiz.questions.length) * 100)}%
              </h2>
              <h3>Average: {quiz.average}%</h3>
            </div>
          )}
        </div>
      ) : (
        <h2>No quiz found</h2>
      )}

      {quiz ? (
        started && !ended ? (
          <div>
            <h2>
              {guessed.length}/{quiz?.questions.length}
            </h2>
            <input name="text" onChange={(e) => evaluateText(e)} />
          </div>
        ) : null
      ) : null}

      {started && !ended
        ? quiz?.questions.map((question) => {
            return (
              <div key={question.question}>
                <div className="question-box">
                  <p>{question.question}</p>
                </div>
                {guessed.indexOf(question) === -1 ? (
                  <div className="answer-box-empty"></div>
                ) : (
                  <div className="answer-box-correct">
                    <p>{question.correct}</p>
                  </div>
                )}
              </div>
            );
          })
        : null}

      {quiz
        ? ended
          ? quiz?.questions.map((question) => {
              return (
                <div key={question.question}>
                  <div className="question-box">
                    <p>{question.question}</p>
                  </div>

                  {guessed.indexOf(question) === -1 ? (
                    <div className="answer-box-incorrect">
                      <p>!!!!! {question.correct} !!!!!</p>
                    </div>
                  ) : (
                    <div className="answer-box-correct">
                      <p>{question.correct}</p>
                    </div>
                  )}
                </div>
              );
            })
          : null
        : null}
    </div>
  );
};

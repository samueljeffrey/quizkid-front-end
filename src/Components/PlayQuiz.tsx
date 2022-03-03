import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, dateSlicer } from "../Utils/utils";
import { Quiz, Question } from "..//Types/quiz.interface";

export const PlayQuiz: React.FC = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>();
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

  const endQuiz = () => {
    setEnded(true);
  };

  const evaluateText = (text: string) => {
    const array = [...guessed];
    quiz?.questions.forEach((item) => {
      let valid = false;
      if (text.toLowerCase() === item.correct.toLowerCase()) valid = true;
      for (let j = 0; j < item.accepted.length; j++) {
        if (text.toLowerCase() === item.accepted[j].toLowerCase()) valid = true;
      }
      if (valid && array.indexOf(item) === -1) {
        array.push(item);
      }
    });
    setGuessed(array);
    if (guessed.length === quiz?.questions.length) {
      endQuiz();
    }
  };

  return (
    <div>
      {quiz ? (
        <div>
          <h1>{quiz.title}</h1>
          <h2>By: {quiz.creator}</h2>
          <h3>Created: {dateSlicer(quiz.created)}</h3>
          {quiz.instructions.map((instruction) => {
            return <h4 key={instruction}>- {instruction}</h4>;
          })}
          {started && !ended ? (
            <button onClick={() => endQuiz()}>Give Up</button>
          ) : !started ? (
            <button onClick={() => setStarted(true)}>Start</button>
          ) : (
            <div>
              <h2>
                Score:{" "}
                {((guessed.length / quiz.questions.length) * 100).toFixed(0)}%
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
            <input name="text" onChange={(e) => evaluateText(e.target.value)} />
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

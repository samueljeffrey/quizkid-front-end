import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postQuiz } from "../Utils/utils";
import { Quiz } from "../Types/quiz.interface";

interface Question {
  index: number;
  question: string;
  correct: string;
  accepted: string[];
}

export const CreateQuiz: React.FC = () => {
  const emptyQuestion: Question = {
    index: 0,
    question: "",
    correct: "",
    accepted: ["", "", "", ""],
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [instructions, setInstructions] = useState<string[]>(["", "", "", ""]);
  const [title, setTitle] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [category, setCategory] = useState<string>("Select");
  const [seconds, setSeconds] = useState<number>(0);

  const [attempted, setAttempted] = useState<boolean>(false);

  const [built, setBuilt] = useState<boolean>(false);

  const [uploaded, setUploaded] = useState<Quiz>();

  const editTitle = (text: string) => {
    setTitle(text);
  };
  const editCreator = (text: string) => {
    setCreator(text);
  };
  const editInstructions = (text: string, index: number) => {
    const array = [...instructions];
    array[index] = text;
    setInstructions(array);
  };
  const addQuestion = () => {
    const newQuestion: Question = emptyQuestion;
    newQuestion.index = questions.length;
    setQuestions([...questions, newQuestion]);
  };
  const deleteQuestion = (index: number) => {
    const list = [...questions];
    list.splice(index, 1);
    for (let i = index; i < list.length; i++) {
      list[i].index--;
    }
    setQuestions(list);
  };
  const editQuestion = (text: string, index: number, part: string) => {
    const newQuestions = [...questions];
    if (part === "question") newQuestions[index].question = text;
    if (part === "correct") newQuestions[index].correct = text;
    if (part === "accepted0") newQuestions[index].accepted[0] = text;
    if (part === "accepted1") newQuestions[index].accepted[1] = text;
    if (part === "accepted2") newQuestions[index].accepted[2] = text;
    if (part === "accepted3") newQuestions[index].accepted[3] = text;
    setQuestions(newQuestions);
  };

  const evaluateQuiz = () => {
    setAttempted(false);
    const errors = [];
    if (title === "") {
      errors.push("title");
    }
    if (creator === "") {
      errors.push("creator");
    }
    if (category === "Select") {
      errors.push("category");
    }
    if (seconds === 0) {
      errors.push("seconds");
    }
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question === "") {
        if (errors.indexOf("question") === -1) {
          errors.push("question");
        }
      }
      if (questions[i].correct === "") {
        if (errors.indexOf("correct") === -1) {
          errors.push("correct");
        }
      }
    }
    setAttempted(true);
    if (errors.length === 0) {
      setBuilt(true);
      setAttempted(false);
      buildQuiz();
    } else {
      setAttempted(true);
      setBuilt(false);
    }
  };

  const buildQuiz = () => {
    const object = {
      title,
      creator,
      category,
      instructions,
      seconds,
      questions,
    };
    object.instructions = object.instructions.filter((item) => item !== "");
    questions.forEach((question) => {
      question.accepted = question.accepted.filter((item) => item !== "");
    });
    postQuiz(object).then((response) => {
      setUploaded(response.data.data);
    });
  };

  useEffect(() => {
    addQuestion();
  }, []);

  if (!built) {
    return (
      <div id="build-quiz-page">
        <div id="quiz-tips">
          <h1>Create your Quiz</h1>
          <p>
            <strong>Title:</strong> Simply enter a title for your quiz.
          </p>
          <p>
            <strong>Your Name:</strong> Let players know who created the quiz.
          </p>
          <p>
            <strong>Category:</strong> Choose a category from the options.
          </p>
          <p>
            <strong>Instructions:</strong> Instructions or pieces of extra
            information will be given to players as bullet points. These could
            be "surnames are enough for correct answers", for example. You can
            add up to 4 instructions, or simply leave them empty.
          </p>
          <p>
            <strong>Time Limit:</strong> Select a time limit for your quiz from
            the options.
          </p>
          <p>
            <strong>Questions List:</strong> You can add another question to
            your quiz using the button below the last question. Or delete any
            question from the list using the button at the bottom of that
            question.
          </p>
          <p>
            <strong>Question:</strong> For each question in the quiz, first fill
            in the "question" field itself. If the title of your quiz indicates
            that the quiz is more of a list than individual questions, for
            example, if your quiz was titled "Name the last 10 UK Prime
            Ministers", then the "question" field in each question could just be
            a number (eg. 1), or instead, it could be a clue (eg. 1997-2007, if
            the answer was Tony Blair).
          </p>
          <p>
            <strong>Correct:</strong> Then, in the "correct" field, enter the
            answer you want to be displayed in the quiz for that question.
          </p>
          <p>
            <strong>Accepted:</strong> You may then add up to 4 "accepted"
            answers, or leave them empty. You don't need to add the "correct"
            answer here, as it is automatically accepted.
          </p>
          <p>
            <strong>***</strong> The correct and accepted answers are actually
            changed for the quiz itself, to remove all spaces and apostrophes,
            and to change all letters to lower case. For example, if the correct
            answer is "Philosopher's Stone", a player would actually be correct
            with "Philosophers Stone", "philosopher's stone", or even
            "philosophersstone". This also means that you don't need to add
            variations of capitalised and uncapitalised answers to your
            "accepted" answers lists, only answers with different spellings or
            different words. The displayed answer in the quiz, once guessed,
            will still appear exactly as you entered it in the "correct" field,
            regardless of how the player entered their answer.
          </p>
        </div>

        <div id="quiz-details">
          <div>
            <h3 className="input-labels">Title:</h3>
            {attempted && title === "" ? (
              <input
                className="details-inputs red-input"
                onChange={(e) => editTitle(e.target.value)}
              />
            ) : (
              <input
                className="details-inputs"
                onChange={(e) => editTitle(e.target.value)}
              />
            )}
          </div>
          <div>
            <h3 className="input-labels">Your Name:</h3>
            {attempted && creator === "" ? (
              <input
                className="details-inputs red-input"
                onChange={(e) => editCreator(e.target.value)}
              />
            ) : (
              <input
                className="details-inputs"
                onChange={(e) => editCreator(e.target.value)}
              />
            )}
          </div>
          <div>
            <h3 className="input-labels">Category:</h3>
            {attempted && category === "Select" ? (
              <select
                className="every-button create-selector red-selector"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="Select">Select</option>
                <option value="Film/TV">Film/TV</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Languages">Languages</option>
                <option value="Literature">Literature</option>
                <option value="Maths">Maths</option>
                <option value="Music">Music</option>
                <option value="Science">Science</option>
                <option value="Society">Society</option>
                <option value="Sport">Sport</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <select
                className="every-button create-selector"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="Select">Select</option>
                <option value="Film/TV">Film/TV</option>
                <option value="Geography">Geography</option>
                <option value="History">History</option>
                <option value="Languages">Languages</option>
                <option value="Literature">Literature</option>
                <option value="Maths">Maths</option>
                <option value="Music">Music</option>
                <option value="Science">Science</option>
                <option value="Society">Society</option>
                <option value="Sport">Sport</option>
                <option value="Other">Other</option>
              </select>
            )}
          </div>
          <div id="instructions-div">
            <h3 className="input-labels">Instructions:</h3>
            <input
              className="details-inputs instructions-inputs"
              onChange={(e) => editInstructions(e.target.value, 0)}
            />
            <input
              className="details-inputs instructions-inputs"
              onChange={(e) => editInstructions(e.target.value, 1)}
            />
            <input
              className="details-inputs instructions-inputs"
              onChange={(e) => editInstructions(e.target.value, 2)}
            />
            <input
              className="details-inputs instructions-inputs"
              onChange={(e) => editInstructions(e.target.value, 3)}
            />
          </div>
          <div>
            <h3 className="input-labels">Time Limit:</h3>
            {attempted && seconds === 0 ? (
              <select
                className="every-button create-selector red-selector"
                onChange={(e) => {
                  setSeconds(60 * parseInt(e.target.value));
                }}
              >
                <option value="0">Select</option>
                <option value="1">1 min</option>
                <option value="2">2 mins</option>
                <option value="3">3 mins</option>
                <option value="4">4 mins</option>
                <option value="5">5 mins</option>
                <option value="6">6 mins</option>
                <option value="7">7 mins</option>
                <option value="8">8 mins</option>
                <option value="9">9 mins</option>
                <option value="10">10 mins</option>
              </select>
            ) : (
              <select
                className="every-button create-selector"
                onChange={(e) => {
                  setSeconds(60 * parseInt(e.target.value));
                }}
              >
                <option value="0">Select</option>
                <option value="1">1 min</option>
                <option value="2">2 mins</option>
                <option value="3">3 mins</option>
                <option value="4">4 mins</option>
                <option value="5">5 mins</option>
                <option value="6">6 mins</option>
                <option value="7">7 mins</option>
                <option value="8">8 mins</option>
                <option value="9">9 mins</option>
                <option value="10">10 mins</option>
              </select>
            )}
          </div>
        </div>

        <div>
          <h3 className="input-labels">Questions:</h3>
          <div id="quiz-questions-div">
            {questions.map((item) => {
              return (
                <div className="create-question-outer">
                  <div className="create-question-box">
                    <h3 className="input-labels">{item.index + 1}.</h3>
                    <p className="input-labels">Question:</p>
                    {attempted && item.question === "" ? (
                      <input
                        className="details-inputs red-input"
                        onChange={(e) =>
                          editQuestion(e.target.value, item.index, "question")
                        }
                      />
                    ) : (
                      <input
                        className="details-inputs"
                        onChange={(e) =>
                          editQuestion(e.target.value, item.index, "question")
                        }
                      />
                    )}

                    <p className="input-labels">Correct:</p>
                    {attempted && item.correct === "" ? (
                      <input
                        className="details-inputs red-input"
                        onChange={(e) =>
                          editQuestion(e.target.value, item.index, "correct")
                        }
                      />
                    ) : (
                      <input
                        className="details-inputs"
                        onChange={(e) =>
                          editQuestion(e.target.value, item.index, "correct")
                        }
                      />
                    )}

                    <p className="input-labels">Accepted:</p>
                    <input
                      className="details-inputs accepted-input"
                      onChange={(e) =>
                        editQuestion(e.target.value, item.index, "accepted0")
                      }
                    />
                    <input
                      className="details-inputs accepted-input"
                      onChange={(e) =>
                        editQuestion(e.target.value, item.index, "accepted1")
                      }
                    />
                    <input
                      className="details-inputs accepted-input"
                      onChange={(e) =>
                        editQuestion(e.target.value, item.index, "accepted2")
                      }
                    />
                    <input
                      className="details-inputs accepted-input"
                      onChange={(e) =>
                        editQuestion(e.target.value, item.index, "accepted3")
                      }
                    />
                    <div className="remove-button-div">
                      <button
                        className="every-button red-button remove-button"
                        onClick={() => deleteQuestion(item.index)}
                      >
                        Remove Question
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {attempted ? (
            <div>
              <p className="input-labels">
                Please complete the red fields above.
              </p>
            </div>
          ) : null}
          <button
            className="every-button add-button"
            onClick={() => addQuestion()}
          >
            Add Question
          </button>
          <button
            className="every-button green-button create-button"
            onClick={() => {
              evaluateQuiz();
            }}
          >
            Create Quiz
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {uploaded === undefined ? (
          <h1>Sending...</h1>
        ) : (
          <div>
            <h1>Successfully posted</h1>
            <Link to={`/quizzes/${uploaded["_id"]}`}>
              <button className="every-button green-button">See Quiz</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
};

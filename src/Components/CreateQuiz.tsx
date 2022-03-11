import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postQuiz, allCategories, oneToTen } from "../Utils/utils";
import { Quiz, NewQuiz, Question, NewQuestion } from "../Types/quiz.interface";
import { QuizTips } from "./QuizTips";
import { QuizPreview } from "./QuizPreview";
import { QuestionBox } from "./QuestionBox";

export const CreateQuiz: React.FC = () => {
  // Creating an empty question, fitting the interface,
  // for whenever a new question is added by the player
  const emptyQuestion: NewQuestion = {
    index: 0,
    question: "",
    correct: "",
    accepted: [{ index: 0, text: "" }],
  };

  // Creating states which will eventually be used
  // to create the request body for the API
  const [questions, setQuestions] = useState<NewQuestion[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [category, setCategory] = useState<string>("Select");
  const [seconds, setSeconds] = useState<number>(0);

  // Creating a state with a boolean which becomes
  // true if the user has pressed "create quiz"
  // button but not all required fields are filled
  const [attempted, setAttempted] = useState<boolean>(false);

  // Create a state with a boolean which becomes
  // true if the quiz is valid and being posted
  const [built, setBuilt] = useState<boolean>(false);

  // Create a state which becomes the value of the
  // successfully posted quiz returned by the API
  const [uploaded, setUploaded] = useState<Quiz>();

  // Declaring function which adds an empty
  // instruction, each time with the correct index
  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  // Declaring function which adds an empty
  // question, each time with the correct index
  const addQuestion = () => {
    const newQuestion: NewQuestion = emptyQuestion;
    newQuestion.index = questions.length;
    setQuestions([...questions, newQuestion]);
  };

  // Declaring function which adds an empty accepted
  // answer, each time with the correct index
  const addAccepted = (question: number) => {
    const array = [...questions];
    questions[question].accepted.push({
      index: questions[question].accepted.length,
      text: "",
    });
    setQuestions(array);
  };

  // Declaring a function which removes a given question
  // from the array, and changes every other question's
  // "index" property accordingly, then updates the state
  const deleteQuestion = (index: number) => {
    const list = [...questions];
    list.splice(index, 1);
    for (let i = index; i < list.length; i++) {
      list[i].index--;
    }
    setQuestions(list);
  };

  // Declaring a function which is responsible for
  // updating the whole questions state upon every
  // single change in any fields in any of the questions
  const editQuestion = (text: string, index: number, part: string) => {
    const newQuestions = [...questions];
    if (part === "question") newQuestions[index].question = text;
    if (part === "correct") newQuestions[index].correct = text;
    if (part.slice(0, 8) === "accepted")
      newQuestions[index].accepted[parseInt(part.slice(8))].text = text;
    setQuestions(newQuestions);
  };

  // Declaring the important function which actually
  // creates and object which will fit the interface
  // "NewQuiz" required by the postQuiz util function,
  // in order to be sent to the database via the API.
  const buildQuiz = () => {
    const requestObject: NewQuiz = {
      title,
      creator,
      category,
      instructions,
      seconds,
      questions: [{ question: "", correct: "", accepted: [] }],
    };
    // Simplify object sent to the database by removing
    // unused instructions/accepted answer fields
    requestObject.instructions = requestObject.instructions.filter(
      (item) => item !== ""
    );
    // Change all accepted answer objects to just strings
    const formattedQuestions: Question[] = [];
    questions.forEach((question) => {
      const editedQuestion: Question = {
        question: question.question,
        correct: question.correct,
        accepted: [],
      };
      question.accepted.forEach((item) => {
        if (item.text !== "") editedQuestion.accepted.push(item.text);
      });
      formattedQuestions.push(editedQuestion);
    });
    requestObject.questions = formattedQuestions;
    // Setting the uploaded state to the value
    // of the quiz object returned by the API
    postQuiz(requestObject).then((response) => {
      setUploaded(response.data.data);
    });
  };

  // Declaring a function which, once called when a
  // user presses the "create quiz" button, will
  // check that all required fields are filled
  const evaluateQuiz = () => {
    setAttempted(false);
    let invalid: boolean = false;
    // Checking if the quiz title or creator name have
    // been left empty, or if the category or time limit
    // selector inputs have been left as the defaults
    if (
      title === "" ||
      creator === "" ||
      category === "Select" ||
      seconds === 0
    ) {
      invalid = true;
    }
    // Checking if any question has an empty "question"
    // or "correct" field
    questions.forEach((question) => {
      if (question.question === "" || question.correct === "") {
        invalid = true;
      }
    });
    // If all required fields were correctly filled,
    // the quiz object will be assembled and a post
    // request sent to the API. Otherwise, the attempted
    // state will be set to true.
    setAttempted(true);
    if (invalid) {
      setAttempted(true);
    } else {
      setBuilt(true);
      buildQuiz();
    }
  };

  // Up until the "create quiz" button has been pressed,
  // without errors, the main create page is rendered
  if (!built) {
    return (
      <div id="build-quiz-page">
        <QuizTips />

        <div id="quiz-details">
          <div>
            <h3 className="input-labels">Title:</h3>
            {/* If the user attempted to create the quiz */}
            {/* and the "title" field is empty, it will */}
            {/* be rendered in red, until no longer empty */}
            <input
              className={
                attempted && title === ""
                  ? "details-inputs red-input"
                  : "details-inputs"
              }
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <h3 className="input-labels">Your Name:</h3>
            {/* If the user attempted to create the quiz */}
            {/* and the "your name" field is empty, it will */}
            {/* be rendered in red, until no longer empty */}
            <input
              className={
                attempted && creator === ""
                  ? "details-inputs red-input"
                  : "details-inputs"
              }
              onChange={(e) => setCreator(e.target.value)}
            />
          </div>

          <div>
            <h3 className="input-labels">Category:</h3>
            {/* If the user attempted to create the quiz and */}
            {/* the "category" field is set to default, it */}
            {/* will be rendered in red, until no longer default */}
            <select
              className={
                attempted && category === "Select"
                  ? "every-button create-selector red-selector"
                  : "every-button create-selector"
              }
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Select">Select</option>
              {/* Creating options from imported categories */}
              {allCategories.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </div>

          <div id="instructions-div">
            <h3 className="input-labels">Instructions:</h3>
            {/* Creating 4 instructions input fields, but */}
            {/* never rendered in red as they aren't required */}
            {instructions.map((instruction) => {
              return (
                <input
                  className="details-inputs instructions-inputs"
                  onChange={(e) => {
                    const array = [...instructions];
                    array[parseInt(instruction) - 1] = e.target.value;
                    setInstructions(array);
                  }}
                />
              );
            })}
            {instructions.length < 5 ? (
              <button
                className="every-button yellow-add-button"
                onClick={() => addInstruction()}
              >
                Add Instruction
              </button>
            ) : null}
          </div>

          <div>
            <h3 className="input-labels">Time Limit:</h3>
            {/* If the user attempted to create the quiz and */}
            {/* the "time limit" field is set to default, it */}
            {/* will be rendered in red, until no longer default */}
            <select
              className={
                attempted && seconds === 0
                  ? "every-button create-selector red-selector"
                  : "every-button create-selector"
              }
              onChange={(e) => {
                setSeconds(60 * parseInt(e.target.value));
              }}
            >
              <option value="0">Select</option>
              {/* Creating options from imported numbers */}
              {oneToTen.map((num) => {
                return (
                  <option value={num}>
                    {num} {num === "1" ? "min" : "mins"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div>
          <h3 className="input-labels">Questions:</h3>
          <div id="quiz-questions-div">
            {/* Mapping through objects in questions state */}
            {questions.map((item) => {
              return (
                <QuestionBox
                  item={item}
                  attempted={attempted}
                  editQuestion={editQuestion}
                  deleteQuestion={deleteQuestion}
                  addAccepted={addAccepted}
                />
              );
            })}
          </div>

          {/* Only show add button if number of */}
          {/* questions is below 100 */}
          {questions.length < 100 ? (
            <button
              className="every-button yellow-add-button"
              onClick={() => addQuestion()}
            >
              Add Question
            </button>
          ) : null}
        </div>

        {/* Show preview when at least 1 question */}
        {questions.length ? <QuizPreview questions={questions} /> : null}

        {/* If the used pressed "create quiz" but there */}
        {/* were errors, this message will be displayed */}
        {attempted ? (
          <p className="input-labels bottom-error">
            Please complete the red fields above.
          </p>
        ) : null}

        {/* Show "create quiz" button as long as the */}
        {/* user has entered at least one question */}
        {questions.length ? (
          <button
            className="every-button green-button create-button"
            onClick={() => {
              evaluateQuiz();
            }}
          >
            Create Quiz
          </button>
        ) : null}
      </div>
    );
  } else {
    // If the "create button" has been pressed and no
    // errors found, the main create page will disappear
    // and be replaced by the "sending..." message, and
    // then by the link to the newly posted quiz
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

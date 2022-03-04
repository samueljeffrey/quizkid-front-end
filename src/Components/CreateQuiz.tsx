import React, { useState, useEffect } from "react";

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
    } else {
      setAttempted(true);
      setBuilt(false);
    }
  };

  useEffect(() => {
    addQuestion();
  }, []);

  if (!built) {
    return (
      <div>
        <div>
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

        <div>
          <div>
            <h3>Title:</h3>
            {attempted && title === "" ? <p>You must enter a title</p> : null}
            <input onChange={(e) => editTitle(e.target.value)} />
          </div>
          <div>
            <h3>Your Name:</h3>
            {attempted && creator === "" ? <p>You must enter a name</p> : null}
            <input onChange={(e) => editCreator(e.target.value)} />
          </div>
          <div>
            <h3>Category:</h3>
            {attempted && category === "Select" ? (
              <p>You must select a category</p>
            ) : null}
            <select
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
          </div>
          <div>
            <h3>Instructions:</h3>
            <input onChange={(e) => editInstructions(e.target.value, 0)} />
            <input onChange={(e) => editInstructions(e.target.value, 1)} />
            <input onChange={(e) => editInstructions(e.target.value, 2)} />
            <input onChange={(e) => editInstructions(e.target.value, 3)} />
          </div>
          <div>
            <h3>Time Limit:</h3>
            {attempted && seconds === 0 ? (
              <p>You must select a time limit</p>
            ) : null}
            <select
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
          </div>
        </div>

        <div>
          <h3>Questions:</h3>
          {questions.map((item) => {
            return (
              <div>
                <h4>{item.index + 1}.</h4>
                <div>
                  <p>Question:</p>
                  {attempted && item.question === "" ? (
                    <p>You must enter a question</p>
                  ) : null}
                  <input
                    onChange={(e) =>
                      editQuestion(e.target.value, item.index, "question")
                    }
                  />
                </div>
                <div>
                  <p>Correct:</p>
                  {attempted && item.correct === "" ? (
                    <p>You must enter an answer</p>
                  ) : null}
                  <input
                    onChange={(e) =>
                      editQuestion(e.target.value, item.index, "correct")
                    }
                  />
                </div>
                <div>
                  <p>Accepted:</p>
                  <input
                    onChange={(e) =>
                      editQuestion(e.target.value, item.index, "accepted0")
                    }
                  />
                  <input
                    onChange={(e) =>
                      editQuestion(e.target.value, item.index, "accepted1")
                    }
                  />
                  <input
                    onChange={(e) =>
                      editQuestion(e.target.value, item.index, "accepted2")
                    }
                  />
                  <input
                    onChange={(e) =>
                      editQuestion(e.target.value, item.index, "accepted3")
                    }
                  />
                </div>
                <div>
                  <button onClick={() => deleteQuestion(item.index)}>
                    Delete Question
                  </button>
                </div>
              </div>
            );
          })}
          <button onClick={() => addQuestion()}>Add Question</button>
        </div>

        <div>
          <button
            onClick={() => {
              evaluateQuiz();
            }}
          >
            Create
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>sending...</h1>
      </div>
    );
  }
};

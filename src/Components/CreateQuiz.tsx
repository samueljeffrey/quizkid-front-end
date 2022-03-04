import React, { useState } from "react";

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

  const [questions, setQuestions] = useState<Question[]>([emptyQuestion]);
  const [instructions, setInstructions] = useState<string[]>(["", "", "", ""]);
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState<string>("");

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

  const editTitle = (text: string) => {
    setTitle(text);
  };

  const editInstructions = (text: string, index: number) => {
    const array = [...instructions];
    array[index] = text;
    console.log(instructions);
    setInstructions(array);
  };

  return (
    <div>
      <div>
        <h1>Create your Quiz</h1>
        <h2>Tips:</h2>
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
          information will be given to players as bullet points. These could be
          "surnames are enough for correct answers", for example. You can add up
          to 4 instructions, or simply leave them empty.
        </p>
        <p>
          <strong>Time Limit:</strong> Select a time limit for your quiz from
          the options.
        </p>
        <p>
          <strong>Questions List:</strong> You can add another question to your
          quiz using the button below the last question. Or delete any question
          from the list using the button at the bottom of that question.
        </p>
        <p>
          <strong>Question:</strong> For each question in the quiz, first fill
          in the "question" field itself. If the title of your quiz indicates
          that the quiz is more of a list than individual questions, for
          example, if your quiz was titled "Name the last 10 UK Prime
          Ministers", then the "question" field in each question could just be a
          number (eg. 1), or instead, it could be a clue (eg. 1997-2007, if the
          answer was Tony Blair).
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
          changed for the quiz itself, to remove all spaces and change all
          letters to lower case. This means that, if the correct answer to a
          question is "Harry Potter", a player will actually be correct with
          "harry potter" or "harrypotter". The displayed answer in the table
          will still appear exactly as you entered it in that field. This also
          means that you don't need to add variations of capitalised and
          uncapitalised answers to your "accepted" answers lists, only answers
          with different spellings or different words. Furthermore, all
          characters which aren't numbers or letters are removed during
          gameplay, including apostrophes, so a player will be also correct if
          they answer "Charlottes Web", rather than "Charlotte's Web".
        </p>
      </div>

      <div>
        <h3>Title:</h3>
        <input onChange={(e) => editTitle(e.target.value)} />
        <h3>Instructions:</h3>
        <input onChange={(e) => editInstructions(e.target.value, 0)} />
        <input onChange={(e) => editInstructions(e.target.value, 1)} />
        <input onChange={(e) => editInstructions(e.target.value, 2)} />
        <input onChange={(e) => editInstructions(e.target.value, 3)} />
      </div>

      <div>
        {questions.map((item) => {
          return (
            <div>
              <h3>{item.index + 1}.</h3>
              <div>
                <p>Question:</p>
                <input
                  onChange={(e) =>
                    editQuestion(e.target.value, item.index, "question")
                  }
                />
              </div>
              <div>
                <p>Answer:</p>
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
    </div>
  );
};

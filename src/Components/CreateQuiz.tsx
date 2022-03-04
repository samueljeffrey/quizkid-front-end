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
  const [category, setCategory] = useState("Other");

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

  return (
    <div>
      <h1>Create a Quiz</h1>
      {questions.map((item) => {
        return (
          <div>
            <h2>{item.index + 1}.</h2>
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
              <p>(The answer above is automatically an accepted answer)</p>
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
      {/* <button onClick={()=>setPreview(true)}>Preview</button>
      {preview?  : null} */}
    </div>
  );
};

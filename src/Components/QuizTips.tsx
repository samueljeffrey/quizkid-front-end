import React from "react";

export const QuizTips: React.FC = () => {
  return (
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
        information will be given to players as bullet points. These could be
        "surnames are enough for correct answers", for example. You can add up
        to 4 instructions, or simply leave them empty.
      </p>
      <p>
        <strong>Time Limit:</strong> Select a time limit for your quiz from the
        options.
      </p>
      <p>
        <strong>Questions List:</strong> You can add another question to your
        quiz using the button below the last question. Or delete any question
        from the list using the button at the bottom of that question.
      </p>
      <p>
        <strong>Question:</strong> For each question in the quiz, first fill in
        the "question" field itself. If the title of your quiz indicates that
        the quiz is more of a list than individual questions, for example, if
        your quiz was titled "Name the last 10 UK Prime Ministers", then the
        "question" field in each question could just be a number (eg. 1), or
        instead, it could be a clue (eg. 1997-2007, if the answer was Tony
        Blair).
      </p>
      <p>
        <strong>Correct:</strong> Then, in the "correct" field, enter the answer
        you want to be displayed in the quiz for that question.
      </p>
      <p>
        <strong>Accepted:</strong> You may then add up to 3 "accepted" answers,
        or leave them empty. You don't need to add the "correct" answer here, as
        it is automatically accepted.
      </p>
      <p>
        <strong>***</strong> The correct and accepted answers are actually
        changed for the quiz itself, to remove all spaces and apostrophes, and
        to change all letters to lower case. For example, if the correct answer
        is "Philosopher's Stone", a player would actually be correct with
        "Philosophers Stone", "philosopher's stone", or even
        "philosophersstone". This also means that you don't need to add
        variations of capitalised and uncapitalised answers to your "accepted"
        answers lists, only answers with different spellings or different words.
        The displayed answer in the quiz, once guessed, will still appear
        exactly as you entered it in the "correct" field, regardless of how the
        user entered their valid answer.
        <strong>***</strong>
      </p>
    </div>
  );
};

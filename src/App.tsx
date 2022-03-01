import "./App.css";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { quizContext } from "./Contexts/quiz-context";
import Header from "./Components/Header";
import QuizList from "./Components/QuizList";
import PlayQuiz from "./Components/PlayQuiz";
import CreateQuiz from "./Components/CreateQuiz";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <quizContext.Provider value={{ quiz, setQuiz }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<QuizList category={category} />} />
            <Route path="/quizzes/:article_id" element={<PlayQuiz />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </quizContext.Provider>
    </BrowserRouter>
  );
}

export default App;

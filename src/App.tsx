import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { QuizList } from "./Components/QuizList";
import { PlayQuiz } from "./Components/PlayQuiz";
import { CreateQuiz } from "./Components/CreateQuiz";
import { ErrorPage } from "./Components/ErrorPage";

function App() {
  const [category, setCategory] = useState("All");

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<QuizList category={category} />} />
          <Route path="/quizzes/:quizId" element={<PlayQuiz />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

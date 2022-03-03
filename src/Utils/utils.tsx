import axios from "axios";

const api = axios.create({
  baseURL: "https://samueljeffrey-quizkid.herokuapp.com/api",
});

export const getQuizzes = (category?: string) => {
  let path: string = "/quizzes";
  if (category !== "All") path += `?category=${category}`;
  return api.get(path).then((response) => {
    return response.data;
  });
};

export const getQuiz = (id?: string) => {
  return api.get(`/quizzes/${id}`).then((response) => {
    return response.data;
  });
};

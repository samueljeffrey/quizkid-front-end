import axios from "axios";
import { NewQuiz } from "../Types/quiz.interface";

const api = axios.create({
  baseURL: "https://samueljeffrey-quizkid.herokuapp.com/api",
});

export const getQuizzes = (category?: string) => {
  let path: string = "/quizzes";
  if (category && category !== "All") path += `?category=${category}`;
  return api
    .get(path)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return { data: [] };
    });
};

export const getQuiz = (id?: string) => {
  return api.get(`/quizzes/${id}`).then((response) => {
    return response.data.data;
  });
};

export const patchQuiz = (id: string, plays: number, average: number) => {
  return api.patch(`/quizzes/${id}`, { plays, average }).then((response) => {});
};

export const postQuiz = (object: NewQuiz) => {
  return api.post(`/quizzes`, object).then((response) => {
    return response;
  });
};

export const dateSlicer = (date: string) => {
  let output = "";
  output += `${date.slice(8, 10)}/`;
  output += `${date.slice(5, 7)}/`;
  output += `${date.slice(0, 4)}`;
  return output;
};

export const simplify = (input: string) => {
  return input.toLowerCase().replaceAll(" ", "").replaceAll("'", "");
};

export const allCategories: string[] = [
  "Film/TV",
  "Geography",
  "History",
  "Languages",
  "Literature",
  "Maths",
  "Music",
  "Science",
  "Society",
  "Sport",
  "Other",
];

export const oneToTen: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

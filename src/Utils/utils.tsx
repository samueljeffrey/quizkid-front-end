import axios from "axios";

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

export const dateSlicer = (date: string) => {
  let output = "";
  output += `${date.slice(8, 10)}/`;
  output += `${date.slice(5, 7)}/`;
  output += `${date.slice(0, 4)}`;
  return output;
};

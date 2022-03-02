export interface Quiz {
  _id: string;
  name: string;
  category: string;
  instructions: string[];
  creator: string;
  questions: {
    question: string;
    correct: string;
    accepted: string[];
    _id: string;
  }[];
  seconds: number;
  plays: number;
  average: number;
  quizId: string;
  created: string;
  __v?: number;
}

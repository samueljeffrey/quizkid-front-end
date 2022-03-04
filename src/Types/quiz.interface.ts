export interface Quiz {
  _id: string;
  title: string;
  category: string;
  instructions: string[];
  creator: string;
  questions: Question[];
  seconds: number;
  plays: number;
  average: number;
  quizId: string;
  created: string;
  __v?: number;
}

export interface Question {
  question: string;
  correct: string;
  accepted: string[];
  _id?: string;
}

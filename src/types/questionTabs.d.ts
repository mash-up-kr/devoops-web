export interface Question {
  id: number;
  title: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  questions: Question[];
}

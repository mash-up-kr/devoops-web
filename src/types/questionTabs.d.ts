export interface Question {
  id: string;
  title: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface Question {
  questionId: number;
  category: string;
  content: string;
  isSelected: boolean;
  answerId: number | null;
  answer: string | null;
}

export interface PullRequestDetail {
  id: number;
  title: string;
  tag: string;
  recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
  mergedAt: string;
  summary: string;
  categories: string[];
  questions: Question[];
}

export interface CategoryWithQuestions {
  category: string;
  questions: {
    questionId: number;
    question: string;
  }[];
}

export interface RetrospectiveQuestionsProps {
  questions: CategoryWithQuestions[];
}

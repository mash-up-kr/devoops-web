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

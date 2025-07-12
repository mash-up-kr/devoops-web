'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import FixedFooter from '@/components/retrospective/FixedFooter';
import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveAnswers from '@/components/retrospective/RetrospectiveAnswers';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';
import { usePullRequestDetail } from '@/hooks/api/retrospective/usePullRequestDetail';
import { useUpdateAllAnswersMutation } from '@/hooks/api/retrospective/useUpdateAllAnswersMutation';
import type { CategoryWithQuestions } from '@/types/retrospective';

export default function RetrospectivePage() {
  const params = useParams();
  const pullRequestId = params?.pullRequestId as string;

  const [answers, setAnswers] = useState<{ answerId: number; content: string }[]>([]);
  const [user, setUser] = useState(null);

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);

  const handleSelectQuestion = (questionId: number) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    );
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setUser(userString ? JSON.parse(userString) : null);
  }, []);

  const { data, isLoading, error } = usePullRequestDetail(Number(pullRequestId), user);
  const { mutate: autoSaveAnswers } = useUpdateAllAnswersMutation();

  useEffect(() => {
    if (!user || answers.length === 0) return undefined;
    const interval = setInterval(() => {
      autoSaveAnswers({
        query: { user },
        data: { answers },
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [user, answers, autoSaveAnswers]);

  if (user === null) return <div>{'로그인이 필요합니다.'}</div>;
  if (isLoading) return <div>{'Loading...'}</div>;
  if (error || !data) return <div>{'데이터를 불러오지 못했습니다.'}</div>;

  const formattedSummary = [
    {
      title: 'AI 회고 요약',
      content: data.summary.split('\n').filter((line) => line.trim() !== ''),
    },
  ];

  const groupedQuestions: CategoryWithQuestions[] = data.questions.reduce<CategoryWithQuestions[]>((acc, question) => {
    if (question.questionId === undefined || question.content === undefined || question.category === undefined) {
      return acc;
    }

    const existing = acc.find((item) => item.category === question.category);

    const mappedQuestion = {
      questionId: question.questionId,
      question: question.content,
    };

    if (existing) {
      existing.questions.push(mappedQuestion);
    } else {
      acc.push({
        category: question.category,
        questions: [mappedQuestion],
      });
    }

    return acc;
  }, []);

  const selectedQuestions = groupedQuestions
    .flatMap((categoryItem) => categoryItem.questions)
    .filter((q) => selectedQuestionIds.includes(q.questionId))
    .map((q) => ({
      questionId: q.questionId,
      content: q.question,
      answer: null,
    }));

  return (
    <>
      <RetrospectiveHeader title={data.title} tag={data.tag} mergedAt={data.mergedAt} />

      <main className={'flex flex-col gap-[68px]'}>
        <PullRequestSummary summary={formattedSummary} />
        <RetrospectiveQuestions
          questions={groupedQuestions}
          selectedQuestionIds={selectedQuestionIds}
          onSelectQuestion={handleSelectQuestion}
        />
        <RetrospectiveAnswers answers={selectedQuestions} writtenAnswers={answers} setWrittenAnswers={setAnswers} />
      </main>

      <FixedFooter pullRequestId={pullRequestId} user={user} answers={answers} />
    </>
  );
}

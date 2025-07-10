'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import FixedFooter from '@/components/retrospective/FixedFooter';
import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveAnswers from '@/components/retrospective/RetrospectiveAnswers';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';
import { usePullRequestDetail } from '@/hooks/api/retrospective/usePullRequestDetail';
import type { CategoryWithQuestions, Question } from '@/types/retrospective';

export default function RetrospectivePage() {
  const params = useParams();
  const pullRequestId = params?.pullRequestId as string;

  const [answers, setAnswers] = useState<{ answerId: number; content: string }[]>([]);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const { data, isLoading, error } = usePullRequestDetail(Number(pullRequestId), user);

  if (!user) return <div>{'로그인이 필요합니다.'}</div>;
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

  const isValidSelectedQuestion = (
    q: any,
  ): q is Required<Pick<any, 'questionId' | 'category' | 'content' | 'isSelected'>> & {
    answer: string;
    answerId: number | null;
  } => {
    return (
      q.isSelected === true &&
      typeof q.answer === 'string' &&
      q.answer.trim() !== '' &&
      typeof q.questionId === 'number' &&
      typeof q.category === 'string' &&
      typeof q.content === 'string' &&
      (typeof q.answerId === 'number' || q.answerId === null)
    );
  };

  const mappedAnswers: Question[] = data.questions.filter(isValidSelectedQuestion).map((q) => ({
    questionId: q.questionId as number,
    category: q.category as string,
    content: q.content as string,
    isSelected: q.isSelected as boolean,
    answerId: q.answerId ?? null,
    answer: q.answer ?? null,
  }));

  return (
    <>
      <RetrospectiveHeader title={data.title} tag={data.tag} mergedAt={data.mergedAt} />

      <main className={'flex flex-col gap-[68px]'}>
        <PullRequestSummary summary={formattedSummary} />
        <RetrospectiveQuestions questions={groupedQuestions} />
        <RetrospectiveAnswers answers={mappedAnswers} writtenAnswers={answers} setWrittenAnswers={setAnswers} />
      </main>

      <FixedFooter pullRequestId={pullRequestId} user={user} answers={answers} />
    </>
  );
}

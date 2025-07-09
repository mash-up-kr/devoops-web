'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { PullRequestReadResponseType } from '@/__generated__/@types';
import { fetchPullRequestById } from '@/apis/retrospective';
import FixedFooter from '@/components/retrospective/FixedFooter';
import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveAnswers from '@/components/retrospective/RetrospectiveAnswers';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';
import type { CategoryWithQuestions, Question } from '@/types/retrospective';

export default function RetrospectivePage() {
  const params = useParams();
  const pullRequestId = params?.pullRequestId as string;

  const [data, setData] = useState<PullRequestReadResponseType | null>(null);
  const [answers, setAnswers] = useState<{ answerId: number; content: string }[]>([]);

  const mockUser = {
    id: 1,
    githubId: 'mock-user',
    nickname: '서진',
    profileImageUrl: '',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPullRequestById(Number(pullRequestId), mockUser);
        setData(res);
      } catch (error) {
        console.error('PR 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [pullRequestId]);

  if (!data) return <div>{'Loading...'}</div>;

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

  const mappedAnswers: Question[] = data.questions
    .filter(
      (q) =>
        q.isSelected === true &&
        typeof q.answer === 'string' &&
        q.answer.trim() !== '' &&
        typeof q.questionId === 'number' &&
        typeof q.category === 'string' &&
        typeof q.content === 'string' &&
        (typeof q.answerId === 'number' || q.answerId === null),
    )
    .map((q) => ({
      questionId: q.questionId!,
      category: q.category!,
      content: q.content!,
      isSelected: q.isSelected!,
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

      <FixedFooter pullRequestId={pullRequestId} user={mockUser} answers={answers} />
    </>
  );
}

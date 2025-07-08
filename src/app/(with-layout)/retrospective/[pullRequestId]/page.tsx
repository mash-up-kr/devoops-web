'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchMockPullRequestById } from '@/apis/retrospective.mock';
// import { fetchPullRequestById } from '@/apis/retrospective';

import FixedFooter from '@/components/retrospective/FixedFooter';
import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveAnswers from '@/components/retrospective/RetrospectiveAnswers';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';
import type { CategoryWithQuestions, PullRequestDetail } from '@/types/retrospective';

export default function RetrospectivePage() {
  const params = useParams();
  const pullRequestId = params?.pullRequestId as string;

  const [data, setData] = useState<PullRequestDetail | null>(null);

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
        const res = await fetchMockPullRequestById(pullRequestId);
        setData(res);
        // const accessToken = localStorage.getItem('accessToken') ?? '';
        // const res = await fetchPullRequestById(pullRequestId, accessToken);
        // setData(res);
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

  return (
    <>
      <RetrospectiveHeader title={data.title} tag={data.tag} mergedAt={data.mergedAt} />

      <main className={'flex flex-col gap-[68px]'}>
        <PullRequestSummary summary={formattedSummary} />
        <RetrospectiveQuestions questions={groupedQuestions} />
        <RetrospectiveAnswers
          answers={data.questions.filter((q) => q.isSelected)}
          writtenAnswers={answers}
          setWrittenAnswers={setAnswers}
        />
      </main>

      {/* 실제 user로 변경 필요  */}
      <FixedFooter pullRequestId={pullRequestId} user={mockUser} answers={answers} />
    </>
  );
}

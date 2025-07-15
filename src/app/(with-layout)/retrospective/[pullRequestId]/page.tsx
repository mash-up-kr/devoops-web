'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import TopIcon from '@/components/common/icons/TopIcon';
import TopButton from '@/components/common/TopButton';
import FixedFooter from '@/components/retrospective/FixedFooter';
import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveAnswers from '@/components/retrospective/RetrospectiveAnswers';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';
import { useAutoSave } from '@/hooks/api/retrospective/useAutoSave';
import { usePullRequestDetail } from '@/hooks/api/retrospective/usePullRequestDetail';
import type { CategoryWithQuestions } from '@/types/retrospective';

export default function RetrospectivePage() {
  const params = useParams();
  const pullRequestId = params?.pullRequestId as string;

  const [errorIds, setErrorIds] = useState<number[]>([]);

  const [answers, setAnswers] = useState<{ answerId: number; content: string }[]>([]);
  const [lastSubmittedAnswers, setLastSubmittedAnswers] = useState<{ answerId: number; content: string }[]>([]);
  const [user, setUser] = useState(null);

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);
  const [isRetrospectiveDone, setIsRetrospectiveDone] = useState(false);

  const handleDeleteAnswer = (questionId: number) => {
    setSelectedQuestionIds((prev) => prev.filter((id) => id !== questionId));
  };

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

  // 자동저장 훅을 조건부 렌더링 이전에 호출
  const { autoSaveStatus } = useAutoSave({
    user,
    answers: data
      ? selectedQuestionIds.map((questionId) => {
          const backend = data.questions.find((dq) => dq.questionId === questionId);
          return {
            answerId: backend?.answerId ?? questionId,
            content: answers.find((a) => a.answerId === questionId)?.content ?? '',
          };
        })
      : [],
    debounceMs: 3000, // 3초 디바운스
  });

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

  let status: '전' | '중' | '완료' = '전';
  if (selectedQuestionIds.length > 0) status = '중';
  if (isRetrospectiveDone) status = '완료';

  const handleRetrospectiveComplete = () => {
    setIsRetrospectiveDone(true);
    setErrorIds([]); // 에러 상태 초기화
  };

  return (
    <>
      <RetrospectiveHeader title={data.title} tag={data.tag} mergedAt={data.mergedAt} status={status} />

      <main className={'flex flex-col gap-[68px]'}>
        <PullRequestSummary summary={formattedSummary} />
        <RetrospectiveQuestions
          questions={groupedQuestions}
          selectedQuestionIds={selectedQuestionIds}
          onSelectQuestion={handleSelectQuestion}
        />
        <RetrospectiveAnswers
          answers={selectedQuestions}
          writtenAnswers={answers}
          setWrittenAnswers={setAnswers}
          onDeleteAnswer={handleDeleteAnswer}
          errorIds={errorIds}
        />
      </main>

      <FixedFooter
        pullRequestId={pullRequestId}
        user={user}
        answers={selectedQuestions.map((q) => {
          const backend = data.questions.find((dq) => dq.questionId === q.questionId);
          return {
            answerId: backend?.answerId ?? q.questionId,
            content: answers.find((a) => a.answerId === q.questionId)?.content ?? '',
          };
        })}
        questions={selectedQuestions.map((q) => {
          const backend = data.questions.find((dq) => dq.questionId === q.questionId);
          return {
            answerId: backend?.answerId ?? q.questionId,
            questionId: q.questionId,
          };
        })}
        lastSubmittedAnswers={lastSubmittedAnswers}
        setLastSubmittedAnswers={setLastSubmittedAnswers}
        onComplete={handleRetrospectiveComplete}
        onErrorIds={setErrorIds}
        autoSaveStatus={autoSaveStatus}
      />
      <TopButton icon={<TopIcon />} />
    </>
  );
}

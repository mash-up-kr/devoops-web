'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { PullRequestDetailReadResponseType, QuestionAnswerResponseType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';
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

  const [answers, setAnswers] = useState<{ answerId: number; questionId: number; content: string }[]>([]);
  const [lastSubmittedAnswers, setLastSubmittedAnswers] = useState<{ answerId: number; content: string }[]>([]);
  const [user, setUser] = useState(null);

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);
  const [isRetrospectiveDone, setIsRetrospectiveDone] = useState(false);

  const handleDeleteAnswer = async (questionId: number) => {
    const answerObj = answers.find((a) => a.questionId === questionId);
    if (!answerObj) return;
    try {
      await apiApi.deleteAnswer({ answerId: answerObj.answerId, data: { content: answerObj.content } });
      setAnswers((prev) => prev.filter((a) => a.questionId !== questionId));
      setSelectedQuestionIds((prev) => prev.filter((id) => id !== questionId));
    } catch {
      alert('회고 답변 삭제에 실패했습니다.');
    }
  };

  const handleSelectQuestion = async (questionId: number) => {
    try {
      const res = await apiApi.createAnswer({ questionId });
      const answerId = res.data.id;
      if (typeof answerId === 'number') {
        const alreadyAnswered = answers.some((a) => a.questionId === questionId);
        if (!alreadyAnswered) {
          setAnswers((prev) => [...prev, { answerId, questionId, content: '' }]);
        }
        setSelectedQuestionIds((prev) => (prev.includes(questionId) ? prev : [...prev, questionId]));
      }
    } catch {
      alert('회고 답변 생성에 실패했습니다.');
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    setUser(userString ? JSON.parse(userString) : null);
  }, []);

  const { data: rawData, isLoading, error } = usePullRequestDetail(Number(pullRequestId), user);
  const data = rawData as PullRequestDetailReadResponseType | undefined;

  const { autoSaveStatus } = useAutoSave({
    user,
    answers: selectedQuestionIds
      .map((questionId) => {
        const answerObj = answers.find((a) => a.questionId === questionId);
        if (!answerObj) return undefined;
        return {
          answerId: answerObj.answerId,
          content: answerObj.content,
        };
      })
      .filter((a): a is { answerId: number; content: string } => !!a),
    debounceMs: 3000,
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

  const groupedQuestions: CategoryWithQuestions[] = data.questions.reduce<CategoryWithQuestions[]>(
    (acc, question: QuestionAnswerResponseType) => {
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
    },
    [],
  );

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
    setErrorIds([]);
  };

  const getAnswerContent = (questionId: number) => {
    return answers.find((a) => a.questionId === questionId)?.content ?? '';
  };

  const handleChange = (questionId: number, newContent: string) => {
    setAnswers((prev) => {
      const exists = prev.some((a) => a.questionId === questionId);
      if (exists) {
        return prev.map((a) => (a.questionId === questionId ? { ...a, content: newContent } : a));
      }

      const answerObj = answers.find((ans) => ans.questionId === questionId);
      return [
        ...prev,
        {
          answerId: answerObj?.answerId ?? questionId,
          questionId,
          content: newContent,
        },
      ];
    });
  };

  return (
    <>
      <RetrospectiveHeader
        title={data.title}
        tag={data.tag}
        mergedAt={data.mergedAt}
        status={status}
        pullRequestUrl={data.pullRequestUrl}
      />

      <main className={'flex flex-col gap-[68px]'}>
        <PullRequestSummary summary={formattedSummary} />
        <RetrospectiveQuestions
          questions={groupedQuestions}
          selectedQuestionIds={selectedQuestionIds}
          onSelectQuestion={handleSelectQuestion}
        />
        <RetrospectiveAnswers
          selectedQuestions={selectedQuestions}
          answers={answers}
          getAnswerContent={getAnswerContent}
          handleChange={handleChange}
          onDeleteAnswer={handleDeleteAnswer}
          errorIds={errorIds}
        />
      </main>

      <FixedFooter
        pullRequestId={pullRequestId}
        user={user}
        answers={selectedQuestions
          .map((q) => {
            const answerObj = answers.find((a) => a.questionId === q.questionId);
            if (!answerObj) return undefined;
            return {
              answerId: answerObj.answerId,
              content: answerObj.content,
            };
          })
          .filter((a): a is { answerId: number; content: string } => !!a)}
        questions={selectedQuestions
          .map((q) => {
            const answerObj = answers.find((a) => a.questionId === q.questionId);
            if (!answerObj) return undefined;
            return {
              answerId: answerObj.answerId,
              questionId: q.questionId,
            };
          })
          .filter((a): a is { answerId: number; questionId: number } => !!a)}
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

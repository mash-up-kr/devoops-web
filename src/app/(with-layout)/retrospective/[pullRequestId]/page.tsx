'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import type { QuestionAnswerResponseType } from '@/__generated__/@types';
import { useCreateAnswerMutation, useDeleteAnswerMutation } from '@/apis/pull-requests/pullRequests.mutate';
import { useGetDetailPullRequestQuery } from '@/apis/pull-requests/pullRequests.query';
import { useGetMyInfoQuery } from '@/apis/user/user.query';
import TopIcon from '@/components/common/icons/TopIcon';
import TopButton from '@/components/common/TopButton';
import FixedFooter from '@/components/retrospective/FixedFooter';
import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveAnswers from '@/components/retrospective/RetrospectiveAnswers';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';
import RetrospectivePageSkeleton from '@/components/retrospective/Skeleton/RetrospectivePageSkeleton';
import { useAutoSave } from '@/hooks/api/retrospective/useAutoSave';
import type { CategoryWithQuestions } from '@/types/retrospective';

export default function RetrospectivePage() {
  const params = useParams();
  const pullRequestId = params?.pullRequestId as string;

  const [errorIds, setErrorIds] = useState<number[]>([]);

  const [answers, setAnswers] = useState<{ answerId: number; questionId: number; content: string }[]>([]);
  const [lastSubmittedAnswers, setLastSubmittedAnswers] = useState<{ answerId: number; content: string }[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);
  const [isRetrospectiveDone, setIsRetrospectiveDone] = useState(false);

  const queryClient = useQueryClient();

  const createAnswerMutation = useCreateAnswerMutation();
  const deleteAnswerMutation = useDeleteAnswerMutation();

  useEffect(() => {
    if (!pullRequestId) return;
    queryClient.invalidateQueries({ queryKey: ['pullRequestDetail', Number(pullRequestId)] });
    queryClient.removeQueries({ queryKey: ['pullRequestDetail', Number(pullRequestId)] });
  }, [pullRequestId, queryClient]);

  const { data: userData, isLoading: userLoading } = useGetMyInfoQuery({});
  const user = userData?.data || null;

  const {
    data: rawData,
    isLoading,
    error,
  } = useGetDetailPullRequestQuery({
    variables: {
      pullRequestId: Number(pullRequestId),
    },
    options: {
      enabled: !!pullRequestId && !!user,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  });

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

  // 서버 데이터 기반으로 최신 상태 렌더링
  useEffect(() => {
    if (!rawData?.data?.questions) return;

    if (rawData.data.recordStatus === 'DONE') {
      setIsRetrospectiveDone(true);
    }

    const preSelected = rawData.data.questions.filter((q) => q.answerId != null);
    setSelectedQuestionIds(preSelected.map((q) => q.questionId!).filter((id): id is number => id !== undefined));

    const newAnswers = preSelected.map((q) => ({
      answerId: q.answerId!,
      questionId: q.questionId!,
      content: q.answer ?? '',
    }));

    setAnswers(newAnswers);

    if (rawData.data.recordStatus === 'DONE') {
      setLastSubmittedAnswers(newAnswers.map(({ answerId, content }) => ({ answerId, content })));
    }
  }, [rawData?.data?.questions, rawData?.data?.recordStatus]);

  if (userLoading || isLoading) return <RetrospectivePageSkeleton />;
  if (!user) return <div>{'로그인이 필요합니다.'}</div>;
  if (error || !rawData?.data) return <div>{'데이터를 불러오지 못했습니다.'}</div>;

  const formattedSummary = [
    {
      title: 'AI 회고 요약',
      content: rawData?.data?.summary?.split('\n').filter((line) => line.trim() !== '') ?? [],
    },
  ];

  const groupedQuestions: CategoryWithQuestions[] = rawData?.data?.questions?.reduce<CategoryWithQuestions[]>(
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
    ?.flatMap((categoryItem) => categoryItem.questions)
    ?.filter((q) => selectedQuestionIds.includes(q.questionId))
    ?.map((q) => ({
      questionId: q.questionId,
      content: q.question,
      answer: null,
    }));

  // 상태 결정 로직 개선: recordStatus가 DONE이거나 isRetrospectiveDone이 true면 무조건 '완료'
  let status: '전' | '중' | '완료' = '전';
  if (rawData?.data?.recordStatus === 'DONE' || isRetrospectiveDone) {
    status = '완료';
  } else if (selectedQuestionIds.length > 0) {
    status = '중';
  }

  const handleRetrospectiveComplete = () => {
    setIsRetrospectiveDone(true);
    setErrorIds([]);
    // 이미 완료된 상태라면 답변과 선택된 질문을 초기화하지 않음
    if (!isRetrospectiveDone) {
      setAnswers([]);
      setSelectedQuestionIds([]);
    }
  };

  const getAnswerContent = (questionId: number) => {
    return answers.find((a) => a.questionId === questionId)?.content ?? '';
  };

  const handleChange = (questionId: number, newContent: string) => {
    setAnswers((prev) => {
      const exists = prev.some((a) => a.questionId === questionId);
      if (exists) {
        return prev?.map((a) => (a.questionId === questionId ? { ...a, content: newContent } : a));
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

  const handleDeleteAnswer = async (questionId: number) => {
    const answerObj = answers.find((a) => a.questionId === questionId);
    if (!answerObj) return;

    await deleteAnswerMutation.mutateAsync({ answerId: answerObj.answerId, data: { content: '' } });
    setAnswers((prev) => prev.filter((a) => a.questionId !== questionId));
    setSelectedQuestionIds((prev) => prev.filter((id) => id !== questionId));
    setLastSubmittedAnswers((prev) => prev.filter((a) => a.answerId !== answerObj.answerId));
  };

  const handleSelectQuestion = async (questionId: number) => {
    try {
      const res = await createAnswerMutation.mutateAsync({ questionId });
      const answerId = res.data.id;
      if (typeof answerId === 'number') {
        const alreadyAnswered = answers.some((a) => a.questionId === questionId);
        if (!alreadyAnswered) {
          setAnswers((prev) => [...prev, { answerId, questionId, content: '' }]);
        }
        setSelectedQuestionIds((prev) => (prev.includes(questionId) ? prev : [...prev, questionId]));
      }
    } catch {
      // 에러 무시
    }
  };

  return (
    <>
      <RetrospectiveHeader
        title={rawData?.data?.title}
        tag={rawData?.data?.tag}
        mergedAt={rawData?.data?.mergedAt}
        status={status}
        pullRequestUrl={rawData?.data?.pullRequestUrl}
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
        answers={selectedQuestions
          ?.map((q) => {
            const answerObj = answers.find((a) => a.questionId === q.questionId);
            if (!answerObj) return undefined;
            return {
              answerId: answerObj.answerId,
              content: answerObj.content,
            };
          })
          ?.filter((a): a is { answerId: number; content: string } => !!a)}
        questions={selectedQuestions
          ?.map((q) => {
            const answerObj = answers.find((a) => a.questionId === q.questionId);
            if (!answerObj) return undefined;
            return {
              answerId: answerObj.answerId,
              questionId: q.questionId,
            };
          })
          ?.filter((a): a is { answerId: number; questionId: number } => !!a)}
        lastSubmittedAnswers={lastSubmittedAnswers}
        setLastSubmittedAnswers={setLastSubmittedAnswers}
        onComplete={handleRetrospectiveComplete}
        onErrorIds={setErrorIds}
        autoSaveStatus={autoSaveStatus}
        isCompleted={isRetrospectiveDone}
      />
      <TopButton icon={<TopIcon />} />
    </>
  );
}

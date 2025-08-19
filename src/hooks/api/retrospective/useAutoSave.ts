import { useState, useCallback, useEffect, useRef } from 'react';

import type { UserType } from '@/__generated__/@types';
import { useUpdateAnswerMutation } from '@/apis/pull-requests/pullRequests.mutate';

interface UseAutoSaveProps {
  user: UserType | null;
  answers: { answerId: number; content: string }[];
  debounceMs?: number;
}

export const useAutoSave = ({ answers, debounceMs = 3000 }: UseAutoSaveProps) => {
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const updateAnswerMutation = useUpdateAnswerMutation();

  // timeoutRef : 자동저장 타이머 관리 (타이핑 멈춘 후 3초 뒤에 자동저장)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // lastSaveRef : 마지막 저장된 상태 저장용 (내용이 바뀐 경우에만 API 호출하도록))
  const lastSavedRef = useRef<{ answerId: number; content: string }[]>([]);

  // 변경된 답변 감지 (새로 추가된 답변 + 기존 변경된 답변)
  const getChangedAnswers = useCallback(() => {
    // 새로 추가된 답변들 (lastSavedRef에 없는 answerId)
    const newAnswers = answers.filter(
      (answer) => !lastSavedRef.current.find((ls) => ls.answerId === answer.answerId) && answer.content.trim() !== '', // 내용이 있는 새 답변만
    );

    // 기존 변경된 답변들
    const modifiedAnswers = answers.filter((answer) => {
      const lastSaved = lastSavedRef.current.find((ls) => ls.answerId === answer.answerId);
      // 조건: 마지막 저장된 답변 존재 + 내용이 변경됨 + 내용이 비어있지 않음
      return lastSaved && lastSaved.content !== answer.content && answer.content.trim() !== '';
    });

    // 새 답변 + 변경된 답변 합치기
    return [...newAnswers, ...modifiedAnswers];
  }, [answers]);

  // 자동저장 실행
  const executeAutoSave = useCallback(async () => {
    const changedAnswers = getChangedAnswers();
    if (changedAnswers.length === 0) return;

    setAutoSaveStatus('saving');

    try {
      // 변경된 답변들을 동시에 업데이트 (Promise.all 사용)
      await Promise.all(
        changedAnswers.map((answer) =>
          updateAnswerMutation.mutateAsync({
            answerId: answer.answerId,
            data: { content: answer.content },
          }),
        ),
      );

      // 마지막 저장된 상태 업데이트
      lastSavedRef.current = [...answers];
      setAutoSaveStatus('saved');

      // 2초 후 idle 상태로 복귀
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setAutoSaveStatus('idle');
    }
  }, [answers, getChangedAnswers, updateAnswerMutation]);

  useEffect(() => {
    // 새로 추가된 답변이 있는지 확인
    const hasNewAnswers = answers.some((answer) => !lastSavedRef.current.find((ls) => ls.answerId === answer.answerId));

    // 초기화: 새 답변이 있거나 초기 상태면 lastSavedRef 업데이트
    if (hasNewAnswers || (!lastSavedRef.current.length && answers.length > 0)) {
      lastSavedRef.current = [...answers];
    }

    // 이전 타이머가 있으면 취소 후 새로운 타이머 설정
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      executeAutoSave();
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [answers, debounceMs, executeAutoSave]);

  return {
    autoSaveStatus,
    answers,
    changedAnswers: getChangedAnswers(),
    isSaving: autoSaveStatus === 'saving',
    isSaved: autoSaveStatus === 'saved',
  };
};

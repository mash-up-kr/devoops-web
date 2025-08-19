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

  // 변경된 답변 감지  (실제로 바뀐 답변만 필터링함))
  const getChangedAnswers = useCallback(() => {
    if (!lastSavedRef.current.length) return [];

    return answers.filter((answer) => {
      const lastSaved = lastSavedRef.current.find((ls) => ls.answerId === answer.answerId);
      // 조건 3가지
      // 1. 마지막 저장된 답변 존재 , 2. 마지막 저장된 내용과 현재 내용 다름 , 3. 현재 내용이 비어있지 않음
      return lastSaved && lastSaved.content !== answer.content && answer.content.trim() !== '';
    });
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
    // 초기화: 마지막 저장된 상태가 없고 답변이 있으면 초기화
    if (!lastSavedRef.current.length && answers.length > 0) {
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

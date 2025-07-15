import { useEffect, useState, useCallback } from 'react';

import type { UserType } from '@/__generated__/@types';
import { useUpdateAnswerMutation } from '@/hooks/api/retrospective/useUpdateAnswerMutation';

interface UseAutoSaveProps {
  user: UserType | null;
  answers: { answerId: number; content: string }[];
  debounceMs?: number;
}

export const useAutoSave = ({ user, answers, debounceMs = 3000 }: UseAutoSaveProps) => {
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSavedAnswers, setLastSavedAnswers] = useState<{ answerId: number; content: string }[]>([]);

  const updateAnswerMutation = useUpdateAnswerMutation();

  const getChangedAnswers = useCallback(() => {
    return answers.filter((answer) => {
      const lastSaved = lastSavedAnswers.find((saved) => saved.answerId === answer.answerId);
      return (!lastSaved || lastSaved.content !== answer.content) && answer.content.trim() !== '';
    });
  }, [answers, lastSavedAnswers]);

  const executeAutoSave = useCallback(async () => {
    if (!user) return undefined;

    const changedAnswers = getChangedAnswers();
    if (changedAnswers.length === 0) return undefined;

    try {
      setAutoSaveStatus('saving');
      await Promise.all(
        changedAnswers.map((answer) =>
          updateAnswerMutation.mutateAsync({
            user,
            answerId: answer.answerId,
            content: answer.content,
          }),
        ),
      );
      setLastSavedAnswers([...answers]);
      setTimeout(() => {
        setAutoSaveStatus('saved');
        setTimeout(() => {
          setAutoSaveStatus('idle');
        }, 3000);
      }, 2000);
    } catch (error) {
      console.error('자동저장 실패:', error);
      setAutoSaveStatus('idle');
    }

    return undefined;
  }, [user, answers, getChangedAnswers, updateAnswerMutation]);

  useEffect(() => {
    if (user && getChangedAnswers().length > 0) {
      const timeoutId = setTimeout(() => {
        executeAutoSave();
      }, debounceMs);

      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [answers, debounceMs, executeAutoSave, getChangedAnswers, user]);

  return {
    autoSaveStatus,
    isAutoSaving: autoSaveStatus === 'saving',
  };
};

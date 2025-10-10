'use client';

import { useEffect } from 'react';

import { useModalDispatch } from '@/providers/ModalContext';

export function CloseAllModal() {
  const dispatch = useModalDispatch();

  useEffect(() => {
    dispatch({ type: 'CLOSE_ALL' });
  }, []);

  return null;
}

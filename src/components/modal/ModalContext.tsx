'use client';

import { createContext, useContext, useEffect, useReducer, Dispatch, ReactNode } from 'react';

import { type ModalAction } from '@/types/modal';

type ModalState = { isOpen: boolean };
type ModalDispatch = Dispatch<ModalAction>;

interface ModalProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN':
      return { isOpen: true };
    case 'CLOSE':
      return { isOpen: false };
    default:
      return state;
  }
}

const ModalStateContext = createContext<ModalState | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

// TODO: 컨텍스트는 provider 폴더로 이전할 것
export function useModalState() {
  const context = useContext(ModalStateContext);
  if (!context) throw new Error('useModalState must be used within a <ModalProvider>');
  return context;
}

export function useModalDispatch() {
  const context = useContext(ModalDispatchContext);
  if (!context) throw new Error('useModalDispatch must be used within a <ModalProvider>');
  return context;
}

export default function ModalProvider({ children, defaultOpen = false }: ModalProviderProps) {
  const [state, dispatch] = useReducer(modalReducer, { isOpen: false });

  useEffect(() => {
    if (defaultOpen) {
      dispatch({ type: 'OPEN' });
    }
  }, [defaultOpen]);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

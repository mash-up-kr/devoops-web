'use client';

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';

import type { ModalAction } from '@/types/modal';

type ModalState = {
  isOpen: boolean;
};

const initialState: ModalState = {
  isOpen: false,
};

type ModalDispatch = Dispatch<ModalAction>;

const ModalStateContext = createContext<ModalState | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

function modalReducer(state: ModalState, action: ModalAction) {
  switch (action.type) {
    case 'OPEN':
      return { isOpen: true };
    case 'CLOSE':
      return { isOpen: false };
    default:
      return state;
  }
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

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

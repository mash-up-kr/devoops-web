'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

import type { ModalAction, ModalState, ModalDispatch } from '@/types/modal';

const ModalStateContext = createContext<ModalState | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

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

export function useIsModalOpen(modalId: string): boolean {
  const state = useModalState();
  return state.openModals.has(modalId);
}

interface ModalProviderProps {
  children: ReactNode;
}

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN': {
      const newOpenModals = new Set(state.openModals);
      newOpenModals.add(action.modalId);
      return { openModals: newOpenModals };
    }
    case 'CLOSE': {
      const newOpenModals = new Set(state.openModals);
      newOpenModals.delete(action.modalId);
      return { openModals: newOpenModals };
    }
    case 'CLOSE_ALL': {
      return { openModals: new Set<string>() };
    }
    default:
      throw new Error(`Unhandled action`);
  }
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [state, dispatch] = useReducer(modalReducer, { openModals: new Set<string>() });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

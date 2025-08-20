import { Dispatch } from 'react';

export type ModalActionType = 'OPEN' | 'CLOSE';

export interface ModalButtonProps {
  action: ModalActionType;
  className?: string;
}

export type ModalAction =
  | {
      type: 'OPEN' | 'CLOSE';
      modalId: string;
    }
  | { type: 'CLOSE_ALL' };

export type ModalState = {
  openModals: Set<string>;
};

export type ModalDispatch = Dispatch<ModalAction>;

import type { ReactNode } from 'react';

export type ModalActionType = 'OPEN' | 'CLOSE';

export type ModalAction = { type: ModalActionType };

export interface ModalToggleProps {
  action: ModalAction['type'];
  children: ReactNode;
}

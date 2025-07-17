import { Dispatch } from 'react';

export type ModalActionType = 'OPEN' | 'CLOSE';

export type ModalAction = { type: ModalActionType };

export type ModalState = { isOpen: boolean };

export type ModalDispatch = Dispatch<ModalAction>;

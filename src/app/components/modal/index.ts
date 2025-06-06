import ModalContent from './ModalContent';
import { ModalProvider } from './ModalContext';
import ModalPortal from './ModalPortal';
import ModalToggle from './ModalToggle';

export const Modal = {
  Root: ModalProvider,
  Content: ModalContent,
  Toggle: ModalToggle,
  Portal: ModalPortal,
};

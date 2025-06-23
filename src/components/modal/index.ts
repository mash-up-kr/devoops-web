import ModalContent from '@/components/modal/ModalContent';
import { ModalProvider } from '@/components/modal/ModalContext';
import ModalToggle from '@/components/modal/ModalToggle';
import ModalPortal from '@/components/modal/Portal';

export const Modal = {
  Root: ModalProvider,
  Content: ModalContent,
  Toggle: ModalToggle,
  Portal: ModalPortal,
};

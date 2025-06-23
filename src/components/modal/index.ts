import ModalContent from '@/components/modal/ModalContent';
import { ModalProvider } from '@/components/modal/ModalContext';
import ModalPortal from '@/components/modal/ModalPortal';
import ModalToggle from '@/components/modal/ModalToggle';

export const Modal = {
  Root: ModalProvider,
  Content: ModalContent,
  Toggle: ModalToggle,
  Portal: ModalPortal,
};

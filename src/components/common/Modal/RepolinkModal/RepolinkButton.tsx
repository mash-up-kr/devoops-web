import AddIcon from '@/assets/svg/add.svg';
import CloseIcon from '@/assets/svg/close.svg';
import { Modal } from '@/components/common/Modal';
import { MODAL_ID } from '@/constants/modal';
import { ModalButtonProps } from '@/types/modal';
import { cn } from '@/utils/cn';

const ICON_MAP = {
  OPEN: AddIcon,
  CLOSE: CloseIcon,
} as const;

export default function RepolinkButton({ action, className = '' }: ModalButtonProps) {
  const Icon = ICON_MAP[action];

  return (
    <Modal.Toggle
      action={action}
      modalId={MODAL_ID.REPOLINK}
      className={cn(
        'flex size-12 cursor-pointer items-center justify-center pb-4 transition-all duration-300 hover:brightness-200',
        className,
      )}
    >
      <Icon />
    </Modal.Toggle>
  );
}

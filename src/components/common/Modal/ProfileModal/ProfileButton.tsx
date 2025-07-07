import CloseIcon from '@/assets/svg/close.svg';
import ProfileIcon from '@/assets/svg/profile.svg';
import { Modal } from '@/components/common/Modal';
import { ModalActionType } from '@/types/modal';
import { cn } from '@/utils/cn';

interface ProfileButtonProps {
  action: ModalActionType;
  className?: string;
}

const ICON_MAP = {
  OPEN: ProfileIcon,
  CLOSE: CloseIcon,
} as const;

export default function ProfileButton({ action, className = '' }: ProfileButtonProps) {
  const Icon = ICON_MAP[action];

  return (
    <Modal.Toggle action={action} className={cn('flex size-12 cursor-pointer items-center justify-center', className)}>
      <Icon />
    </Modal.Toggle>
  );
}

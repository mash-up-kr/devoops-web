import PRStatusDoneIcon from '@/assets/svg/pr-status-done.svg';
import PRStatusPendingIcon from '@/assets/svg/pr-status-pending.svg';
import PRStatusProgressIcon from '@/assets/svg/pr-status-progress.svg';
import { cn } from '@/utils/cn';

type PRStatusType = keyof typeof STATUS_MAP;

interface PRStatusProps {
  status: PRStatusType;
}

const STATUS_MAP = {
  PENDING: {
    text: '회고 전',
    color: 'text-dark-grey-500',
    statusIcon: PRStatusPendingIcon,
  },
  PROGRESS: {
    text: '회고 중',
    color: 'text-sub-yellow',
    statusIcon: PRStatusProgressIcon,
  },
  DONE: {
    text: '회고 완료',
    color: 'text-dark-blue-600',
    statusIcon: PRStatusDoneIcon,
  },
} as const;

export default function PRStatus({ status }: PRStatusProps) {
  const { text, color, statusIcon: StatusIcon } = STATUS_MAP[status];
  return (
    <span className={`flex items-center gap-1.5`}>
      <StatusIcon alt={text} />
      <p className={cn('text-caption font-medium', color)}>{text}</p>
    </span>
  );
}

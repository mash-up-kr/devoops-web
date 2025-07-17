import { format } from 'date-fns';

import Tag from '@/components/common/Tag';

interface RetrospectiveHeaderProps {
  title: string;
  tag: string;
  mergedAt: string;
  status: '전' | '중' | '완료';
  pullRequestUrl: string;
}

export default function RetrospectiveHeader({
  title,
  tag,
  mergedAt,
  status,
  pullRequestUrl,
}: RetrospectiveHeaderProps) {
  const formattedMergedAt = mergedAt ? format(new Date(mergedAt), 'MMM dd, yyyy') : '';
  return (
    <header
      className={'border-outline-variant flex flex-col items-start justify-start gap-[6px] border-b-[1px] pb-[36px]'}
    >
      <Tag dotColor={'violet'}>{tag}</Tag>
      <div>
        <h1 className={'text-h1 font-semibold'}>{title}</h1>
        <div className={'text-body-small text-on-surface-low font-regular flex gap-[8px]'}>
          <span>{status === '전' ? '회고 전' : status === '중' ? '회고 중' : '회고 완료'}</span>
          <span>{'·'}</span>
          <span>{`Merged on ${formattedMergedAt}`}</span>
          <span>{'·'}</span>
          <a
            href={pullRequestUrl}
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={'text-primary underline hover:opacity-80'}
          >
            {'PR 보러가기'}
          </a>
        </div>
      </div>
    </header>
  );
}

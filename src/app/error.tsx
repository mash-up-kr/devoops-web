'use client';

import ErrorView from '@/components/common/StatusView/ErrorView';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div>
      <ErrorView error={error} />
    </div>
  );
}

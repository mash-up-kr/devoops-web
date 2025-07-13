'use client';

import { useGetPullRequestQuery } from '@/apis/repositories/repositories.query';
import Preview from '@/components/home/Preview';

interface PRPreviewProps {
  pullRequestId: number;
}

export default function PRPreview({ pullRequestId }: PRPreviewProps) {
  const { data: PRDetailData } = useGetPullRequestQuery({
    variables: {
      pullRequestId,
    },
  });

  return <Preview data={PRDetailData?.data} />;
}

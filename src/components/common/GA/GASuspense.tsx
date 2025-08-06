import { Suspense } from 'react';

import GoogleAnalytics from '@/components/common/GA/GoogleAnalytics';

export default function GASuspense() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
    </Suspense>
  );
}

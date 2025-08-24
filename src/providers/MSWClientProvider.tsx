'use client';

import { useState, useEffect, PropsWithChildren } from 'react';

const isMockingEnabled = process.env.NEXT_PUBLIC_MOCK_API === 'enabled';

export default function MSWProvider({ children }: PropsWithChildren) {
  const [mswReady, setMswReady] = useState(!isMockingEnabled);

  useEffect(() => {
    if (isMockingEnabled) {
      const enableMocking = async () => {
        const { worker } = await import('@/mocks/browser');
        await worker.start();
        setMswReady(true);
      };

      enableMocking();
    }
  }, []);

  return mswReady ? <>{children}</> : null;
}

'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

export default function MswProvider({ children }: PropsWithChildren) {
  const [isMswReady, setIsMswReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const initMsw = async () => {
        const { worker } = await import('@/mocks/browser');

        await worker.start({
          onUnhandledRequest: 'bypass',
        });

        setIsMswReady(true);
      };

      initMsw();
    }
  }, []);

  if (!isMswReady) {
    return null;
  }

  return <>{children}</>;
}

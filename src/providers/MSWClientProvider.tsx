'use client';

import { useEffect } from 'react';

import { initMSW } from '@/mocks';

export default function MSWClientProvider() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MOCK_API === 'enabled') {
      initMSW();
    }
  }, []);

  return null;
}

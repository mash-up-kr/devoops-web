'use client';

import { useEffect } from 'react';

import { initMSW } from '@/mocks';

export default function MSWClientProvider() {
  useEffect(() => {
    initMSW();
  }, []);

  return null;
}

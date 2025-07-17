'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import getQueryClient from '@/providers/getQueryClient';

export default function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

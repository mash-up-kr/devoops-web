'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export const gtagPageView = (url: string) => {
  if (GA_ID === '' || typeof window.gtag !== 'function') {
    return;
  }

  const debugMode = process.env.NODE_ENV !== 'production' ? { debug_mode: true } : {};
  window.gtag('config', GA_ID, {
    page_path: url,
    ...debugMode,
  });
};

export default function GoogleAnalytics() {
  const path = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const url = path + (query ? `?${query}` : '');
    gtagPageView(url);
  }, [path, searchParams]);

  return (
    <>
      {/* 1) gtag.js 라이브러리 로드 */}
      <Script strategy={'afterInteractive'} src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />

      {/* 2) gtag 함수 정의 + consent 기본 설정 + config */}
      <Script id={'gtag-init'} strategy={'afterInteractive'}>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
      </Script>
    </>
  );
}

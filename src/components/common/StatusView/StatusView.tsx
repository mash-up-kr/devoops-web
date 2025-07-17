import Image from 'next/image';
import { ReactNode } from 'react';

import StatusViewImage from '@/assets/images/status-view.webp';

interface StatusViewProps {
  children: ReactNode;
}
export default function StatusView({ children }: StatusViewProps) {
  return (
    <div className={'flex flex-col items-center py-30'}>
      <section className={'flex flex-col items-center'}>
        <Image src={StatusViewImage} alt={'status view image'} width={180} />
        <div className={'flex flex-col items-center gap-4'}>{children}</div>
      </section>
    </div>
  );
}

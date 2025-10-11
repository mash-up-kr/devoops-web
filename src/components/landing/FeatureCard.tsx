import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

import FeatureCardGradient from '@/assets/svg/feature-card-gradient.svg';

interface FeatureCardProps {
  image: StaticImageData;
  children: ReactNode;
}

export default function FeatureCard({ image, children }: FeatureCardProps) {
  return (
    <div
      className={
        'bg-dark-grey-25 relative h-[380px] overflow-hidden rounded-[30px] max-md:h-[300px] max-md:w-full max-md:rounded-[20px]'
      }
    >
      <FeatureCardGradient className={'absolute'} />
      <div className={'flex h-full flex-col justify-between p-6'}>
        <Image src={image} alt={'Landing Symbol 1'} width={100} />
        <div className={'flex flex-col gap-4 font-medium max-md:gap-3'}>{children}</div>
      </div>
    </div>
  );
}

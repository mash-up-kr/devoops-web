import { ReactNode } from 'react';

import GradientBottomLayer from '@/components/landing/Gradient/GradientBottomLayer';
import GradientTopLayer from '@/components/landing/Gradient/GradientTopLayer';

interface GradientContentProps {
  content: ReactNode;
}

export default function GradientWrapper({ content }: GradientContentProps) {
  return (
    <div className={'relative overflow-hidden'}>
      <GradientTopLayer />
      <div className={'max-lg:px-landing-mobile-padding'}>{content}</div>
      <GradientBottomLayer />
    </div>
  );
}

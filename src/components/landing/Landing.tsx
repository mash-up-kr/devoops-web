'use client';

import GradientWrapper from '@/components/landing/Gradient/GradientWrapper';
import FeatureSection from '@/components/landing/Section/FeatureSection';
import FooterCTA from '@/components/landing/Section/FooterCTA';
import HeroSection from '@/components/landing/Section/HeroSection';
import RepolinkSection from '@/components/landing/Section/RepolinkSection';
import StartSection from '@/components/landing/Section/StartSection';
import { useLoginRedirect } from '@/hooks/useLoginRedirect';

function Landing() {
  const { handleLogin } = useLoginRedirect();

  return (
    <main className={'h-screen w-full'}>
      <div className={'flex flex-col gap-12'}>
        <GradientWrapper content={<HeroSection action={handleLogin} />} />
        <GradientWrapper content={<FeatureSection />} />
        <GradientWrapper content={<StartSection />} />
        <GradientWrapper content={<RepolinkSection />} />
        <FooterCTA action={handleLogin} />
      </div>
    </main>
  );
}

export default Landing;

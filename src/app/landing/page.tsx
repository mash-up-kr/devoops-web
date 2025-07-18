import Landing from '@/components/landing/Landing';
import LandingNavigation from '@/components/landing/LandingNavigation';

function LandingPage() {
  return (
    <div>
      <LandingNavigation className={'z-gnb'} />
      <Landing />
    </div>
  );
}

export default LandingPage;

import Image from 'next/image';

import LandingHero from '@/assets/images/landing/landing-hero.webp';
import { LoadingButton } from '@/components/common/LoadingButton';

interface HeroSectionProps {
  action: () => void;
}

export default function HeroSection({ action }: HeroSectionProps) {
  return (
    <section>
      <div className={'mt-[144px] flex flex-col items-center gap-7'}>
        <div>
          <div className={'mb-4.5 flex flex-col items-center text-center'}>
            <h1 className={'blue-tiny-right text-landing-h1 inline-block font-bold'}>{'코드는 남았는데'}</h1>
            <h1 className={'blue-tiny-right text-landing-h1 inline-block font-bold'}>{'고민은 사라졌다면...?'}</h1>
          </div>
          <div className={'text-dark-grey-600 text-landing-content flex flex-col text-center font-medium'}>
            <p>
              {'Devoops가 '}
              <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                {'PR을 요약하고 고민을 되살리는 질문'}
              </span>
              {'을 대신 던져드릴게요.'}
            </p>
            <p>
              <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                {'가볍게 적다 보면 중요한 게 자연'}
              </span>
              {'스럽게 남아요.'}
            </p>
          </div>
        </div>
        <LoadingButton variant={'filledPrimary'} size={'medium'} action={action}>
          {'Devoops 시작하기'}
        </LoadingButton>
      </div>
      <div
        className={
          'border-dark-grey-200 shadow-landing-image mx-auto mt-[67px] max-w-[1000px] overflow-hidden rounded-tl-[28px] rounded-tr-[28px] border-1 max-md:rounded-tl-[20px] max-md:rounded-tr-[20px]'
        }
      >
        <Image src={LandingHero} alt={'Landing Hero'} priority />
      </div>
    </section>
  );
}

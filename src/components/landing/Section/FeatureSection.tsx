import LandingSymbol1 from '@/assets/images/landing/landing-symbol-1.webp';
import LandingSymbol2 from '@/assets/images/landing/landing-symbol-2.webp';
import LandingSymbol3 from '@/assets/images/landing/landing-symbol-3.webp';
import Tag from '@/components/common/Tag';
import FeatureCard from '@/components/landing/FeatureCard';
import GradientBottomLayer from '@/components/landing/GradientBottomLayer';
import GradientTopLayer from '@/components/landing/GradientTopLayer';

export default function FeatureSection() {
  return (
    <section className={'relative overflow-hidden'}>
      <GradientTopLayer />
      <div className={'mt-[80px] flex flex-col items-center'}>
        <div className={'flex flex-col items-center gap-5'}>
          <div className={'flex flex-col items-center gap-4'}>
            <Tag dotColor={'primary'} size={'medium'} padding={'medium'}>
              {'주요 기능'}
            </Tag>
            <div className={'flex flex-col items-center'}>
              <h1 className={'blue-tiny-right inline-block text-[48px] leading-[64px] font-bold'}>
                {'회고, 더는 어렵지 않아요.'}
              </h1>
              <h1 className={'blue-tiny-right inline-block text-[48px] leading-[64px] font-bold'}>
                {'DevOops가 다 챙겨줄게요.'}
              </h1>
            </div>
          </div>
          <div className={'text-body-large text-dark-grey-600 text-center text-[18px] font-medium'}>
            <p>{'레포지토리 연동만 해두면, 요약도 질문도 DevOops가 알아서 챙겨줘요. '}</p>
          </div>
        </div>
      </div>
      <div className={'mt-[38px] mb-[72px] flex flex-col items-center'}>
        <div className={'flex items-center gap-3'}>
          <FeatureCard image={LandingSymbol1}>
            <h3 className={'text-h3'}>{'레포지토리 연동'}</h3>
            <div>
              <p className={'text-h5'}>
                <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                  {'GitHub PR을 자동으로 가져'}
                </span>
                {'와요.'}
              </p>
              <p>{'회고할 작업을 한눈에 확인할 수 있어요.'}</p>
            </div>
          </FeatureCard>
          <FeatureCard image={LandingSymbol2}>
            <h3 className={'text-h3'}>{'회고를 돕는 AI'}</h3>
            <div>
              <p className={'text-h5'}>
                <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                  {'PR 내용을 요약'}
                </span>
                {'해주고,'}
              </p>
              <p className={'text-h5'}>
                <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                  {'AI가 고민을 꺼내줄 질문'}
                </span>
                {'도 던져줘요.'}
              </p>
            </div>
          </FeatureCard>
          <FeatureCard image={LandingSymbol3}>
            <h3 className={'text-h3'}>{'질문만 답해서 완료!'}</h3>
            <div>
              <p className={'text-h5'}>{'부담 없이 한 줄씩 적다 보면'}</p>
              <p className={'text-h5'}>
                <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                  {'중요한 맥락이 자연스럽게 기록'}
                </span>
                {'돼요.'}
              </p>
            </div>
          </FeatureCard>
        </div>
      </div>
      <GradientBottomLayer />
    </section>
  );
}

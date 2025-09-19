import Image from 'next/image';

import LandingPRSummary from '@/assets/images/landing/landing-pr-summary.webp';
import LandingRetrospectiveAnswer from '@/assets/images/landing/landing-retrospective-answer.webp';
import LandingRetrospectiveQuestion from '@/assets/images/landing/landing-retrospective-question.webp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import Tag from '@/components/common/Tag';

export default function StartSection() {
  return (
    <section>
      <div>
        <div className={'mt-[80px] mb-12 flex flex-col items-center gap-4'}>
          <Tag dotColor={'primary'} size={'medium'} padding={'medium'}>
            {'AI를 통한 간편한 회고'}
          </Tag>
          <h1 className={'blue-tiny-right inline-block text-[48px] leading-[58px] font-bold'}>
            {'Devoops로 회고를 시작해볼까요?'}
          </h1>
        </div>
        <div>
          <Tabs defaultValue={'PR 요약'}>
            <div className={'flex items-center justify-center'}>
              <TabsList>
                <TabsTrigger value={'PR 요약'}>{'PR 요약'}</TabsTrigger>
                <TabsTrigger value={'회고 질문 제공'}>{'회고 질문 제공'}</TabsTrigger>
                <TabsTrigger value={'회고 답변'}>{'회고 답변'}</TabsTrigger>
              </TabsList>
            </div>
            <div>
              <TabsContent
                value={'PR 요약'}
                aria-label={'PR summary'}
                className={'flex flex-col items-center gap-[30px] pt-[36px]'}
              >
                <div className={'text-body-large text-dark-grey-600 flex flex-col text-center font-medium'}>
                  <p>
                    <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                      {'코드, 커밋 메시지, 피드백 내용'}
                    </span>
                    {'까지 쏙쏙 뽑아서'}
                  </p>
                  <p>{'PR에서 중요한 것만 요약해드려요.'}</p>
                </div>
                <div
                  className={
                    'border-dark-grey-200 max-w-[1000px] overflow-hidden rounded-tl-[36px] rounded-tr-[36px] border-1 px-[100px] pt-[58px]'
                  }
                >
                  <Image src={LandingPRSummary} alt={'PR 요약'} />
                </div>
              </TabsContent>
              <TabsContent
                value={'회고 질문 제공'}
                aria-label={'Retrospective question'}
                className={'flex flex-col items-center gap-[30px] pt-[36px] pb-[48px]'}
              >
                <div className={'text-body-large text-dark-grey-600 flex flex-col text-center font-medium'}>
                  <p>
                    <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                      {'“이렇게 구현한 이유, 지금도 설명'}
                    </span>
                    {'할 수 있나요?”'}
                  </p>
                  <p>
                    <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                      {'AI가 작업의 맥락을 자연'}
                    </span>
                    {'스럽게 떠올리게 도와줘요.'}
                  </p>
                </div>
                <div
                  className={
                    'border-dark-grey-200 max-w-[1000px] overflow-hidden rounded-tl-[36px] rounded-tr-[36px] border-1 px-[100px] pt-[58px]'
                  }
                >
                  <Image src={LandingRetrospectiveQuestion} alt={'회고 질문 제공'} />
                </div>
              </TabsContent>
              <TabsContent
                value={'회고 답변'}
                aria-label={'Retrospective answer'}
                className={'flex flex-col items-center gap-[30px] pt-[36px] pb-[48px]'}
              >
                <div className={'text-body-large text-dark-grey-600 flex flex-col text-center font-medium'}>
                  <p>
                    <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                      {'원하는 질문'}
                    </span>
                    {'만 선택해서 답해보세요'}
                  </p>
                  <p>
                    <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                      {'가볍게 시작해도 성장의 기록'}
                    </span>
                    {'은 자연스럽게 쌓여요.'}
                  </p>
                </div>
                <div
                  className={
                    'border-dark-grey-200 max-w-[1000px] overflow-hidden rounded-tl-[36px] rounded-tr-[36px] border-1 px-[100px] pt-[58px]'
                  }
                >
                  <Image src={LandingRetrospectiveAnswer} alt={'회고 답변'} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

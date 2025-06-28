import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';

import Button from '@/components/common/Button';
import SectionHeader from '@/components/retrospective/SectionHeader';

const DUMMY_QUESTIONS = [
  {
    category: 'Redis 활용 전략',
    questions: [
      { questionId: 1, question: 'Redis를 도입하게 된 주요 목적은 무엇이었나요?' },
      { questionId: 2, question: 'Redis를 사용할 때 고려한 성능 이슈가 있었나요?' },
    ],
  },
  {
    category: 'CI/CD 및 배포',
    questions: [
      { questionId: 3, question: 'GitHub Actions에 Redis를 추가할 때 겪은 어려움은 무엇이었나요?' },
      { questionId: 4, question: 'CI/CD 파이프라인에서 Redis를 효과적으로 관리하는 방법은 무엇인가요?' },
    ],
  },
  {
    category: 'Spring & Redis 연동',
    questions: [
      { questionId: 5, question: 'Spring에서 RedisTemplate을 사용할 때 주의할 점은 무엇인가요?' },
      { questionId: 6, question: 'RedisMessageListenerContainer를 도입한 이유와 장점은 무엇인가요?' },
    ],
  },
  {
    category: '이벤트 기반 아키텍처',
    questions: [
      { questionId: 7, question: '만료 이벤트 리스너를 구현하면서 얻은 인사이트가 있다면?' },
      { questionId: 8, question: '향후 이벤트 전파 구조를 개선할 계획이 있나요?' },
    ],
  },
];

export default function RetrospectiveQuestions() {
  return (
    <section className={'flex flex-col gap-[20px]'}>
      <SectionHeader
        title={'AI 생성 회고 질문'}
        description={'이번 작업에서 회고하고 싶은 질문을 골라보세요.'}
        icon={<span>{'회고 아이콘'}</span>}
      />

      <Tabs defaultValue={DUMMY_QUESTIONS[0].category}>
        <TabsList>
          {DUMMY_QUESTIONS.map(({ category }, index) => (
            <TabsTrigger value={category} key={index}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {DUMMY_QUESTIONS.map(({ category, questions }, index) => (
          <TabsContent value={category} className={'flex flex-col items-end gap-[20px] pt-[20px]'} key={index}>
            <ul className={'flex w-full flex-col gap-[12px]'}>
              {questions.map(({ questionId, question }) => (
                <div
                  className={
                    'bg-dark-grey-50 bg-dark-grey border-outline flex w-full gap-[28px] rounded-[6px] border-[1px] py-[16px] pr-[12px] pl-[24px]'
                  }
                  key={questionId}
                >
                  <p className={'grow-1'}>{question}</p>
                  {/* TODO: 병합 후 addIcon */}
                  <span>{'+'}</span>
                </div>
              ))}
            </ul>

            <Button size={'tiny'} variant={'outlineGrey'}>
              {'질문 생성하기'}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

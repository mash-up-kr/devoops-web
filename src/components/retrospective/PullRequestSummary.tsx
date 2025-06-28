import SectionHeader from '@/components/retrospective/SectionHeader';

const DUMMY_SUMMARY = [
  {
    title: 'Redis 사용 설정',
    content: ['GitHub Actions에 Redis 실행 단계 추가'],
  },
  {
    title: 'RedisTemplate 설정 추가',
    content: ['Redis에 문자열 기반으로 데이터를 저장/조회할 수 있게 설정'],
  },
  {
    title: 'Redis 키 만료 이벤트 리스너 설정',
    content: ['"__keyevent@0__:expired" 채널 구독하도록 설정', 'Spring Redis의 RedisMessageListenerContainer 사용'],
  },
  {
    title: '만료 이벤트 처리 리스너 구현',
    content: [
      'Redis에서 특정 키가 만료되면 메시지 수신',
      '이벤트 종류(EVENT_OPEN, VOTE_OPEN)에 따라 다음 상태로 전이할 준비 (TODO로 처리 예정)',
      '향후 Spring 이벤트로 전파 예정 (의존성 분리 목적)',
    ],
  },
];

export default function PullRequestSummary() {
  return (
    <section className={'flex flex-col gap-[20px] pt-[36px]'}>
      <SectionHeader
        title={'AI 요약'}
        description={'이번 PR에서 작업한 내용이에요.'}
        icon={<span>{'요약 아이콘'}</span>}
      />

      <div className={'bg-dark-grey-50 align-start flex flex-col justify-start gap-[20px] rounded-[8px] p-[24px]'}>
        {DUMMY_SUMMARY.map((summary) => (
          <div className={'flex flex-col gap-[4px]'} key={summary.title}>
            <span className={'text-body-medium font-semibold'}>{summary.title}</span>
            <ul className={'flex flex-col gap-[4px]'}>
              {summary.content.map((content, index) => (
                <li className={'text-body-small font-regular text-on-surface-lowest'} key={index}>
                  {content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

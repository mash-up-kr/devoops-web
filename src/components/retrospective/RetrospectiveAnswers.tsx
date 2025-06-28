import SectionHeader from './SectionHeader';

export default function RetrospectiveAnswers() {
  return (
    <section className={'flex flex-col gap-[20px]'}>
      <SectionHeader
        title={'PR 회고'}
        description={'선택한 질문을 바탕으로 이번 작업을 회고해보세요.'}
        icon={<span>{'펜 아이콘'}</span>}
      />

      <div
        className={
          'border-outline flex items-center justify-start gap-[8px] rounded-[8px] border-[1px] px-[24px] py-[16px]'
        }
      >
        <span>{'경고 아이콘'}</span>
        <span>{'아직 질문을 고르지 않았어요.'}</span>
      </div>
    </section>
  );
}

import SectionHeader from '@/components/retrospective/SectionHeader';

interface Question {
  questionId: number;
  content: string;
  answer: string | null;
}

interface RetrospectiveAnswersProps {
  answers: Question[];
}

export default function RetrospectiveAnswers({ answers }: RetrospectiveAnswersProps) {
  const hasAnswers = answers.length > 0;

  return (
    <section className={'flex flex-col gap-[20px]'}>
      <SectionHeader
        title={'PR 회고'}
        description={'선택한 질문을 바탕으로 이번 작업을 회고해보세요.'}
        icon={<span>{'펜 아이콘'}</span>}
      />

      {!hasAnswers ? (
        <div
          className={
            'border-outline flex items-center justify-start gap-[8px] rounded-[8px] border-[1px] px-[24px] py-[16px]'
          }
        >
          <span>{'경고 아이콘'}</span>
          <span>{'아직 질문을 고르지 않았어요.'}</span>
        </div>
      ) : (
        <ul className={'flex flex-col gap-[20px]'}>
          {answers.map((answer) => (
            <li
              key={answer.questionId}
              className={'bg-dark-grey-50 flex flex-col gap-[8px] rounded-[8px] px-[24px] py-[20px]'}
            >
              <p className={'text-body-medium font-semibold'}>{answer.content}</p>
              <p className={'text-body-small text-on-surface-lowest'}>{answer.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

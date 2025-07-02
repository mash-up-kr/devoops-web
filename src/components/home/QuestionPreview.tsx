import QuestionTabs from './QuestionTabs/QuestionTabs';

export default function QuestionPreview() {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'text-body-small text-dark-grey-500 font-medium'}>{'질문 미리보기'}</div>
      <QuestionTabs />
    </div>
  );
}

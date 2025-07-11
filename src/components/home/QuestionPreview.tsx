import { PullRequestReadResponseType } from '@/__generated__/@types';
import { QuestionTabs } from '@/components/home/QuestionTabs';

interface QuestionPreviewProps {
  contents: PullRequestReadResponseType;
}

export default function QuestionPreview({ contents }: QuestionPreviewProps) {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'text-body-small text-dark-grey-500 font-medium'}>{'질문 미리보기'}</div>
      <QuestionTabs contents={contents} />
    </div>
  );
}

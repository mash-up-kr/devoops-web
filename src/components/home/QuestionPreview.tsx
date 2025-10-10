import { PullRequestReadResponseType } from '@/__generated__/@types';
import { QuestionTabs } from '@/components/home/QuestionTabs';

interface QuestionPreviewProps {
  contents: PullRequestReadResponseType;
  activeCategoryIndex: number;
  activeCategoryIndexesAction: (index: number) => void;
}

export default function QuestionPreview({
  contents,
  activeCategoryIndex,
  activeCategoryIndexesAction,
}: QuestionPreviewProps) {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'text-body-small text-dark-grey-500 font-medium'}>{'질문 미리보기'}</div>
      <QuestionTabs
        contents={contents}
        activeCategoryIndex={activeCategoryIndex}
        activeCategoryIndexesAction={activeCategoryIndexesAction}
      />
    </div>
  );
}

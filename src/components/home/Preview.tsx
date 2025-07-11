import { PullRequestReadResponseType } from '@/__generated__/@types';
import AISummary from '@/components/home/AISummary';
import QuestionPreview from '@/components/home/QuestionPreview';

interface PreviewProps {
  data?: PullRequestReadResponseType;
}

export default function Preview({ data }: PreviewProps) {
  if (!data) {
    return (
      <div className={'text-dark-grey-500 mx-8 my-5 flex max-w-[438px] flex-col items-center justify-center pt-5'}>
        <h5 className={'text-h5 mb-[23px] font-medium'}>{'미리보기'}</h5>
        <p>{'미리 볼 PR 항목에 마우스를 올려주세요.'}</p>
      </div>
    );
  }

  return (
    <div className={'mx-8 my-5 flex max-w-[438px] flex-col pt-5'}>
      <h5 className={'text-h5 mb-[23px] font-medium'}>{'미리보기'}</h5>
      <div className={'border-dark-grey-100 border-b pb-7'}>
        <AISummary contents={data.summary} />
      </div>
      <div className={'pt-7'}>
        <QuestionPreview contents={data} />
      </div>
    </div>
  );
}

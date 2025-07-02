import AISummary from '@/components/home/AISummary';
import QuestionPreview from '@/components/home/QuestionPreview';

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  return (
    <div className={'mx-8 my-5 flex h-10 max-w-[438px] flex-col pt-5'}>
      <h5 className={'text-h5 mb-[23px] font-medium'}>{'미리보기'}</h5>
      <div className={'border-dark-grey-100 border-b-1 pb-7'}>
        <AISummary content={content} />
      </div>
      <div className={'pt-7'}>
        <QuestionPreview />
      </div>
    </div>
  );
}

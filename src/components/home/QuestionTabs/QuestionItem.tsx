import { QuestionBriefResponseType } from '@/__generated__/@types';
import { cn } from '@/utils/cn';

interface QuestionItemProps extends QuestionBriefResponseType {
  isOpen: boolean;
  onToggle: () => void;
}

const CONTENT_TRUNCATE_THRESHOLD = 85;

export default function QuestionItem({ category, content = '', isOpen, onToggle }: QuestionItemProps) {
  const isContentLong = content.length > CONTENT_TRUNCATE_THRESHOLD;

  return (
    <div
      className={cn(
        'bg-dark-grey-25 relative flex flex-col gap-2 rounded-xl p-5 transition-all duration-500',
        isContentLong && (isOpen ? 'max-h-[500px]' : 'max-h-35.5 overflow-hidden'),
      )}
    >
      <div className={'text-body-small text-dark-blue-700 font-semibold'}>{category}</div>
      <h5 className={cn('text-body-medium text-dark-grey-800 font-medium break-all', isContentLong && 'pb-6')}>
        {content}
      </h5>
      {isContentLong && (
        <div className={'absolute right-0 bottom-0 left-0'}>
          {!isOpen && (
            <div className={'absolute bottom-0 h-12 w-full [background:var(--color-gradient-question-item-button)]'} />
          )}
          <div className={'relative'}>
            <button
              className={
                'text-body-small text-dark-grey-500 w-full cursor-pointer border-none py-2 font-medium outline-none hover:text-dark-grey-700'
              }
              onClick={onToggle}
            >
              {isOpen ? '접기' : '더보기'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

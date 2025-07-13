import RightIcon from '@/assets/svg/chevron-right.svg';
import Button from '@/components/common/Button';

export default function PreviewSkeleton() {
  return (
    <div className={'mx-8 my-5 flex animate-pulse flex-col pt-5 md:w-[300px] xl:w-[438px]'}>
      <h5 className={'text-h5 mb-[23px] font-medium'}>{'미리보기'}</h5>
      <div className={'border-dark-grey-100 border-b pb-7'}>
        <div className={'flex flex-col gap-2'}>
          <div className={'text-body-small text-dark-grey-500 font-medium'}>{'AI 요약'}</div>
          <div
            className={`text-body-medium font-regular
          text-dark-grey-700 flex flex-col gap-1
        `}
          >
            <div className={'bg-dark-grey-50 h-3 rounded-md'} />
            <div className={'bg-dark-grey-50 h-3 rounded-md'} />
          </div>
        </div>
      </div>
      <div className={'pt-6'}>
        <div className={'flex flex-col gap-2'}>
          <div className={'text-body-small text-dark-grey-500 font-medium'}>{'질문 미리보기'}</div>
          <div className={'mb-6 flex w-full items-center gap-2'}>
            <div className={'w-full overflow-hidden transition-transform duration-300 ease-out'}>
              <div className={'flex gap-2 transition-transform duration-300 ease-out'}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    type={'button'}
                    className={`
                      bg-dark-grey-50 text-dark-blue-700 h-[34px] w-[74px] flex-shrink-0
                      rounded-full text-sm font-medium
                      whitespace-nowrap transition-colors select-none
                    `}
                  >
                    {}
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant={'outlineGrey'}
              size={'small'}
              className={`
              rounded-full border-1 p-2
            `}
            >
              <RightIcon />
            </Button>
          </div>
          <div className={'space-y-3'}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={`bg-dark-grey-50 flex flex-col gap-2 rounded-xl p-5`}>
                <div className={'text-body-small bg-dark-blue-700 h-2 w-20 rounded-md font-semibold'} />
                <div className={'text-h5 bg-dark-grey-300 h-4 w-full rounded-md font-medium'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

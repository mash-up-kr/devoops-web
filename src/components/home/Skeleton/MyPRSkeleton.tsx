import PreviewSkeleton from '@/components/home/Skeleton/PreviewSkeleton';
import PRListSkeleton from '@/components/home/Skeleton/PRListSkeleton';

function MyPRSkeleton() {
  return (
    <div>
      <h1 className={'text-h1 blue-tiny-left inline-block pt-2.5 pb-6 font-semibold'}>{'내 PR'}</h1>

      <div className={'animate-pulse'}>
        <div>
          <div className={'inset-shadow-tabs-list flex w-full gap-2 pb-2'}>
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                type={'button'}
                className={`
                  bg-dark-grey-50 text-dark-blue-700 h-[32px] w-[74px] flex-shrink-0
                  rounded-full text-sm font-medium whitespace-nowrap transition-colors select-none
                `}
              >
                {}
              </button>
            ))}
          </div>

          <div className={'flex'}>
            <div className={'border-dark-grey-100 flex flex-1 flex-col gap-5 border-e-1 py-4 pe-8'}>
              <PRListSkeleton />
            </div>
            <PreviewSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPRSkeleton;

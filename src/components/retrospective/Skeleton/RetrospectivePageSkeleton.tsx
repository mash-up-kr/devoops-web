import { cn } from '@/utils/cn';

export default function RetrospectivePageSkeleton() {
  return (
    <div className={'animate-pulse'}>
      {/* Header Skeleton */}
      <div className={'mb-8'}>
        <div className={'bg-dark-grey-700 mb-4 h-8 w-3/4 rounded-lg'} />
        <div className={'flex items-center gap-2'}>
          <div className={'bg-dark-grey-700 h-6 w-20 rounded-full'} />
          <div className={'bg-dark-grey-700 h-6 w-32 rounded-lg'} />
        </div>
      </div>

      {/* Summary Skeleton */}
      <div className={'mb-16'}>
        <div className={'bg-dark-grey-700 mb-4 h-7 w-40 rounded-lg'} />
        <div className={'space-y-3'}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn('bg-dark-grey-700 h-5 rounded-lg', {
                'w-3/4': i === 1,
                'w-2/3': i === 2,
                'w-1/2': i === 3,
              })}
            />
          ))}
        </div>
      </div>

      {/* Questions Skeleton */}
      <div className={'mb-16'}>
        <div className={'bg-dark-grey-700 mb-6 h-7 w-48 rounded-lg'} />
        <div className={'grid grid-cols-1 gap-4 md:grid-cols-2'}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={'rounded-lg border p-4'}>
              <div className={'bg-dark-grey-700 mb-3 h-6 w-32 rounded-lg'} />
              <div className={'space-y-2'}>
                {[1, 2].map((j) => (
                  <div key={j} className={'bg-dark-grey-700 h-4 w-full rounded-lg'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answers Skeleton */}
      <div>
        <div className={'bg-dark-grey-700 mb-6 h-7 w-40 rounded-lg'} />
        <div className={'space-y-6'}>
          {[1, 2].map((i) => (
            <div key={i} className={'rounded-lg border p-6'}>
              <div className={'bg-dark-grey-700 mb-4 h-5 w-full rounded-lg'} />
              <div className={'bg-dark-grey-700 h-24 rounded-lg'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

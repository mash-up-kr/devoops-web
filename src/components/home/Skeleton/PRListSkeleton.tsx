export default function PRListSkeleton() {
  return (
    <div className={'animate-pulse space-y-3'}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={`bg-dark-grey-50 flex flex-col gap-5 rounded-xl px-2.5 py-4`}>
          <div className={'text-body-small bg-dark-blue-700 h-4 w-20 rounded-md font-semibold'} />
          <div className={'flex justify-between'}>
            <div className={'text-h5 bg-dark-grey-300 h-8 w-3/5 rounded-md font-medium'} />
            <span
              className={'text-body-small bg-dark-grey-300 border-dark-grey-100 h-6 w-[80px] rounded-full border-1'}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

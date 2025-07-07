interface AISummaryProps {
  content: string;
}

export default function AISummary({ content }: AISummaryProps) {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'text-body-small text-dark-grey-500 font-medium'}>{'AI 요약'}</div>
      <div
        className={`
          text-body-medium font-regular text-dark-grey-700
        `}
      >
        {content}
      </div>
    </div>
  );
}

import SearchIcon from '@/components/common/icons/SearchIcon';
import SectionHeader from '@/components/retrospective/SectionHeader';
import type { PullRequestSummaryProps } from '@/types/retrospective';

export default function PullRequestSummary({ summary }: PullRequestSummaryProps) {
  return (
    <section className={'flex flex-col gap-[20px] pt-[36px]'}>
      <SectionHeader title={'AI 요약'} description={'이번 PR에서 작업한 내용이에요.'} icon={<SearchIcon />} />
      <div className={'bg-dark-grey-50 align-start flex flex-col justify-start gap-[20px] rounded-[8px] p-[24px]'}>
        {summary.map((summaryItem) => (
          <div className={'flex flex-col gap-[4px]'} key={summaryItem.title}>
            <span className={'text-body-medium font-semibold'}>{summaryItem.title}</span>
            <ul className={'flex flex-col gap-[4px]'}>
              {summaryItem.content.map((content, index) => (
                <li className={'text-body-small font-regular text-on-surface-lowest'} key={index}>
                  {content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

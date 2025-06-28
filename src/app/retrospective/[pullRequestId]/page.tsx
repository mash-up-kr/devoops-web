import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';

export default function RetrospectivePage() {
  return (
    <>
      <RetrospectiveHeader />
      <main className={'flex flex-col gap-[68px]'}>
        <PullRequestSummary />
        <RetrospectiveQuestions />
      </main>
    </>
  );
}

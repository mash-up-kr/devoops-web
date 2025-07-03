import { fetchMockPullRequestById as fetchPullRequestById } from '@/apis/retrospective.mock';
import FixedFooter from '@/components/retrospective/FixedFooter';
import PullRequestSummary from '@/components/retrospective/PullRequestSummary';
import RetrospectiveAnswers from '@/components/retrospective/RetrospectiveAnswers';
import RetrospectiveHeader from '@/components/retrospective/RetrospectiveHeader';
import RetrospectiveQuestions from '@/components/retrospective/RetrospectiveQuestions';
// import { fetchPullRequestById } from '@/apis/retrospective';
import type { CategoryWithQuestions } from '@/types/retrospective';

interface RetrospectivePageProps {
  params: {
    pullRequestId: string;
  };
}

export default async function RetrospectivePage({ params }: RetrospectivePageProps) {
  const { pullRequestId } = params;
  console.log('현재 PR ID:', params.pullRequestId);
  // const accessToken = 'YOUR_ACCESS_TOKEN';

  const data = await fetchPullRequestById(pullRequestId);
  // const data = await fetchPullRequestById(pullRequestId, accessToken);

  const formattedSummary = [
    {
      title: 'AI 회고 요약',
      content: data.summary.split('\n').filter((line) => line.trim() !== ''),
    },
  ];

  const groupedQuestions: CategoryWithQuestions[] = data.questions.reduce<CategoryWithQuestions[]>((acc, question) => {
    const existing = acc.find((item) => item.category === question.category);

    const mappedQuestion = {
      questionId: question.questionId,
      question: question.content,
    };

    if (existing) {
      existing.questions.push(mappedQuestion);
    } else {
      acc.push({
        category: question.category,
        questions: [mappedQuestion],
      });
    }

    return acc;
  }, []);

  return (
    <>
      <RetrospectiveHeader title={data.title} tag={data.tag} mergedAt={data.mergedAt} />

      <main className={'flex flex-col gap-[68px]'}>
        <PullRequestSummary summary={formattedSummary} />
        <RetrospectiveQuestions questions={groupedQuestions} />
        <RetrospectiveAnswers answers={data.questions.filter((q) => q.isSelected)} />
      </main>

      <FixedFooter />
    </>
  );
}

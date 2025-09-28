import { CloseAllModal } from '@/components/common/Modal/CloseAllModal';
import { MyPR } from '@/components/home/MyPR';

interface HomeProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return (
    <div className={'mx-auto max-w-[1200px] px-[40px]'}>
      <MyPR searchParams={params} />
      <CloseAllModal />
    </div>
  );
}

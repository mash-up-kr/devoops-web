import { CloseAllModal } from '@/components/common/Modal/CloseAllModal';
import { MyPR } from '@/components/home/MyPR';

export default function Home() {
  return (
    <div className={'mx-auto max-w-[1200px] px-[40px]'}>
      <MyPR />
      <CloseAllModal />
    </div>
  );
}

import Link from 'next/link';

import { ProfileModal, ProfileButton } from '@/components/common/Modal/ProfileModal';

export default function GlobalNavigation() {
  return (
    <>
      <nav
        className={`
        fixed top-[0px] left-[50%] flex w-full max-w-[1200px] -translate-x-1/2
        items-center justify-between px-[40px]
      `}
      >
        <Link href={'/'} className={'text-h4 font-bold'}>
          {'Devoops'}
        </Link>
        <div className={'flex items-center gap-[16px]'}>
          <ProfileButton action={'OPEN'} />
        </div>
      </nav>
      <ProfileModal />
    </>
  );
}

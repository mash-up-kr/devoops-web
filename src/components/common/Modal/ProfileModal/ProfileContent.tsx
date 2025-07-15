'use client';

import Image from 'next/image';

import { useGetMyInfoQuery } from '@/apis/user/user.query';
import Avatar from '@/assets/images/avatar.png';
import RepositoryBadge from '@/components/common/RepositoryBadge';

export default function ProfileContent() {
  const { data: userData } = useGetMyInfoQuery({});
  const { nickname, profileImageUrl } = userData?.data || {};

  const handleLogout = () => {
    // TODO: 로그아웃 기능 구현
  };

  return (
    <div className={'flex w-[296px] flex-col'}>
      <div className={'flex w-full flex-col items-center gap-3'}>
        <div className={'flex size-25 items-center justify-center overflow-hidden rounded-full'}>
          <Image src={profileImageUrl || Avatar} alt={'프로필 아바타 이미지'} width={100} height={100} />
        </div>
        <div className={'border-outline-variant flex w-full flex-col items-center gap-4 border-b pb-4'}>
          <h4 className={'text-h4 font-semibold'}>{nickname}</h4>
          <RepositoryBadge as={'button'} label={'레포지토리 관리'} count={3} />
        </div>
      </div>

      <div>
        <button
          type={'button'}
          className={
            'text-body-large text-dark-grey-800 w-full cursor-pointer p-3 text-start font-medium hover:text-dark-grey-600'
          }
          onClick={handleLogout}
        >
          {'로그아웃'}
        </button>
      </div>
    </div>
  );
}

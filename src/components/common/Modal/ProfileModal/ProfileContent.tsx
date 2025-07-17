'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { apiApi } from '@/__generated__/Api/Api.api';
import { deleteTokenAction, getTokenAction } from '@/actions/token.action';
import { useRepositoriesMeQuery } from '@/apis/repositories/repositories.query';
import { useGetMyInfoQuery } from '@/apis/user/user.query';
import Avatar from '@/assets/images/avatar.webp';
import RepositoryBadge from '@/components/common/RepositoryBadge';

export default function ProfileContent() {
  const router = useRouter();

  const { data: userData } = useGetMyInfoQuery({});
  const { nickname, profileImageUrl } = userData?.data || {};

  const { data: userRepositoriesData } = useRepositoriesMeQuery({});
  const repoCount = userRepositoriesData?.data.repositories?.length || 0;

  const handleLogout = async () => {
    const tokenObj = await getTokenAction();
    const accessToken = tokenObj?.accessToken || '';
    const refreshToken = tokenObj?.refreshToken || '';

    try {
      await apiApi.logoutV1({
        data: {
          accessToken,
          refreshToken,
        },
      });
    } finally {
      await deleteTokenAction();
    }

    return router.push('/landing');
  };

  return (
    <div className={'flex w-[296px] flex-col'}>
      <div className={'flex w-full flex-col items-center gap-3'}>
        <div className={'flex size-25 items-center justify-center overflow-hidden rounded-full'}>
          <Image src={profileImageUrl || Avatar} alt={'프로필 아바타 이미지'} width={100} height={100} />
        </div>
        <div className={'border-outline-variant flex w-full flex-col items-center gap-4 border-b pb-4'}>
          <h4 className={'text-h4 font-semibold'}>{nickname}</h4>
          <Link href={'/repolink'}>
            <RepositoryBadge
              as={'button'}
              label={'레포지토리 관리'}
              count={repoCount}
              className={`hover:text-dark-grey-600`}
            />
          </Link>
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

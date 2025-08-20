/* eslint-disable no-alert */
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, ReactNode } from 'react';

import { useDeleteRepositoryMutation, useSaveRepositoryMutation } from '@/apis/repositories/repositories.mutate';
import { REPOSITORIES_API_QUERY_KEY, useRepositoriesMeQuery } from '@/apis/repositories/repositories.query';
import { useGetMyInfoQuery } from '@/apis/user/user.query';
import Avatar from '@/assets/images/avatar.webp';
import MonoXIcon from '@/assets/svg/mono_x.svg';
import RepoEmpty from '@/assets/svg/repo-empty.svg';
import Button from '@/components/common/Button';
import { Modal as ModalComponent } from '@/components/common/Modal';
import { RepolinkButton } from '@/components/common/Modal/RepolinkModal/index';
import { MODAL_ID } from '@/constants/modal';
import { cn } from '@/utils/cn';

interface RepolinkModalProps {
  defaultOpen: boolean;
  isOutsideClickClose: boolean;
  button?: ReactNode;
}

function RepolinkModal({ defaultOpen = false, isOutsideClickClose = false, button }: RepolinkModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleStart = () => {
    router.replace('/');
  };

  const [input, setInput] = useState('');

  const { data: userData, isLoading: isUserLoading } = useGetMyInfoQuery({});
  const { data: repositoriesData, isLoading: isRepositoriesLoading } = useRepositoriesMeQuery({});
  const { mutate } = useSaveRepositoryMutation({
    options: {
      onSuccess: () => {
        setInput('');
        queryClient.invalidateQueries({ queryKey: REPOSITORIES_API_QUERY_KEY.GET_REPOSITORIES_ME() });
      },
      onError: (error) => {
        if (error.code === 'MALFORMED_GITHUB_REPOSITORY_URL') {
          return alert('잘못된 형식의 레포지토리 url입니다');
        }
        return alert('레포지토리 추가에 실패했습니다.');
      },
    },
  });

  const { mutate: deleteRepositoryMutate } = useDeleteRepositoryMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: REPOSITORIES_API_QUERY_KEY.GET_REPOSITORIES_ME() });
      },
    },
  });

  const { nickname, profileImageUrl } = userData?.data || {};

  const repositories = (() => {
    // eslint-disable-next-line no-underscore-dangle
    const _repositories = repositoriesData?.data?.repositories;
    if (!_repositories?.length) return [];
    return [..._repositories].sort((a, b) => Number(Boolean(b.isTracking)) - Number(Boolean(a.isTracking)));
  })();

  const saveRepository = () => {
    if (repositories.length === 5) return;
    mutate({ data: { url: input } });
  };

  const deleteRepository = (repositoryId?: number) => {
    if (repositoryId) {
      deleteRepositoryMutate({ repositoryId });
    }
  };

  return (
    <ModalComponent.Root
      modalId={MODAL_ID.REPOLINK}
      defaultOpen={defaultOpen}
      isOutsideClickClose={isOutsideClickClose}
      className={'bg-modal-dimmed'}
    >
      <ModalComponent.Content>
        <ModalComponent.RepoLinkContainer>
          {isOutsideClickClose && <RepolinkButton action={'CLOSE'} className={'absolute top-20 right-12'} />}
          <div
            className={
              'border-dark-grey-200 bg-modal flex flex-col items-center rounded-[12px] border-[1px] px-[32px] pt-[52px] pb-[28px]'
            }
          >
            <section
              className={
                'border-dark-grey-200 flex w-fit items-center justify-center gap-[6px] rounded-full border-[1px] px-[10px] py-[6px]'
              }
            >
              {isUserLoading ? (
                <UserProfileSkeleton />
              ) : (
                <>
                  <Image
                    src={profileImageUrl || Avatar}
                    alt={'프로필 아바타 이미지'}
                    width={16}
                    height={16}
                    className={'rounded-full'}
                  />
                  <p className={'text-body-small'}>{nickname}</p>
                </>
              )}
            </section>

            <section className={'flex w-[380px] flex-col items-center justify-center gap-[8px]'}>
              <h3 className={'text-h3 pt-4.5'}>{'회고할 레포지토리를 추가해 주세요!'}</h3>
              <p className={'text-body-small text-dark-grey-600'}>{'레포지토리는 5개까지 추가할 수 있어요'}</p>
            </section>

            <form className={'mt-[40px] flex w-full flex-col'}>
              <p className={'text-caption text-dark-grey-800 mb-[8px]'}>{'레포지토리 주소'}</p>
              <div className={'flex w-full justify-between'}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={
                    'text-body-medium text-dark-grey-900 border-dark-grey-200 h-[48px] w-[300px] rounded-[8px] border-[1px] px-[14px] py-[12px] placeholder:text-dark-grey-900'
                  }
                  type={'text'}
                  placeholder={'레포지토리 주소를 입력해 주세요'}
                />
                <Button type={'button'} variant={'weakPrimary'} size={'medium'} onClick={saveRepository}>
                  {'추가'}
                </Button>
              </div>
            </form>

            <div
              className={
                'border-dark-grey-25 custom-scrollbar mt-[24px] flex h-[188px] w-full flex-col overflow-y-scroll rounded-[8px] border-[1px] px-[20px] py-[16px]'
              }
            >
              {isRepositoriesLoading ? (
                <RepositoriesListSkeleton />
              ) : repositories.length > 0 ? (
                repositories.map((repository) => (
                  <div
                    key={`repository-${repository.id}`}
                    className={
                      'border-dark-grey-100 border-b-dark-grey-400 flex w-full items-center justify-between border-b-[1px] py-[8px]'
                    }
                  >
                    <div className={'flex items-center gap-[8px]'}>
                      <div
                        aria-label={repository.isTracking ? '추적 중인 레포지토리' : '미추적 레포지토리'}
                        className={cn(
                          `h-[8px] w-[8px] rounded-full ${repository.isTracking ? 'bg-dark-blue-500' : 'bg-dark-grey-200'}`,
                        )}
                      />
                      <p className={'text-body-small text-white'}>{repository.name}</p>
                    </div>

                    <button
                      type={'button'}
                      className={'mr-[8px] cursor-pointer'}
                      onClick={() => {
                        deleteRepository(repository.id);
                      }}
                    >
                      <MonoXIcon />
                    </button>
                  </div>
                ))
              ) : (
                <div className={'flex flex-col items-center justify-center gap-[4px] rounded-[8px]'}>
                  <RepoEmpty />
                  <p className={'text-body-small text-dark-grey-300'}>{'추가된 레포지토리가 없어요.'}</p>
                </div>
              )}
            </div>

            {button || (
              <Button className={'mt-[24px] w-full'} onClick={handleStart} disabled={repositories.length === 0}>
                {'시작하기'}
              </Button>
            )}
          </div>
        </ModalComponent.RepoLinkContainer>
      </ModalComponent.Content>
    </ModalComponent.Root>
  );
}

export default RepolinkModal;

// 스켈레톤 애니메이션을 위한 공통 클래스
const skeletonAnimation = 'animate-pulse bg-dark-grey-200';

// 사용자 프로필 스켈레톤 컴포넌트
function UserProfileSkeleton() {
  return (
    <div className={'flex items-center gap-[6px]'}>
      <div className={`${skeletonAnimation} h-[16px] w-[16px] rounded-full`} />
      <div className={`${skeletonAnimation} h-[14px] w-[60px] rounded-[4px]`} />
    </div>
  );
}

// 레포지토리 아이템 스켈레톤 컴포넌트
function RepositoryItemSkeleton({ index }: { index: number }) {
  return (
    <div
      key={`repository-skeleton-${index}`}
      className={
        'border-dark-grey-100 border-b-dark-grey-400 flex w-full items-center justify-between border-b-[1px] py-[8px]'
      }
    >
      <div className={'flex items-center gap-[8px]'}>
        <div className={`${skeletonAnimation} h-[8px] w-[8px] rounded-full`} />
        <div className={`${skeletonAnimation} h-[14px] w-[120px] rounded-[4px]`} />
      </div>
      <div className={`${skeletonAnimation} mr-[8px] h-[16px] w-[16px] rounded-[4px]`} />
    </div>
  );
}

// 레포지토리 목록 스켈레톤 컴포넌트
function RepositoriesListSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <RepositoryItemSkeleton key={`skeleton-${index}`} index={index} />
      ))}
    </>
  );
}

/* eslint-disable no-alert */

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Modal as ModalComponent } from '..';
import Button from '../../Button';

import { useSaveRepositoryMutation } from '@/apis/repositories/repositories.mutate';
import { REPOSITORIES_API_QUERY_KEY, useRepositoriesMeQuery } from '@/apis/repositories/repositories.query';
import Avatar from '@/assets/images/avatar.png';
import MonoXIcon from '@/assets/svg/mono_x.svg';

function RepolinkModal() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [input, setInput] = useState('');
  const { data: repositoriesData } = useRepositoriesMeQuery({ variables: { data: { url: '' } }, options: {} });
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

  const repositories = (() => {
    // eslint-disable-next-line no-underscore-dangle
    const _repositories = repositoriesData?.data?.repositories;
    if (!_repositories) return [];
    if (_repositories.length === 0) return [];
    return _repositories;
  })();

  const saveRepository = () => {
    if (repositories.length === 5) return;
    mutate({
      data: { url: input },
    });
  };

  const handleStart = () => {
    router.replace('/');
  };

  return (
    <ModalComponent.Root defaultOpen isOutsideClickClose={false}>
      <ModalComponent.Content>
        <div
          className={
            'border-dark-grey-200 flex flex-col items-center rounded-[12px] border-[1px] px-[32px] pt-[52px] pb-[28px]'
          }
        >
          <section
            className={
              'border-dark-grey-200 flex w-fit items-center justify-center gap-[6px] rounded-full border-[1px] px-[10px] py-[6px]'
            }
          >
            {/* TODO: 프로필 이미지 추가 */}
            <Image src={Avatar} alt={'프로필 아바타 이미지'} width={16} height={16} />
            {/* TODO: 닉네임 추가 */}
            <p className={'text-body-small'}>{'Hocaron'}</p>
          </section>

          <section className={'flex w-[380px] flex-col items-center justify-center gap-[8px]'}>
            <h3 className={'text-h3'}>{'회고할 레포지토리를 추가해 주세요!'}</h3>
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
            {repositories.map((repository) => (
              <div
                key={`repository-${repository.id}`}
                className={
                  'border-dark-grey-100 border-b-dark-grey-400 flex w-full items-center justify-between border-b-[1px] py-[8px]'
                }
              >
                <div className={'flex items-center gap-[8px]'}>
                  <div className={'bg-dark-blue-500 h-[8px] w-[8px] rounded-full'} />
                  <p className={'text-body-small text-white'}>{repository.name}</p>
                </div>
                {/* TODO: 삭제 기능 구현 */}
                <button type={'button'} className={'mr-[8px] cursor-pointer'}>
                  <MonoXIcon />
                </button>
              </div>
            ))}
          </div>

          <Button className={'mt-[24px] w-full'} onClick={handleStart}>
            {'시작하기'}
          </Button>
        </div>
      </ModalComponent.Content>
    </ModalComponent.Root>
  );
}

export default RepolinkModal;

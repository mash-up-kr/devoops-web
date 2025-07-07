'use client';

import Image from 'next/image';
import React from 'react';

import Button from '../common/Button';

import Avatar from '@/assets/images/avatar.png';

function Repolink() {
  return (
    <main
      className={
        'border-dark-grey-200 flex flex-col items-center rounded-[12px] border-[1px] px-[32px] pt-[52px] pb-[28px]'
      }
    >
      <div
        className={
          'border-dark-grey-200 flex w-fit items-center justify-center gap-[6px] rounded-full border-[1px] px-[10px] py-[6px]'
        }
      >
        <Image src={Avatar} alt={'프로필 아바타 이미지'} width={16} height={16} />
        <p className={'text-body-small'}>{'Hocaron'}</p>
      </div>

      <section className={'flex w-[380px] flex-col items-center justify-center'}>
        <h3 className={'text-h3 mt-[12px]'}>{'회고 할 레포 추가해라~'}</h3>
        <h3 className={'text-h3'}>{'레포 주소를 입력해 주세요'}</h3>
        <p className={'text-body-small text-dark-grey-600 mt-[12px]'}>{'레포지토리는 5개까지 추가할 수 있어요'}</p>
      </section>

      <section className={'mt-[40px] flex w-full flex-col'}>
        <p className={'text-caption text-dark-grey-800 mb-[8px]'}>{'레포지토리 주소'}</p>

        <div className={'flex w-full gap-[12px]'}>
          <input
            className={
              'text-body-medium text-dark-grey-900 border-dark-grey-200 h-[48px] w-[272px] rounded-[8px] border-[1px] px-[14px] py-[12px] placeholder:text-dark-grey-900'
            }
            type={'text'}
            placeholder={'레포지토리 주소를 입력해 주세요'}
          />
          <Button variant={'weakPrimary'} size={'medium'}>
            {'추가'}
          </Button>
        </div>
      </section>

      <section className={'border-dark-grey-400 mt-[24px] h-[188px] w-full border-[1px]'}>
        <p className={'text-white'}>{'이미지 넣을 예정'}</p>
      </section>

      <Button className={'mt-[24px] w-full'}>{'시작하기'}</Button>
    </main>
  );
}

export default Repolink;

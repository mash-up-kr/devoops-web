'use client';

import { useEffect } from 'react';

import { RepositorySummaryType } from '@/__generated__/@types';
import { RepolinkButton, RepolinkModal } from '@/components/common/Modal/RepolinkModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import RepositoryList from '@/components/home/RepositoryList';
import { useModalDispatch } from '@/providers/ModalContext';

interface MyPRProps {
  initialRepositoryList: RepositorySummaryType[];
}

export default function MyPR({ initialRepositoryList }: MyPRProps) {
  const dispatch = useModalDispatch();

  useEffect(() => {
    dispatch({ type: 'CLOSE_ALL' });
  });

  return (
    <>
      <div>
        <h1 className={'text-h1 blue-tiny-left inline-block pt-2.5 pb-6 font-semibold'}>{'내 PR'}</h1>
        <Tabs defaultValue={initialRepositoryList[0]?.name || ''}>
          <div className={'border-dark-grey-100 border-b-1'}>
            <TabsList aria-label={'내 PR 목록'}>
              {initialRepositoryList.map((repository) => (
                <TabsTrigger key={repository.id} value={repository.name || ''}>
                  {repository.name}
                </TabsTrigger>
              ))}
              <RepolinkButton action={'OPEN'} />
            </TabsList>
          </div>
          <div>
            {initialRepositoryList.map((repository) => (
              <TabsContent key={repository.id} value={repository.name || ''}>
                <RepositoryList repository={repository} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
      <RepolinkModal defaultOpen={false} isOutsideClickClose button={<div />} />
    </>
  );
}

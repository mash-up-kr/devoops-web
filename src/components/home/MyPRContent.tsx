'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { RepositorySummaryType } from '@/__generated__/@types';
import { RepolinkButton } from '@/components/common/Modal/RepolinkModal';
import Spacing from '@/components/common/Spacing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import { Overview } from '@/components/home/Overview';
import { RepositoryTrigger } from '@/components/home/RepositoryTrigger';

interface MyPRContentProps {
  initRepositories: RepositorySummaryType[];
  currentTab: string;
}

export function MyPRContent({ initRepositories, currentTab }: MyPRContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const handleTabChange = (tabValue: string) => {
    const params = new URLSearchParams(searchParams);
    setActiveTab(tabValue);
    params.set('tab', tabValue);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h1 className={'text-h1 blue-tiny-left inline-block pt-2.5 pb-6 font-semibold'}>{'내 PR'}</h1>
      <Tabs key={activeTab} defaultValue={activeTab}>
        <div className={'border-dark-grey-100 border-b-1'}>
          <TabsList aria-label={'내 PR 목록'}>
            {initRepositories.map((repository) => (
              <TabsTrigger
                key={repository.id}
                value={repository.name || ''}
                onClick={() => handleTabChange(repository.name || '')}
              >
                <RepositoryTrigger repository={repository} />
              </TabsTrigger>
            ))}
            <RepolinkButton action={'OPEN'} />
          </TabsList>
        </div>
        {initRepositories.map((repository) => (
          <TabsContent key={repository.id} value={repository.name || ''}>
            <Overview repository={repository} />
          </TabsContent>
        ))}
      </Tabs>
      <Spacing size={400} />
    </div>
  );
}

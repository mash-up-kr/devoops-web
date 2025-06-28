import AddIcon from '@/assets/svg/add.svg';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs';
import { PRItem, PRStatus, PRContent } from '@/components/home/PRItem';

const data: {
  count: number;
  pullRequests: {
    id: number;
    title: string;
    recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
    mergedAt: string;
    summary: string;
    tag: string;
  }[];
} = {
  count: 20,
  pullRequests: [
    {
      id: 101,
      title: '사용자 인증 기능 추가',
      recordStatus: 'PENDING',
      mergedAt: '2025-06-20',
      summary: '',
      tag: 'feat',
    },
    {
      id: 102,
      title: '캐싱 미들웨어 도입',
      recordStatus: 'PROGRESS',
      mergedAt: '2025-06-19',
      summary: '',
      tag: 'feature',
    },
    {
      id: 103,
      title: 'UI 다국어 처리',
      recordStatus: 'DONE',
      mergedAt: '2025-06-18',
      summary: 'UI 컴포넌트 다국어 처리를 적용해 사용자 경험을 개선',
      tag: 'feat',
    },
    {
      id: 104,
      title: 'API Rate Limiting 추가',
      recordStatus: 'PROGRESS',
      mergedAt: '2025-06-17T19:50:22Z',
      summary: '',
      tag: 'feature',
    },
    {
      id: 105,
      title: '테스트 커버리지 확장',
      recordStatus: 'PENDING',
      mergedAt: '2025-06-15T07:12:01Z',
      summary: '',
      tag: '',
    },
  ],
};

export default function MyPR() {
  return (
    <div>
      <h1
        className={`
          text-h1 blue-tiny-left inline-block pt-2.5 pb-6 font-semibold
        `}
      >
        {'내 PR'}
      </h1>
      <Tabs defaultValue={'전체'} className={'w-full'}>
        <TabsList>
          <TabsTrigger value={'전체'}>{'전체'}</TabsTrigger>
          <TabsTrigger value={'레포1'}>{'레포1'}</TabsTrigger>
          <AddIcon />
        </TabsList>
        <TabsContent value={'전체'} className={'flex flex-col gap-5 py-4'}>
          {data.pullRequests.map((pr, idx) => (
            <PRItem key={idx}>
              <PRStatus status={pr.recordStatus} />
              <PRContent content={pr.title} label={pr.tag} />
            </PRItem>
          ))}
        </TabsContent>
        <TabsContent value={'레포1'} className={'p-4'}>
          <h3 className={'mb-4 text-lg font-medium'}>{'Password Settings'}</h3>
          <p className={'text-gray-300'}>{'Change your password here.'}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

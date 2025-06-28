import AddIcon from '@/assets/svg/add.svg';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs';
import { PRItem, PRStatus, PRContent } from '@/components/home/PRItem';

export default function MyPRSection() {
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
          <PRItem>
            <PRStatus status={'pending'} />
            <PRContent
              content={'refactor: notification을 타입계층으로 리팩터링인데 이름이 긴 PR 제목인 경우'}
              label={'Fix'}
            />
          </PRItem>
          <PRItem>
            <PRStatus status={'progress'} />
            <PRContent
              content={'refactor: notification을 타입계층으로 리팩터링인데 이름이 긴 PR 제목인 경우'}
              label={'Fix'}
            />
          </PRItem>
          <PRItem>
            <PRStatus status={'done'} />
            <PRContent
              content={'refactor: notification을 타입계층으로 리팩터링인데 이름이 긴 PR 제목인 경우'}
              label={'Fix'}
            />
          </PRItem>
        </TabsContent>
        <TabsContent value={'레포1'} className={'p-4'}>
          <h3 className={'mb-4 text-lg font-medium'}>{'Password Settings'}</h3>
          <p className={'text-gray-300'}>{'Change your password here.'}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

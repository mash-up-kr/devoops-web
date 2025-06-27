import { Tabs } from '@/components/common/Tabs/Tabs';
import { TabsContent } from '@/components/common/Tabs/TabsContent';
import { TabsList } from '@/components/common/Tabs/TabsList';
import { TabsTrigger } from '@/components/common/Tabs/TabsTrigger';

export default function Home() {
  return (
    <div className={'flex flex-col gap-8 p-8'}>
      <div className={'p-8'}>
        <h1 className={'text-2xl font-bold'}>{'Tabs Medium'}</h1>
        <div>
          <Tabs defaultValue={'전체'} className={'w-[400px]'}>
            <TabsList>
              <TabsTrigger value={'전체'}>{'전체'}</TabsTrigger>
              <TabsTrigger value={'레포1'}>{'레포1'}</TabsTrigger>
              <TabsTrigger value={'레포2'} disabled>
                {'레포2'}
              </TabsTrigger>
            </TabsList>
            <TabsContent value={'전체'} className={'p-4'}>
              <h3 className={'mb-4 text-lg font-medium'}>{'Account Settings'}</h3>
              <p className={'text-gray-300'}>{'Make changes to your account here.'}</p>
            </TabsContent>
            <TabsContent value={'레포1'} className={'p-4'}>
              <h3 className={'mb-4 text-lg font-medium'}>{'Password Settings'}</h3>
              <p className={'text-gray-300'}>{'Change your password here.'}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className={'p-8'}>
        <h1 className={'text-2xl font-bold'}>{'Tabs Large'}</h1>
        <div>
          <Tabs defaultValue={'전체'} className={'w-[400px]'}>
            <TabsList>
              <TabsTrigger value={'전체'} size={'large'}>
                {'전체'}
              </TabsTrigger>
              <TabsTrigger value={'레포1'} size={'large'}>
                {'레포1'}
              </TabsTrigger>
              <TabsTrigger value={'레포2'} size={'large'} disabled>
                {'레포2'}
              </TabsTrigger>
            </TabsList>
            <TabsContent value={'전체'} className={'p-4'}>
              <h3 className={'mb-4 text-lg font-medium'}>{'Account Settings'}</h3>
              <p className={'text-gray-300'}>{'Make changes to your account here.'}</p>
            </TabsContent>
            <TabsContent value={'레포1'} className={'p-4'}>
              <h3 className={'mb-4 text-lg font-medium'}>{'Password Settings'}</h3>
              <p className={'text-gray-300'}>{'Change your password here.'}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

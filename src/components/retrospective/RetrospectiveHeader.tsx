import Tag from '@/components/common/Tag';

export default function RetrospectiveHeader() {
  return (
    <header
      className={'border-outline-variant flex flex-col items-start justify-start gap-[6px] border-b-[1px] pb-[36px]'}
    >
      <Tag dotColor={'violet'}>{'feature'}</Tag>
      <div>
        <h1 className={'text-h1 font-semibold'}>{'feat: 레디스 이벤트 리스너 구현 #40'}</h1>
        <div className={'text-body-small text-on-surface-low font-regular flex gap-[8px]'}>
          <span>{'회고 전'}</span>
          <span>{'·'}</span>
          <span>{'Merged on Jul 22, 2024'}</span>
          <span>{'·'}</span>
          <span>{'PR 보러가기'}</span>
        </div>
      </div>
    </header>
  );
}

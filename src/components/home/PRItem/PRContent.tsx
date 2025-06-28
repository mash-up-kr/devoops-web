import Tag from '@/components/common/Tag';

interface PRContentProps {
  content: string;
  label: string;
}

export default function PRContent({ content, label }: PRContentProps) {
  return (
    <div className={'flex w-full items-start justify-between'}>
      <h4 className={'text-h4 max-w-[524px] font-medium'}>{content}</h4>
      <Tag dotColor={'violet'}>{label}</Tag>
    </div>
  );
}

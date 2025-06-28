import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className={'flex flex-col items-start justify-start gap-[8px]'}>
      {icon}
      <div className={'flex flex-col gap-[2px]'}>
        <span className={'text-h4 font-semibold'}>{title}</span>
        <span className={'text-body-medium font-regular text-on-surface-lowest'}>{description}</span>
      </div>
    </div>
  );
}

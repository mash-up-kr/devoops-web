import React, { PropsWithChildren } from 'react';

export interface RepoLinkContainerProps {
  children: React.ReactNode;
}

function RepoLinkContainer({ children }: PropsWithChildren<RepoLinkContainerProps>) {
  return (
    <div
      className={
        'border-dark-grey-200 shadow-strong-down relative flex flex-col items-center overflow-hidden rounded-[12px] border-[1px] px-[32px] pt-[52px] pb-[28px]'
      }
    >
      {/* 첫 번째 원 */}
      <div
        className={'absolute top-[-192px] right-[-161px] size-[279px] rounded-[279px] bg-[#6074F7] opacity-20'}
        style={{ filter: 'blur(100px)' }}
      />
      {/* 두 번째 원 */}
      <div
        className={'absolute bottom-[-140px] left-[-140px] size-[279px] rounded-[279px] bg-[#64A8FF] opacity-10'}
        style={{ filter: 'blur(100px)' }}
      />
      {/* 세 번째 원 */}
      <div className={'absolute bottom-[-211.5px] left-[46.5px] bg-[#191F45]'} style={{ filter: 'blur(100px)' }} />
      {children}
    </div>
  );
}

export default RepoLinkContainer;

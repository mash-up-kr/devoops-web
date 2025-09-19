import Image from 'next/image';

import RepolinkImage from '@/assets/images/landing/landing-repolink.webp';
import Tag from '@/components/common/Tag';

export default function RepolinkSection() {
  return (
    <section>
      <div className={'mt-[80px] flex flex-col items-center'}>
        <div className={'flex flex-col items-center gap-5'}>
          <div className={'flex flex-col items-center gap-4'}>
            <Tag dotColor={'primary'} size={'medium'} padding={'medium'}>
              {'AI를 통한 간편한 회고'}
            </Tag>
            <h1 className={'blue-tiny-right inline-block text-[48px] leading-[64px] font-bold'}>
              {'레포 주소만 입력하면. 끝'}
            </h1>
          </div>
          <div className={'text-dark-grey-600 flex flex-col text-center text-[18px] leading-[29px] font-medium'}>
            <p>
              <span className={'blue-tiny-right bg-clip-text font-semibold text-transparent'}>
                {'레포지토리 주소만 입력하면 끝'}
              </span>
              {'이에요.'}
            </p>
            <p>{'이제 회고는 Devoops가 자동으로 챙겨드려요.'}</p>
          </div>
        </div>
      </div>
      <div
        className={
          'border-dark-grey-200 bg-gradient-landing-image mx-auto mt-[78px] max-w-[1000px] overflow-hidden rounded-tl-[28px] rounded-tr-[28px] border-1 pt-[53px] pb-[38px]'
        }
      >
        <Image src={RepolinkImage} alt={'Landing Hero'} width={508} className={'mx-auto'} />
      </div>
    </section>
  );
}

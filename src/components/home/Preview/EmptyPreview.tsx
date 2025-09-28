import Image from 'next/image';

import CursorImage from '@/assets/images/home/cursor.webp';

export function EmptyPreview() {
  return (
    <div className={'min min-h-preview mx-8 my-5 flex w-full max-w-[438px] flex-col pt-5 max-lg:w-[338px]'}>
      <h5 className={'text-h5 mb-[23px] font-medium'}>{'미리보기'}</h5>
      <div className={'pt-6'}>
        <div className={'flex flex-col items-center justify-center gap-5'}>
          <Image src={CursorImage} alt={'커서 이미지'} width={160} priority />
          <p className={'text-body-medium font-regular text-dark-grey-700'}>{'PR 목록에 마우스를 올려주세요.'}</p>
        </div>
      </div>
    </div>
  );
}

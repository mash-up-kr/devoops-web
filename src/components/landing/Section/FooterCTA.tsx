import { LoadingButton } from '@/components/common/LoadingButton';

interface FooterCTAProps {
  action: () => void;
}

export default function FooterCTA({ action }: FooterCTAProps) {
  return (
    <div>
      <div className={'mx-auto mb-[48px] flex items-center justify-center gap-8 py-[96px]'}>
        <h1 className={'text-h1 blue-tiny-right inline-block leading-[58px] font-bold'}>
          {'복잡한 회고, Devoops가 슬쩍 정리해줄게요.'}
        </h1>
        <LoadingButton variant={'filledPrimary'} size={'medium'} action={action}>
          {'Devoops 시작하기'}
        </LoadingButton>
      </div>
    </div>
  );
}

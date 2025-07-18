import Button from '@/components/common/Button';

interface FooterCTAProps {
  action: () => void;
}

export default function FooterCTA({ action }: FooterCTAProps) {
  return (
    <div>
      <div className={'mx-auto mb-[48px] flex items-center justify-center gap-8 py-[96px]'}>
        <h1 className={'text-h1 blue-tiny-right inline-block leading-[58px] font-bold'}>
          {'복잡한 회고, DevOops가 슬쩍 정리해줄게요.'}
        </h1>
        <Button variant={'filledPrimary'} size={'medium'} onClick={action}>
          {'DevOops 시작하기'}
        </Button>
      </div>
    </div>
  );
}

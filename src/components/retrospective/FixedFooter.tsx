import Button from '../common/Button';

export default function FixedFooter() {
  return (
    <footer
      className={
        'fixed bottom-0 left-[50%] flex w-full max-w-[840px] -translate-x-1/2 justify-end bg-[linear-gradient(180deg,_rgba(20,22,26,0)_0%,_#14161A_48.11%)] px-[40px] pt-[80px] pb-[12px] bg-[background:'
      }
    >
      <Button variant={'filledPrimary'} size={'medium'} disabled>
        {'회고완료'}
      </Button>
    </footer>
  );
}

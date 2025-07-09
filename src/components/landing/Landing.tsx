import Button from '../common/Button';

function Landing() {
  return (
    <main className={'flex h-screen flex-col items-center justify-center overflow-hidden'}>
      <Button variant={'filledPrimary'} className={'w-[380px]'}>
        {'시작하기'}
      </Button>

      <p className={'mt-[39px] text-white'}>{`디자인 작업필요`}</p>
    </main>
  );
}

export default Landing;

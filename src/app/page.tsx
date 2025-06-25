import Button from '@/components/common/Button/Button';

function PlusIcon() {
  return (
    <svg width={'16'} height={'16'} viewBox={'0 0 16 16'} fill={'currentColor'}>
      <path d={'M8 1v14M1 8h14'} stroke={'currentColor'} strokeWidth={'2'} strokeLinecap={'round'} />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={'grid grid-cols-4 gap-4'}>
      <span className={'text-h1 font-regular'}>{'DevOops'}</span>
      <span className={'text-h1 font-medium'}>{'DevOops'}</span>
      <span className={'text-h1 font-semibold'}>{'DevOops'}</span>
      <span className={'text-h1 font-bold'}>{'DevOops'}</span>

      <span className={'text-h2 font-regular'}>{'DevOops'}</span>
      <span className={'text-h2 font-medium'}>{'DevOops'}</span>
      <span className={'text-h2 font-semibold'}>{'DevOops'}</span>
      <span className={'text-h2 font-bold'}>{'DevOops'}</span>

      <span className={'text-h3 font-regular'}>{'DevOops'}</span>
      <span className={'text-h3 font-medium'}>{'DevOops'}</span>
      <span className={'text-h3 font-semibold'}>{'DevOops'}</span>
      <span className={'text-h3 font-bold'}>{'DevOops'}</span>

      <span className={'text-h4 font-regular'}>{'DevOops'}</span>
      <span className={'text-h4 font-medium'}>{'DevOops'}</span>
      <span className={'text-h4 font-semibold'}>{'DevOops'}</span>
      <span className={'text-h4 font-bold'}>{'DevOops'}</span>

      <span className={'text-h5 font-regular'}>{'DevOops'}</span>
      <span className={'text-h5 font-medium'}>{'DevOops'}</span>
      <span className={'text-h5 font-semibold'}>{'DevOops'}</span>
      <span className={'text-h5 font-bold'}>{'DevOops'}</span>

      <span className={'text-body-large font-regular'}>{'DevOops'}</span>
      <span className={'text-body-large font-medium'}>{'DevOops'}</span>
      <span className={'text-body-large font-semibold'}>{'DevOops'}</span>
      <span className={'text-body-large font-bold'}>{'DevOops'}</span>

      <span className={'text-body-medium font-regular'}>{'DevOops'}</span>
      <span className={'text-body-medium font-medium'}>{'DevOops'}</span>
      <span className={'text-body-medium font-semibold'}>{'DevOops'}</span>
      <span className={'text-body-medium font-bold'}>{'DevOops'}</span>

      <span className={'text-body-small font-regular'}>{'DevOops'}</span>
      <span className={'text-body-small font-medium'}>{'DevOops'}</span>
      <span className={'text-body-small font-semibold'}>{'DevOops'}</span>
      <span className={'text-body-small font-bold'}>{'DevOops'}</span>

      <span className={'text-caption font-regular'}>{'DevOops'}</span>
      <span className={'text-caption font-medium'}>{'DevOops'}</span>
      <span className={'text-caption font-semibold'}>{'DevOops'}</span>
      <span className={'text-caption font-bold'}>{'DevOops'}</span>

      <div className={'min-h-screen space-y-8 p-8'}>
        <h1
          className={`
            text-h1 font-semibold text-[var(--color-on-surface-highest)]
          `}
        >
          {'Button Components'}
        </h1>

        {/* Primary Buttons */}
        <div className={'space-y-4'}>
          <h2 className={'text-h3 font-medium text-[var(--color-on-surface)]'}>{'Primary Buttons'}</h2>
          <div className={'flex items-center gap-4'}>
            <Button variant={'filledPrimary'} size={'large'}>
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'medium'}>
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'small'}>
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'tiny'}>
              {'버튼'}
            </Button>
          </div>

          {/* With Icons */}
          <div className={'flex items-center gap-4'}>
            <Button variant={'filledPrimary'} size={'large'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'medium'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'small'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'tiny'}>
              <PlusIcon />
              {'버튼'}
            </Button>
          </div>

          {/* Disabled State */}
          <div className={'flex items-center gap-4'}>
            <Button variant={'filledPrimary'} size={'large'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'medium'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'small'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'filledPrimary'} size={'tiny'} disabled>
              {'버튼'}
            </Button>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className={'space-y-4'}>
          <h2 className={'text-h3 font-medium text-[var(--color-on-surface)]'}>{'Secondary Buttons'}</h2>
          <div className={'flex items-center gap-4'}>
            <Button variant={'weakPrimary'} size={'large'}>
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'medium'}>
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'small'}>
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'tiny'}>
              {'버튼'}
            </Button>
          </div>

          {/* With Icons */}
          <div className={'flex items-center gap-4'}>
            <Button variant={'weakPrimary'} size={'large'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'medium'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'small'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'tiny'}>
              <PlusIcon />
              {'버튼'}
            </Button>
          </div>

          {/* Disabled State */}
          <div className={'flex items-center gap-4'}>
            <Button variant={'weakPrimary'} size={'large'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'medium'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'small'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'weakPrimary'} size={'tiny'} disabled>
              {'버튼'}
            </Button>
          </div>
        </div>

        {/* Ghost Buttons */}
        <div className={'space-y-4'}>
          <h2 className={'text-h3 font-medium text-[var(--color-on-surface)]'}>{'Ghost Buttons'}</h2>
          <div className={'flex items-center gap-4'}>
            <Button variant={'outlineGrey'} size={'large'}>
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'medium'}>
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'small'}>
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'tiny'}>
              {'버튼'}
            </Button>
          </div>

          {/* With Icons */}
          <div className={'flex items-center gap-4'}>
            <Button variant={'outlineGrey'} size={'large'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'medium'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'small'}>
              <PlusIcon />
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'tiny'}>
              <PlusIcon />
              {'버튼'}
            </Button>
          </div>

          {/* Disabled State */}
          <div className={'flex items-center gap-4'}>
            <Button variant={'outlineGrey'} size={'large'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'medium'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'small'} disabled>
              {'버튼'}
            </Button>
            <Button variant={'outlineGrey'} size={'tiny'} disabled>
              {'버튼'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

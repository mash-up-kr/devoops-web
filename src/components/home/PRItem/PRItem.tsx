import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export default function PRItem({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      type={'button'}
      aria-label={'PR Item'}
      className={`
        text-dark-grey-600 flex w-full cursor-pointer flex-col items-start gap-2
        rounded-xl bg-transparent px-2.5
        py-4 hover:bg-dark-grey-25 hover:text-dark-grey-900
      `}
      {...props}
    >
      {children}
    </button>
  );
}

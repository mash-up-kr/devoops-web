import Link from 'next/link';

export default function GlobalNavigation() {
  return (
    <nav
      className={`
        fixed top-[0px] left-[50%] flex w-full max-w-[1200px] -translate-x-1/2
        items-center justify-between px-[40px] py-[13px]
      `}
    >
      <h1 className={'text-h4 font-bold'}>{'Devoops'}</h1>
      <div className={'flex items-center gap-[16px]'}>
        {/* TODO: GNB 디자인 완성되면 href와 실제 스타일 변경 */}
        <Link href={'/'}>{'북마크'}</Link>
        <Link href={'/'}>{'마이페이지'}</Link>
      </div>
    </nav>
  );
}

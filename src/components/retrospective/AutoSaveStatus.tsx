interface AutoSaveStatusProps {
  status: 'idle' | 'saving' | 'saved';
}

export default function AutoSaveStatus({ status }: AutoSaveStatusProps) {
  if (status === 'idle') return null;

  return (
    <div className={'text-sm font-medium text-white'}>
      {status === 'saving' && '자동 저장 중...'}
      {status === 'saved' && '자동 저장 완료 !'}
    </div>
  );
}

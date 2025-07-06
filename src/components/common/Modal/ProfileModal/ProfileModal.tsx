import { Modal } from '@/components/common/Modal';
import { ProfileButton, ProfileContent } from '@/components/common/Modal/ProfileModal';

export default function ProfileModal() {
  return (
    <Modal.Root className={'w-full items-start justify-end pt-12 pr-[calc((100vw-1120px)/2)]'}>
      <Modal.Content>
        <div
          className={
            'shadow-modal bg-dark-grey-50 border-dark-grey-100 relative flex flex-col items-end rounded-xl border-[1px] px-4 pt-9 pb-5'
          }
        >
          <ProfileButton action={'CLOSE'} className={'absolute top-4 right-4'} />
          <ProfileContent />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

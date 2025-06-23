import { Modal } from '@/components/modal';

export default function ModalTestPage() {
  return (
    <Modal.Root>
      <Modal.Toggle action={'OPEN'}>{'모달 열기'}</Modal.Toggle>
      <Modal.Content>
        <h2>{'제목'}</h2>
        <p>{'모달 내용'}</p>
        <Modal.Toggle action={'CLOSE'}>{'모달 닫기'}</Modal.Toggle>
      </Modal.Content>
    </Modal.Root>
  );
}

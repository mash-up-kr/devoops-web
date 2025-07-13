import React from 'react';

import { Modal } from '..';

function RepoLoadingModal() {
  return (
    <Modal.Root defaultOpen isOutsideClickClose={false}>
      <Modal.Content>
        <div>
          <h2 className={'text-dark-grey-800 text-h2'}>{'레포지토리 연동 중'}</h2>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

export default RepoLoadingModal;

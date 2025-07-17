// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react';
import React from 'react';

import { Modal } from '..';

import Loading from '@/assets/lottie/loading.json';

function RepoLoadingModal() {
  return (
    <Modal.Root defaultOpen isOutsideClickClose={false}>
      <Modal.Content>
        <Modal.RepoLinkContainer>
          <div className={'size-[340px] p-[20px]'}>
            <Lottie animationData={Loading} loop />
          </div>
          <h2 className={'text-dark-grey-800 text-h2 mt-[30px]'}>{'레포지토리 연동 중'}</h2>
        </Modal.RepoLinkContainer>
      </Modal.Content>
    </Modal.Root>
  );
}

export default RepoLoadingModal;

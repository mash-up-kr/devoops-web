import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

function ModalPortal({ children }: ModalPortalProps) {
  const portalRoot = typeof window !== 'undefined' ? document.getElementById('portal') : null;
  return portalRoot ? createPortal(children, portalRoot) : null;
}

export default ModalPortal;

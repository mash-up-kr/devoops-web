import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

function Portal({ children }: PortalProps) {
  const portalRoot = typeof window !== 'undefined' ? document.getElementById('portal') : null;
  return portalRoot ? createPortal(children, portalRoot) : null;
}

export default Portal;

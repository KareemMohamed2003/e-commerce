import { createPortal } from 'react-dom';
import '../sass/overlay.scss';
import { ReactNode } from 'react';
interface PortalProps {
  children: ReactNode;
}
export default function Portal({ children }: PortalProps) {
  const Overlay = ({ children }: PortalProps) => (
    <div className="overlay">{children}</div>
  );

  const portalElement = document.getElementById('portal') as HTMLElement;

  return createPortal(<Overlay>{children}</Overlay>, portalElement);
}

import { useEffect, useRef } from 'react';

export function Modal({
  openModal,
  closeModal,
  children,
}: Readonly<{
  openModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}>) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      {children}
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
}

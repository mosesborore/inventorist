import React from "react";

interface ModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
}
function Modal({ modalRef, children }: ModalProps) {
  return (
    <div>
      {" "}
      <dialog ref={modalRef} id="generic_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </div>
  );
}

export default Modal;

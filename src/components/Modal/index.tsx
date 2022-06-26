import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  toggleIsOpen,
  children,
}) => (
  <ReactModal
    shouldCloseOnOverlayClick={true}
    isOpen={isOpen}
    onRequestClose={toggleIsOpen}
    ariaHideApp={false}
    style={{
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "#F0F0F5",
        color: "#000000",
        borderRadius: "8px",
        width: "736px",
        border: "none",
      },
      overlay: {
        backgroundColor: "#121214e6",
      },
    }}
  >
    {children}
  </ReactModal>
);

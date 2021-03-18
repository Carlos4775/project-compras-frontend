import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from "react-simple-hook-modal";

const ModalContent = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Open</button>
      <Modal
        id="any-unique-identifier"
        isOpen={isModalOpen}
        transition={ModalTransition.BOTTOM_UP}
      >
        <div className="mt-8">
          Open another modal which will appear stacked on top of the current
          modal.
        </div>
        <button
          className="p-3 bg-blue-500 text-white rounded mt-4"
          onClick={openModal}
        >
          Open next modal
        </button>
        <div className="mt-8">
          Toggle some long content to see how react-simple-hook-modal behaves.
        </div>
        <button className="p-3 bg-blue-700 text-white rounded mt-4">
          Toggle long content
        </button>
      </Modal>
    </>
  );
};

export default ModalContent;

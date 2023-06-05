import useModal from "../../../core/hooks/useModal";

const ModalWelcome = () => {
  const { closeModal } = useModal();

  return (
    <div
      className="modal-overlay bg-overlay max-sm:overflow-y-auto max-sm:items-start"
      onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box relative w-[100%] max-w-[530px] px-[24px] pt-[24px] shadow-free-trial 
            border-[1px] border-solid border-border-btn bg-white font-poppins
            max-sm:min-h-[100vh] max-sm:px-[16px] max-sm:py-[16px] max-sm:pb-[80px] max-sm:max-w-[100%]">
        <div className="flex items-center justify-between mb-[24px]"></div>
      </div>
    </div>
  );
};

export default ModalWelcome;

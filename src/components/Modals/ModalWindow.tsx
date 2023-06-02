import useModal from "../../core/hooks/useModal";
import { useAppSelector } from "../../core/hooks/useRedux";
import { Modal } from "../../core/models/enums";
import ModalDeletePage from "./WindowTypes/ModalDeletePage";
import ModalDeletePlaybook from "./WindowTypes/ModalDeletePlaybook";
import ModalSignup from "./WindowTypes/ModalSignUp";

const ModalWindow = () => {
  const { closeModal } = useModal();

  const { isModalOpen, modalType } = useAppSelector((state) => state.app);

  return (
    <div className="modal-overlay bg-overlay" onClick={closeModal}>
      {isModalOpen && modalType === Modal.PLAYBOOK_DELETE && (
        <ModalDeletePlaybook />
      )}
      {isModalOpen && modalType === Modal.PLAYBOOK_DELETE && (
        <ModalDeletePage />
      )}
      {isModalOpen && modalType === Modal.SIGN_UP && <ModalSignup />}
      {/* {isModalOpen && modalType === Modal.PURCHASE && <ModalPurchase />} */}
      {/* {isModalOpen && modalType === Modal.PLAYBOOK_DETAILS && (
        <ModalPlaybookDetail item={selectedItem} onSave={saveCallback} />
      )} */}
      {/* {isModalOpen && modalType === Modal.PURCHASE}
      {isModalOpen && modalType === Modal.PURCHASE} */}
      {/* {isModalOpen && modalType === Modal.PLAYBOOK_SHARE && (
        <ModalShare item={selectedItem} />
      )} */}
      {/* <ModalShare item={selectedItem}></ModalShare> */}
      {/* <ModalShareSocial item={selectedItem}></ModalShareSocial> */}
    </div>
  );
};

export default ModalWindow;

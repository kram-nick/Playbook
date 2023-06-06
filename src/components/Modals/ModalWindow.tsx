import ModalDeletePage from "./WindowTypes/ModalDeletePage";
import ModalDeletePlaybook from "./WindowTypes/ModalDeletePlaybook";
import ModalSignup from "./WindowTypes/ModalSignUp";
import ModalPlaybookDetail from "./WindowTypes/ModalPlaybookDetail";
import ModalPurchase from "./WindowTypes/ModalPurchase";
import ModalShare from "./WindowTypes/ModalShare";
import ModalWelcome from "./WindowTypes/ModalWelcome";
import ModalSale from "./WindowTypes/ModalSale";

import useModal from "../../core/hooks/useModal";
import { useAppSelector } from "../../core/hooks/useRedux";
import { Modal } from "../../core/models/enums";

const ModalWindow = () => {
  const { closeModal } = useModal();

  const { isModalOpen, modalType } = useAppSelector((state) => state.app);

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay bg-overlay" onClick={closeModal}>
          {modalType === Modal.PLAYBOOK_DELETE && <ModalDeletePlaybook />}
          {modalType === Modal.PAGE_DELETE && <ModalDeletePage />}
          {modalType === Modal.SIGN_UP && <ModalSignup />}
          {isModalOpen && modalType === Modal.PURCHASE && <ModalPurchase />}
          {isModalOpen && modalType === Modal.PLAYBOOK_DETAILS && (
            <ModalPlaybookDetail />
          )}
          {modalType === Modal.PLAYBOOK_SHARE && <ModalShare />}
          {modalType === Modal.WELCOME && <ModalWelcome />}
          {modalType === Modal.PLAYBOOK_SALE && <ModalSale />}
          {/* <ModalShareSocial item={selectedItem}></ModalShareSocial> */}
        </div>
      )}
    </>
  );
};

export default ModalWindow;

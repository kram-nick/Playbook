import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import useModal from "../../../core/hooks/useModal";
import PlaybookService from "../../../core/services/playbook.service";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/useRedux";
import { setReloadChecker } from "../../../core/store/reducers/helpers/helpersDataSlice";

import icon_delete from "../../../assets/photos/main/modal-delete.svg";
import icon_close from "../../../assets/photos/main/modal-close.svg";

export default function ModalDeletePage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { reloadChecker, sharedId } = useAppSelector((state) => state.helpers);

  const { closeModal } = useModal();

  const deleteItem = async () => {
    try {
      await PlaybookService.DeletePage(sharedId);
      closeModal();
      toast.success(t<string>("MAIN.DELETE_PAGE_SUCCESS"));
      dispatch(setReloadChecker(!reloadChecker));
    } catch (errors: any) {
      toast.error(errors?.response?.data?.errors);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-box relative w-[100%] max-w-[400px] px-[24px] py-[24px] shadow-free-trial rounded-[5px]
              border-[1px] border-solid border-border-btn bg-white font-poppins max-[690px]:w-[calc(100%-32px)]"
    >
      <div className="flex items-center justify-between mb-[24px]">
        <img src={icon_delete} alt="" />
        <button className="absolute top-[16px] right-[16px]">
          <img src={icon_close} alt="" onClick={closeModal} />
        </button>
      </div>
      <div className="text mb-[24px]">
        <div className="title text-[20px] font-medium mb-[8px] text-home-title leading-normal tracking-[-0.1px]">
          {t<string>("MODALS.DELETE")}
        </div>
        <p className="text-[16px] leading-normal text-simple-text tracking-[-0.1px]">
          {t<string>("MODALS.PAGE_DELETE")}
        </p>
      </div>
      <div className="grid grid-cols-2 font-poppins gap-[16px]">
        <button
          className="h-[46px] flex items-center justify-center 
                  py-[8px] px-[15px] bg-white rounded-[5px] text-home-title
                  text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
          title="Cancel"
          onClick={closeModal}
        >
          {t<string>("MODALS.CANCEL")}
        </button>
        <button
          className="h-[46px] flex items-center justify-center  
                  py-[8px] px-[15px] bg-danger rounded-[5px] text-buttons-color 
                  text-[16px] font-medium leading-[20px] shadow-free-trial "
          onClick={deleteItem}
          title="Delete"
        >
          {t<string>("MODALS.CONFIRM")}
        </button>
      </div>
    </div>
  );
}

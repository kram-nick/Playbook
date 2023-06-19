import icon_plus from "../../../assets/photos/main/plus.svg";
import pb_logo from "../../../assets/photos/main/active-empty.svg";
import { useTranslation } from "react-i18next";
import useModal from "../../../core/hooks/useModal";
import { ActivePlaybook, Modal } from "../../../core/models/enums";
import { setSharedId } from "../../../core/store/reducers/helpers/helpersDataSlice";
import { useAppDispatch } from "../../../core/hooks/useRedux";

const Empty = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex items-center">
      <div className="flex flex-col items-center pt-[111px] mx-auto gap-[20px]">
        <img src={pb_logo} alt="pb-logo" />
        <div className="flex items-center flex-col gap-[40px]">
          <div className="flex items-center flex-col gap-[16px]">
            <h6 className="font-poppins normal text-footer-main font-medium text-[20px] leading-[28px] tracking-[-0.1px]">
              {t<string>("MAIN.NO_ACTIVE_PB")}
            </h6>
            <span className="font-poppins normal text-simple-text text-[16px] font-normal leading-[28px] tracking-[-0.1px]">
              {t<string>("MAIN.NO_ACTIVE_PB_HINT")}
            </span>
          </div>

          <button
            onClick={() => {
              openModal(Modal.CREATE_ACTIVE_PLAY);
            }}
            className="shadow-tags rounded-[5px] bg-buttons-bg px-[16px] py-[10px] flex flex-row gap-[6px]
          hover:bg-buttons-bg-hover
          active:bg-buttons-bg-active
          "
          >
            <span className="font-poppins font-medium text-[16px] leading-[21px] normal text-buttons-color">
              {t<string>("MAIN.NEW_ACTIVE_PB")}
            </span>
            <img src={icon_plus} alt="add new" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empty;

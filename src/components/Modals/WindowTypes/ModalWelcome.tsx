import { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useModal from "../../../core/hooks/useModal";
import { Modal, Welcome } from "../../../core/models/enums";
import { useAppDispatch } from "../../../core/hooks/useRedux";
import { setPlaybookType } from "../../../core/store/reducers/helpers/helpersDataSlice";

import icon_close from "../../../assets/photos/modals/close-icon.svg";
import create from "../../../assets/photos/modals/create.svg";
import discover from "../../../assets/photos/modals/discover.svg";
import { PrivateUIRoutes, UIRoutes } from "../../../core/router";

const ModalWelcome = () => {
  const [active, setActive] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { closeModal, openModal } = useModal();

  const handleNavigate = () => {
    if (active === Welcome.CREATE) {
      navigate(`/${PrivateUIRoutes.Main}`);
      closeModal();
      openModal(Modal.PLAYBOOK_DETAILS);
      dispatch(setPlaybookType("create"));
    } else if (active === Welcome.DISCOVER) {
      navigate(`/${UIRoutes.DISCOVER}`);
      closeModal();
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-box relative w-[100%] max-w-[851px] p-[14px] shadow-free-trial 
            border-[1px] border-solid border-border-btn bg-white font-poppins
            max-sm:min-h-[100vh] max-sm:px-[16px] max-sm:py-[16px] max-sm:pb-[80px] max-sm:max-w-[100%]"
    >
      <div className="flex items-center flex-col justify-between ">
        <div className="w-full flex items-center justify-end mb-[-10px]">
          <button className=" w-[24px] h-[24px]">
            <img src={icon_close} alt="close" onClick={closeModal} />
          </button>
        </div>
        <div className="w-full flex items-center flex-col gap-[32px]">
          <h1 className="font-poppins font-bold normal leading-[41.6px] text-footer-main text-[32px]">
            {t<string>("MODALS.WELCOME")}
          </h1>
          <div className="w-full flex flex-row justify-center gap-[22.47px] ">
            <button
              onClick={() =>
                active === Welcome.DISCOVER
                  ? setActive("")
                  : setActive(Welcome.DISCOVER)
              }
              className={classNames({
                "p-[14.76px] bg-buttons-color rounded-[16.4px]  border-[0.82px] border-solid flex flex-col items-center gap-[22.47px]":
                  true,
                "border-buttons-bg bg-create-bg-main":
                  active === Welcome.DISCOVER,
              })}
            >
              <img src={discover} alt="discover" />
              <div className="flex flex-col items-center gap-[6px]">
                <h6 className="font-poppins font-semibold normal leading-[36px] text-[24px] text-footer-main">
                  {t<string>("MODALS.DISCOVER")}
                </h6>
                <span className="font-poppins font-normal tracking-[-0.1px] text-[16px] text-footer-main normal leading-[36px]">
                  {t<string>("MODALS.FIND_WELCOME")}
                </span>
              </div>
            </button>
            <button
              onClick={() =>
                active === Welcome.CREATE
                  ? setActive("")
                  : setActive(Welcome.CREATE)
              }
              className={classNames({
                "p-[14.76px] bg-buttons-color rounded-[16.4px]  border-[0.82px] border-solid flex flex-col items-center gap-[22.47px]":
                  true,
                "border-buttons-bg bg-create-bg-main":
                  active === Welcome.CREATE,
              })}
            >
              <img src={create} alt="create" />
              <div className="flex flex-col items-center gap-[6px]">
                <h6 className="font-poppins font-semibold normal leading-[36px] text-[24px] text-footer-main">
                  {t<string>("MODALS.CREATE")}
                </h6>
                <span className="font-poppins font-normal tracking-[-0.1px] text-[16px] text-footer-main normal leading-[36px]">
                  {t<string>("MODALS.WELCOME_OWN")}
                </span>
              </div>
            </button>
          </div>
          <button
            onClick={handleNavigate}
            className="font-poppins text-[16px] leading-[21px] font-medium normal 
          px-[18px] py-[12px] bg-buttons-bg text-buttons-color rounded-[6px] shadow-payment-btn"
          >
            {t<string>("MODALS.WELCOME_BTN")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWelcome;

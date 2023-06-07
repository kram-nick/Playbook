import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import cookie from "../../assets/photos/main/cookie.svg";
import close from "../../assets/photos/main/close-circle.svg";
import useModal from "../../core/hooks/useModal";
import { Modal } from "../../core/models/enums";
import { boolean } from "yup";

const CookiesPopup = () => {
  const [animate, setAnimate] = useState(false);

  const { t } = useTranslation();

  const { openModal } = useModal();

  const agree = JSON.parse(sessionStorage.getItem("agree") || "{}");

  useEffect(() => {
    const AnimateTimer = setTimeout(() => {
      setAnimate(true);
    }, 2200);

    return () => {
      clearTimeout(AnimateTimer);
    };
  }, []);

  const ClosePopup = () => {
    sessionStorage.removeItem("agree");
    setAnimate(false);
  };

  const ShowSettings = () => {
    openModal(Modal.PRIVACY);
    ClosePopup();
  };

  const AcceptCookie = () => {
    sessionStorage.setItem(
      "agree",
      JSON.stringify({
        agree: true,
      })
    );
    setAnimate(false);
  };

  //   if (!Object.keys(agree).length) {
  return (
    <div
      className={classNames({
        "w-full fixed bottom-[20px] right-[36px] z-10  flex justify-end": true,
        "translate-y-[300px] duration-400  transition-transform":
          !animate || Object.keys(agree).length,
        "translate-y-[0px]  duration-[1000ms] transition-transform": animate,
      })}>
      <div
        className="min-w-[553px] bg-list-title border-[1px] border-solid rounded-[5px]
                              shadow-cookies border-header-bottom p-[16px]
                              ">
        <div className="w-full flex flex-row justify-end">
          <button onClick={ClosePopup} className="closeModal">
            <img src={close} alt="close-button" />
          </button>
        </div>
        <div className="flex flex-col gap-[28px]">
          <div className="flex flex-col gap-[12px]">
            <div className="flex flex-row gap-[8px] items-center">
              <img src={cookie} alt="cookie" />
              <span className="text-[20px] text-top-playbook-title font-poppins font-medium leading-[20px] tracking-[-0.1px]">
                {t<string>("MODALS.COOKIE")}
              </span>
            </div>
            <p className="max-w-[489px] text-[16px] text-top-playbook-title font-poppins font-medium leading-[21px] ">
              {t<string>("MODALS.COOKIE_CONTENT")}
            </p>
          </div>
          <div
            className="w-full flex flex-row items-center justify-start gap-[24px]
                                  max-sm:justify-between
                                  ">
            <button
              onClick={ShowSettings}
              className="text-[16px] text-top-playbook-title font-poppins font-medium leading-[21px] 
                                        px-[18px] py-[12px] rounded-[6px] shadow-purchase_btn border-[1px] border-header-bottom">
              {t<string>("MODALS.COOKIE_SETTINGS")}
            </button>
            <button
              onClick={AcceptCookie}
              className="text-[16px] text-buttons-color bg-buttons-bg font-poppins font-medium leading-[21px]
                                      px-[18px] py-[12px] rounded-[6px] shadow-purchase_btn
                                        ">
              {t<string>("MODALS.COOKIE_ACCEPT")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  //   }
  //   return null;
};

export default CookiesPopup;

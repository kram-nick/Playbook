import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import failure from "../../assets/photos/payment/failure.svg";
import { PrivateUIRoutes, UIRoutes } from "../../core/router";

const FailurePayment = () => {
  const { t } = useTranslation();

  const payment_privacy = JSON.parse(
    sessionStorage.getItem("payment_privacy") || "false"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!payment_privacy) {
      navigate(`/${PrivateUIRoutes.Main}`);
    }
  }, []);

  return (
    <div
      className="min-h-[90vh] flex justify-center items-center w-full
max-sm:px-[16px]
">
      <div
        className="p-[32px] flex flex-col justify-between  items-center bg-create-bg-main border-[1px] border-header-bottom border-solid rounded-[8px] w-[486px]
  max-sm:min-w-[343px]
  ">
        <div className="w-full flex flex-col justify-between items-center gap-[28.5px]">
          <div className="flex items-center flex-col">
            <img src={failure} alt="failure" className="mb-[24px]" />
            <p className="font-poppins text-center mb-[20px] text-order-main font-semibold text-[24px] leading-[36px] ">
              {t<string>("PAYMENT.WRONG_MSSG")}
            </p>
            <h6 className="flex flex-row items-center gap-[6px] font-poppins text-top-playbook-title font-normal text-[16px] leading-[26px] tracking-[-0.1px]">
              {t<string>("PAYMENT.UNSUCCESS_MSSG")}{" "}
            </h6>
          </div>
          <div className="min-w-full border-b-[1px] border-card-border border-solid "></div>

          <ul className="w-full list-none mb-[36px] flex flex-col gap-[8px] items-start">
            <li
              className="flex flex-row items-center gap-[8px]
          font-poppins text-[16px] font-normal tracking-[-0.1px] text-top-playbook-title
          leading-[26px]
          ">
              <span
                className=" bg-top-entrepreneur w-[20px] h-[20px] text-center rounded-[20px] 
            font-inter text-tools-block text-[14px] font-normal tracking-[-0.1px]
            leading-[20px]
            ">
                1
              </span>
              {t<string>("PAYMENT.LI_ITEM_1")}
            </li>
            <li
              className="flex flex-row items-center gap-[8px]
          font-poppins text-[16px] font-normal tracking-[-0.1px] text-top-playbook-title
          leading-[26px]
          ">
              <span
                className=" bg-top-entrepreneur w-[20px] h-[20px] text-center rounded-[20px] 
            font-inter text-tools-block text-[14px] font-normal tracking-[-0.1px]
            leading-[20px]
            ">
                2
              </span>
              {t<string>("PAYMENT.LI_ITEM_2")}
            </li>
            <li
              className="flex flex-row items-center gap-[8px]
          font-poppins text-[16px] font-normal tracking-[-0.1px] text-top-playbook-title
          leading-[26px]
          ">
              <span
                className=" bg-top-entrepreneur w-[20px] h-[20px] text-center rounded-[20px] 
            font-inter text-tools-block text-[14px] font-normal tracking-[-0.1px]
            leading-[20px]
            ">
                3
              </span>
              {t<string>("PAYMENT.LI_ITEM_3")}
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate(`/${UIRoutes.DISCOVER}`)}
          className="min-w-full bg-buttons-bg px-[134px] py-[12px] shadow-payment-btn rounded-[6px]
    max-md:px-[62.5px]
    max-md:py-[12px]
    ">
          <span className="text-[16px] font-medim leading-[21px] font-poppins normal text-buttons-color">
            {t<string>("PAYMENT.AGAIN_BTN")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FailurePayment;

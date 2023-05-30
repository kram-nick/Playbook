import { useState } from "react";
import { useTranslation } from "react-i18next";

import success from "../../assets/photos/payment/success.svg";
import failure from "../../assets/photos/payment/failure.svg";

const PaymentResult = () => {
  const [onSuccess] = useState(false);

  const { t } = useTranslation();

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
            {onSuccess ? (
              <>
                <img src={success} alt="success" className="mb-[24px]" />
                <p className="font-poppins text-center mb-[20px] text-order-main font-semibold text-[24px] leading-[36px] ">
                  {t<string>("PAYMENT.THANK_YOU_MSSG")}
                </p>
                <h6 className="flex flex-row items-center gap-[6px] font-poppins text-top-playbook-title font-normal text-[16px] leading-[26px] tracking-[-0.1px]">
                  {t<string>("PAYMENT.YOUR_NUMBER")}{" "}
                  <span className=" font-poppins font-medium text-[20px] text-accent-pay-code">
                    567RFFL
                  </span>
                </h6>
              </>
            ) : (
              <>
                <img src={failure} alt="failure" className="mb-[24px]" />
                <p className="font-poppins text-center mb-[20px] text-order-main font-semibold text-[24px] leading-[36px] ">
                  {t<string>("PAYMENT.WRONG_MSSG")}
                </p>
                <h6 className="flex flex-row items-center gap-[6px] font-poppins text-top-playbook-title font-normal text-[16px] leading-[26px] tracking-[-0.1px]">
                  {t<string>("PAYMENT.UNSUCCESS_MSSG")}{" "}
                </h6>
              </>
            )}
          </div>
          <div className="min-w-full border-b-[1px] border-card-border border-solid "></div>

          {onSuccess ? (
            <div className="flex flex-col items-center gap-[4px] mb-[36px]">
              <span className="normal font-poppins text-center text-[16px] leading-[26px] font-normal tracking-[-0.1px] text-top-playbook-title">
                {t<string>("PAYMENT.CONFIRM_MSSG")}
              </span>
              <span className="normal font-poppins text-center text-[16px] leading-[21px] font-medium text-top-playbook-title">
                email.adress@com
              </span>
              <span className="normal font-poppins text-center text-[16px] leading-[26px] font-normal text-simple-text tracking-[-0.1px]">
                {t<string>("PAYMENT.CAUTION_MSSG")}
              </span>
            </div>
          ) : (
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
          )}
        </div>
        {onSuccess ? (
          <button
            className="min-w-full bg-buttons-bg px-[134px] py-[12px] shadow-payment-btn rounded-[6px]
      max-md:px-[62.5px]
      max-md:py-[12px]
      ">
            <span className="text-[16px] font-medim leading-[21px] font-poppins normal text-buttons-color">
              {t<string>("PAYMENT.VISIT_BTN")}
            </span>
          </button>
        ) : (
          <button
            className="min-w-full bg-buttons-bg px-[134px] py-[12px] shadow-payment-btn rounded-[6px]
        max-md:px-[62.5px]
        max-md:py-[12px]
        ">
            <span className="text-[16px] font-medim leading-[21px] font-poppins normal text-buttons-color">
              {t<string>("PAYMENT.AGAIN_BTN")}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;

import { useTranslation } from "react-i18next";

import success from "../../assets/photos/payment/success.svg";

const SuccessPayment = () => {
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
          </div>
          <div className="min-w-full border-b-[1px] border-card-border border-solid "></div>
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
        </div>
        <button
          className="min-w-full bg-buttons-bg px-[134px] py-[12px] shadow-payment-btn rounded-[6px]
      max-md:px-[62.5px]
      max-md:py-[12px]
      ">
          <span className="text-[16px] font-medim leading-[21px] font-poppins normal text-buttons-color">
            {t<string>("PAYMENT.VISIT_BTN")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;

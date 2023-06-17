import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import arrow from "../../assets/photos/payment/back-arrow.svg";
import paypal from "../../assets/photos/payment/paypal.svg";
import card from "../../assets/photos/payment/card.svg";
import lightning from "../../assets/photos/payment/lightning.svg";
import success from "../../assets/photos/payment/success.svg";
import note from "../../assets/photos/payment/note.svg";
import details from "../../assets/photos/payment/details.svg";
import playbook from "../../assets/photos/payment/playbook.svg";

const Payment = () => {
  const { t } = useTranslation();

  const formikForm = useFormik<{
    holder_name: string;
    card_number: string;
    expiry_date: string;
    cvv: string;
  }>({
    initialValues: {
      holder_name: "",
      card_number: "",
      expiry_date: "",
      cvv: "",
    },
    onSubmit: async (values: any) => {},
  });

  return (
    <section className="flex flex-row justify-between gap-[120px] mt-[33px] max-w-[1880px] px-[7vw] pb-[36px]">
      <div className="flex flex-col max-w-[587px]">
        <div className="flex flex-row gap-[10px] cursor-pointer">
          <img src={arrow} alt="" />
          <span className="text-[14px] text-buttons-bg font-poppins font-medium">
            {t<string>("PAYMENT.BACK")}
          </span>
        </div>
        <div className="flex flex-col gap-[24px] mt-[33px]">
          <span className="text-[20px] text-payment-title font-poppins font-medium leading-[28px]">
            {t<string>("PAYMENT.PAYMENT_TITLE")}
          </span>
          <div className="flex flex-col gap-[14px]">
            <div className="flex flex-row justify-between pl-[20px] pr-[16px] py-[18px] bg-create-bg-main rounded-[8px] border-[1px] border-header-bottom">
              <div className="flex flex-row items-center gap-[20px]">
                <div>
                  <img src={paypal} alt="" />
                </div>
                <span className="font-inter text-[16px] text-medium text-payment-title">
                  {t<string>("PAYMENT.PAYPAL")}
                </span>
              </div>
              <label>
                <input type="radio" name="method" />
                <span className="after:top-[5px] after:left-[4.8px] w-[10px] h-[10px] rounded-[50%] bg-payment-checkbox"></span>
              </label>
            </div>
            <div className="flex flex-row justify-between pl-[20px] pr-[16px] py-[18px] bg-create-bg-main rounded-[8px] border-[1px] border-header-bottom">
              <div className="flex flex-row items-center gap-[18px]">
                <div>
                  <img src={card} alt="" />
                </div>
                <span className="font-inter text-[16px] text-medium text-payment-title">
                  {t<string>("PAYMENT.CREDIT_OR_DEBIT_CARD")}
                </span>
              </div>
              <label>
                <input type="radio" name="method" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] mt-[32px]">
          <div className="flex flex-row gap-[30px] px-[26px] py-[35px] bg-create-bg-main rounded-[8px] border-[1px] border-header-bottom">
            <div className="min-w-[213px]">
              <div>
                <img className="w-[100%]" src={playbook} alt="" />
              </div>
              <div className="flex flex-row items-start p-[10px] bg-buttons-color border-header-bottom border-[1px] justify-between">
                <div className="flex flex-row gap-[13px] items-start">
                  <img src={note} alt="" />
                  <div>
                    <p className="text-[13px] font-poppins font-medium leading-[17px]">
                      Product Playbook
                    </p>
                    <span className="text-[9.8px] font-poppins leading-[15px] text-input-placeholder">
                      Draft • Edited 2 days ago
                    </span>
                  </div>
                </div>
                <button>
                  <img src={details} alt="" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-payment-second-title font-poppins font-medium leading-[18px]">
                {t<string>("PAYMENT.HAVE_TO_PAY")}
              </p>
              <h2 className="mt-[16px] font-bold font-poppins leading-[42px] text-payment-second-title">
                $139.50
              </h2>
              <div className="flex flex-row items-center gap-[8px] mt-[15px] mb-[10px]">
                <img src={success} alt="" />
                <span className="text-[16px] leading-[21px] font-medium font-poppins">
                  {t<string>("PAYMENT.PAYMENT_INVOICE")}
                </span>
              </div>
              <span className="font-poppins leading-[20px] text-simple-text">
                {t<string>("PAYMENT.PAY_DESCRIPTION")}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[16px]  rounded-[8px] p-[16px] border-[1px] bg-create-bg-main border-header-bottom">
            <img src={lightning} alt="" />
            <div>
              <p className="text-[16px] text-payment-second-title font-inter leading-[24px] font-medium">
                {t<string>("PAYMENT.YEAR_PLAN")}
              </p>
              <span className="text-[14px] mt-[6px] text-simple-text font-poppins leading-[20px] font-normal">
                {t<string>("PAYMENT.PLAN_DESC")}
              </span>
            </div>
            <button className="bg-buttons-color h-[41px] py-[10px] px-[16px] border-headeer-bottom border-[1px] rounded-[5px] text-payment-second-title text-[16px] font-poppins font-medium leading-[21px]">
              {t<string>("PAYMENT.CHANGE")}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[33px]">
        <div className="p-[36px] bg-create-bg-main rounded-[8px] border-[1px] border-header-bottom w-[100%]">
          <h2 className="text-payment-title font-semibold leading-[36px] font-poppins">
            {t<string>("PAYMENT.PAYMENT")}
          </h2>
          <form className="mt-[32px]" onSubmit={formikForm.handleSubmit}>
            <div className="flex flex-col gap-[24px]">
              <label className="flex flex-col gap-[6px]">
                {t<string>("PAYMENT.HOLDER_NAME")}
                <input
                  placeholder={t<string>("PAYMENT.FULL_NAME")}
                  className="border-border-input rounded-[5px] px-[16px] py-[7px] leading-[26px] outline-none border-[1px]"
                />
              </label>
              <label className="flex flex-col gap-[6px]">
                {t<string>("PAYMENT.CARD_NUMBER")}
                <input
                  placeholder="×××× ×××× ×××× ××××"
                  className="border-border-input rounded-[5px] px-[16px] py-[7px] leading-[26px] outline-none border-[1px]"
                />
              </label>
              <div className="flex flex-row gap-[12px]">
                <label className="flex flex-col gap-[6px]">
                  {t<string>("PAYMENT.EXPIRY_DATE")}
                  <input className="border-border-input rounded-[5px] px-[16px] py-[7px] leading-[26px] outline-none border-[1px]" />
                </label>
                <label className="flex flex-col gap-[6px]">
                  {t<string>("PAYMENT.CVV")}
                  <input
                    placeholder="×××"
                    className="border-border-input rounded-[5px] px-[16px] py-[7px] leading-[26px] outline-none border-[1px]"
                  />
                </label>
              </div>
              <div className="flex flex-row items-center">
                <label className="flex flex-col gap-[6px]">
                  {t<string>("PAYMENT.DISCOUNT_COUPON")}
                  <div className="flex flex-row items-center">
                    <input
                      placeholder={t<string>("PAYMENT.INPUT_TEXT")}
                      className="border-border-input rounded-tl-[5px] rounded-bl-[5px] px-[16px] py-[7px] leading-[26px] outline-none border-[1px]"
                    />
                    <button
                      className="bg-blue-light px-[16px] py-[9px] rounded-tr-[5px] border-[1px] border-border-apply rounded-br-[5px] text-buttons-bg font-inter font-semibold leading-[20px]"
                      type="button"
                    >
                      {t<string>("PAYMENT.APPLY")}
                    </button>
                  </div>
                </label>
              </div>
            </div>
            <button
              className="mt-[32px] py-[12px] rounded-[6px] w-[100%] text-[16px] text-buttons-color bg-buttons-bg font-medium font-poppins"
              type="submit"
            >
              {t<string>("PAYMENT.PAY_NOW")} $139.50
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;

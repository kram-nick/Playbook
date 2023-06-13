import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";

import useModal from "../../../core/hooks/useModal";
import { Data } from "../../../core/models";

import left_icon from "../../../assets/photos/main/left-arrow.svg";
import check_icon from "../../../assets/photos/main/check-light.svg";

const ModalPrivacy = () => {
  const { t } = useTranslation();

  const { closeModal } = useModal();

  const formikForm = useFormik<Data.Cookie>({
    initialValues: {
      experienced: false,
      necessary: false,
      measured: false,
    },
    //     validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {},
  });

  return (
    <form
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={formikForm.handleSubmit}
      className="modal-box relative w-[100%] max-w-[850px] p-[24px] shadow-free-trial rounded-[5px]
            border-[1px] border-solid border-border-btn bg-white font-poppins 
          flex flex-col items-center gap-[32px]
            max-md:m-[12px]            
            ">
      <div className="w-full flex justify-between items-center">
        <button className="shadow-tags border-solid border-[1px] rounded-[6px] border-header-bottom p-[12px]">
          <img src={left_icon} alt="left_icon" />
        </button>
        <button className="shadow-tags border-solid border-[1px] rounded-[6px] border-header-bottom py-[12px] px-[18px]">
          <span className="text-[16px] text-top-playbook-title font-poppins font-medium leading-[21px] normal">
            {t<string>("MODALS.FULL_COOKIES")}
          </span>
        </button>
      </div>
      <div className="w-full flex flex-col gap-[16px] justify-start">
        <h1 className="text-[32px] text-top-playbook-title font-poppins font-bold leading-[42px] normal">
          {t<string>("MODALS.PRIVACY_TITLE")}
        </h1>
        <span className="text-[16px] text-top-playbook-title font-poppins font-light leading-[26px] normal tracking-[-0.1px]">
          {t<string>("MODALS.PRIVACY_CONTENT_FIRST")}
        </span>
      </div>
      <div className="w-full flex flex-col gap-[16px] justify-start">
        <h4 className="text-[24px] text-top-playbook-title font-poppins font-semibold leading-[36px] normal">
          {t<string>("MODALS.PRIVACY_SUBTITLE")}
        </h4>
        <span className="text-[16px] text-top-playbook-title font-poppins font-light leading-[26px] normal tracking-[-0.1px]">
          {t<string>("MODALS.PRIVACY_CONTENT_SECOND")}
        </span>
      </div>
      <div className="w-full flex gap-[16px] flex-col">
        <div className="flex justify-between flex-row">
          <span className="text-[16px] font-medium text-home-title leading-[21px] font-poppins not-italic tracking-[-0.1px]">
            {t<string>("MODALS.PRIVACY_NECESSARY")}
          </span>
          <label>
            <span className="switch flex w-[34px] h-[20px]">
              <input
                type="checkbox"
                checked={formikForm.values.necessary}
                {...formikForm.getFieldProps("necessary")}
                // checked={!formikForm.values.chargeable}
                // onChange={(event) => {
                //   if (event.target.checked) {
                //     formikForm.setFieldValue("chargeable", false);
                //     FreeOfCharge();
                //   } else {
                //     formikForm.setFieldValue("chargeable", true);
                //   }
                // }}
                hidden
              />
              <span
                className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"></span>
            </span>
          </label>
        </div>
        <div className="flex justify-between flex-row">
          <span className="text-[16px] font-medium text-home-title leading-[21px] font-poppins not-italic tracking-[-0.1px]">
            {t<string>("MODALS.PRIVACY_EXPERIENCE")}
          </span>
          <label>
            <span className="switch flex w-[34px] h-[20px]">
              <input
                type="checkbox"
                checked={formikForm.values.experienced}
                {...formikForm.getFieldProps("experienced")}
                // checked={!formikForm.values.chargeable}
                // onChange={(event) => {
                //   if (event.target.checked) {
                //     formikForm.setFieldValue("chargeable", false);
                //     FreeOfCharge();
                //   } else {
                //     formikForm.setFieldValue("chargeable", true);
                //   }
                // }}
                hidden
              />
              <span
                className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"></span>
            </span>
          </label>
        </div>
        <div className="flex justify-between flex-row">
          <span className="text-[16px] font-medium text-home-title leading-[21px] font-poppins not-italic tracking-[-0.1px]">
            {t<string>("MODALS.PRIVACY_MEAUSERMENT")}
          </span>
          <label>
            <span className="switch flex w-[34px] h-[20px]">
              <input
                type="checkbox"
                checked={formikForm.values.measured}
                {...formikForm.getFieldProps("measured")}
                // checked={!formikForm.values.chargeable}
                // onChange={(event) => {
                //   if (event.target.checked) {
                //     formikForm.setFieldValue("chargeable", false);
                //     FreeOfCharge();
                //   } else {
                //     formikForm.setFieldValue("chargeable", true);
                //   }
                // }}
                hidden
              />
              <span
                className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"></span>
            </span>
          </label>
        </div>
      </div>
      <div
        className="w-full flex items-center justify-end gap-[16px]
          max-sm:justify-between
          ">
        <button
          onClick={closeModal}
          className="text-[16px] text-top-playbook-title font-poppins font-medium leading-[21px] normal
          px-[18px] py-[12px] rounded-[6px] shadow-purchase_btn border-[1px] border-header-bottom">
          {t<string>("MODALS.PRIVACY_PREFERENCES")}
        </button>
        <button
          type="submit"
          className=" bg-buttons-bg flex flex-row items-center gap-[6px] px-[18px] py-[12px] rounded-[6px] shadow-purchase_btn
                max-sm:px-[36.5px]
                ">
          <img src={check_icon} alt="check_icon" />
          <span className="text-[16px] font-poppins font-medium leading-[21px] text-buttons-color">
            {t<string>("MODALS.PRIVACY_ACCEPT")}
          </span>
        </button>
      </div>
    </form>
  );
};

export default ModalPrivacy;

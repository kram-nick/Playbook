import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logo from "../../assets/photos/sign/logo.svg";
import convert from "../../assets/photos/sign/convert.svg";
import arrow from "../../assets/photos/sign/reset-arrow.svg";
import back from "../../assets/photos/profile/back.svg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AuthService from "../../core/services/auth.service";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const valueFormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t<string>("ERRORS.EMAIL_REQUIRED"))
      .email(t<string>("ERRORS.INVALID_EMAIL")),
  });

  const formikForm = useFormik<{
    email: string;
  }>({
    initialValues: {
      email: "",
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: (values: any) => {
      HandleSubmit(values);
    },
  });

  const HandleSubmit = async (values: any) => {
    try {
      const response = await AuthService.ResetPassword({
        password_reset: values,
      });
      toast.success(response?.data?.received);
      setStep(2);
    } catch (errors: any) {
      toast.error(errors?.response?.data?.errors);
    }
  };

  return (
    <div className="flex mx-auto  min-h-[calc(100vh-102px)] font-poppins max-lg:min-h-[calc(100vh-61px)]">
      <div
        className="flex bg-cover bg-no-repeat bg-left-bottom justify-center  w-[46%] max-lg:bg-sign max-lg:w-[100%] 
        py-[50px] px-[100px] max-sm:px-[16px] max-sm:py-[24px]"
      >
        {step === 1 && (
          <form
            onSubmit={formikForm.handleSubmit}
            className="self-center w-full max-w-[425px] max-lg:bg-white 
              max-lg:px-[48px] max-lg:py-[60px] max-[690px]:px-[16px] max-[690px]:py-[32px] max-[690px]:rounded-[8px]
              max-[690px]:min-h-[calc(100vh-140px)] box-border"
          >
            <h1 className="text-[24px] text-home-title text-center leading-normal mb-[8px] font-semibold">
              {t<string>("SIGN.RESET_TITLE")}
            </h1>

            <p className="text-[16px] leading-[26px] text-center text-simple-text mb-[32px] max-[690px]:mb-[10vh]">
              {t<string>("SIGN.RESET_PASSTEXT")}
            </p>

            <div className="form-group mb-[24px]">
              <label
                htmlFor="email"
                className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
              >
                {t<string>("SIGN.EMAIL")}
              </label>
              <input
                placeholder={t<string>("SIGN.EMAIL_PLACEHOLDER")}
                id="email"
                type="email"
                className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder
                  border-solid border-[1px] shadow-free-trial w-[100%]
                  leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
                {...formikForm.getFieldProps("email")}
              />
              {formikForm.errors.email && formikForm.touched.email && (
                <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                  {formikForm.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-button-submit-footer py-[10px] px-[26px] rounded-[6px] 
              w-full mb-[24px]
              "
            >
              <span className="text-list-title">
                {t<string>("SIGN.CONTINUE")}
              </span>
            </button>
            <p className="text-center flex items-center justify-center">
              <Link
                to="/sign-in"
                className="flex items-center text-[14px] leading-[18px] text-buttons-bg font-medium gap-[6px]"
              >
                <img src={back} alt="" />
                {t<string>("SIGN.BACK")}
              </Link>
            </p>
          </form>
        )}
        {step === 2 && (
          <div
            className="self-center w-full max-w-[425px] max-lg:bg-white 
              max-lg:px-[48px] max-lg:py-[60px] max-[690px]:px-[16px] max-[690px]:py-[32px] max-[690px]:rounded-[8px]
              max-[690px]:min-h-[calc(100vh-140px)]"
          >
            <div className="table relative mx-[auto] mb-[45px]">
              <img
                src={arrow}
                className="w-[116px] absolute top-[46px] right-[98%]"
                alt=""
              />
              <img src={convert} className="w-[108px]" alt="" />
            </div>
            <h1 className="text-[24px] text-home-title text-center leading-normal mb-[32px] font-semibold">
              {t<string>("SIGN.CHECK_EMAIL")}
            </h1>

            <p className="text-[16px] leading-[26px] text-home-title mb-[24px] tracking-[-0.1px]">
              {t<string>("SIGN.CHECK_TEXT_BEFORE")}
              <b className="font-semibold"> {formikForm.values.email} </b>
              {t<string>("SIGN.CHECK_TEXT_AFTER")}
            </p>
            <p className="text-[16px] leading-[26px] text-home-title mb-[60px] tracking-[-0.1px]">
              {t<string>("SIGN.CHECK_VALID")}
            </p>

            <p className="mb-[16px]">
              <span className="text-[16px] leading-[26px] text-simple-text tracking-[-0.1px] mr-[12px]">
                {t<string>("SIGN.DIDNT_RECEIVE")}
              </span>
              <Link
                to="/sign-up"
                className="text-[14px] leading-[18px] text-buttons-bg font-medium inline-block"
              >
                {t<string>("SIGN.SUPPORT")}
              </Link>
            </p>
            <p>
              <span className="text-[16px] leading-[26px] text-simple-text tracking-[-0.1px] mr-[12px]">
                {t<string>("SIGN.TAKE_BACK")}
              </span>
              <Link
                to="/sign-in"
                className="text-[14px] leading-[18px] text-buttons-bg font-medium inline-block"
              >
                {t<string>("SIGN.LOGIN")}
              </Link>
            </p>
          </div>
        )}
      </div>
      <div className="flex bg-no-repeat bg-left-bottom bg-cover justify-center  bg-sign w-[54%] max-lg:hidden">
        <div className="text-center self-center">
          <p className="text-buttons-color uppercase text-[24px]  leading-normal mb-1">
            {t<string>("SIGN.WELCOME")}
          </p>
          <img src={logo} alt="logo" className="w-full max-w-[500px]" />
          <p className="mt-4 text-buttons-color text-[16px]  leading-normal tracking-[-0.1px]">
            {t<string>("SIGN.GET_STARTED")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

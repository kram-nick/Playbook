import React, { ReactNode, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import useModal from "../../../core/hooks/useModal";
import AuthService from "../../../core/services/auth.service";
import { toast } from "react-toastify";
import { hotjar } from "react-hotjar";

import icon_google from "../../../assets/photos/sign/g_logo.svg";
import icon_close from "../../../assets/photos/main/modal-close.svg";
import classNames from "classnames";
import { LogEvent } from "../../../core/constants/functions";
import ReCAPTCHA from "react-google-recaptcha";

interface ModalType {
  children?: ReactNode;
  class?: string;
}

export default function ModalSignup(props: ModalType) {
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const { t } = useTranslation();

  const { closeModal } = useModal();

  const valueFormValidationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(4, t<string>("ERRORS.MIN_4"))
      .required(t<string>("ERRORS.NOT_EMPTY")),
    last_name: Yup.string()
      .min(4, t<string>("ERRORS.MIN_4"))
      .required(t<string>("ERRORS.LAST_NAME_REQUIRED")),
    email: Yup.string()
      .required(t<string>("ERRORS.EMAIL_REQUIRED"))
      .email(t<string>("ERRORS.INVALID_EMAIL")),
    password: Yup.string()
      .min(8, t<string>("ERRORS.MIN_8"))
      .required(t<string>("ERRORS.PASSWORD_REQUIRED")),
    agree: Yup.boolean().isTrue(t<string>("ERRORS.AGREE_TERMS")),
  });

  const formikForm = useFormik<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    agree: boolean;
  }>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      agree: false,
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {
      HandleSubmitForm(values);
    },
  });

  const HandleGoogleSignIn = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await AuthService.LoginGoogle(
          codeResponse.access_token
        );
        localStorage.setItem(
          process.env.REACT_APP_TOKEN_KEY,
          response.data.data.token
        );

        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        LogEvent("registration", "google-sign-up");
        hotjar.event("google-sign-up");
        window.location.reload();
        closeModal();
      } catch (errors: any) {
        console.log(errors);
      }
    },
    flow: "implicit",
  });

  const HandleSubmitForm = async (values: any) => {
    try {
      const response = await AuthService.Create(
        values.first_name,
        values.last_name,
        values.email,
        values.password
      );

      if (response.data.data.token) {
        localStorage.setItem(
          process.env.REACT_APP_TOKEN_KEY,
          response.data.data.token
        );

        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        LogEvent("registration", "simple-sign-up");
        hotjar.event("sign-up");
        toast.success(t<string>("SIGN.CREATE_SUCCESS"));
      }
    } catch (errors: any) {
      toast.error(errors?.response?.data?.errors);
    }
  };

  const onChange = (value: any) => {
    setIsCaptchaDone(true);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-box relative w-[100%] max-w-[554px] px-[48px] py-[60px] shadow-free-trial 
              border-[1px] border-solid border-border-btn bg-white font-poppins max-[690px]:px-[16px] max-[690px]:h-[100vh]
              max-[690px]:flex"
    >
      <button className="absolute top-[35px] right-[8px] w-[40px] h-[40px] flex items-center">
        <img src={icon_close} alt="" onClick={closeModal} />
      </button>

      <form
        onSubmit={formikForm.handleSubmit}
        className="self-center w-full max-lg:bg-white "
      >
        <h1 className="text-[24px] text-home-title text-center leading-normal mb-[32px] font-semibold">
          {t<string>("SIGN.UP")}
        </h1>
        <button
          onClick={() => HandleGoogleSignIn()}
          type="button"
          className="flex justify-center w-full mb-[32px] py-[10px] px-[26px] 
                rounded-[5px] shadow-free-trial
                border-solid border-[1px]  border-r-header-bottom
              "
        >
          <img src={icon_google} alt="" className="mr-[8px]" />
          <span className="text-[16px] text-home-title font-medium">
            {t<string>("SIGN.GOOGLE")}
          </span>
        </button>

        <div className="text-center mb-[32px] flex justify-center items-center">
          <div className="flex-[1] bg-header-bottom h-[1px]"></div>
          <span className="text-[14px] leading-[20px] px-[12px] bg-white">
            {t<string>("SIGN.OR_UP")}
          </span>
          <div className="flex-[1] bg-header-bottom h-[1px]"></div>
        </div>

        <div className="form-group mb-[24px]">
          <label
            htmlFor="name"
            className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
          >
            {t<string>("SIGN.NAME")}
          </label>
          <input
            placeholder={t<string>("SIGN.NAME")}
            id="name"
            type="text"
            className={classNames({
              "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder border-solid border-[1px] shadow-free-trial w-[100%] leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border":
                true,
              "border-error-color":
                formikForm.errors.email && formikForm.errors.last_name,
            })}
            onChange={(event: any) => {
              const DividedName = event.target.value
                .split(" ")
                .map((value: string) => value.trim());
              formikForm.setFieldValue("first_name", DividedName[0]);
              formikForm.setFieldValue("last_name", DividedName[1]);
            }}
          />
          {formikForm.errors.first_name && formikForm.errors.last_name && (
            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
              {formikForm.errors.first_name}
            </p>
          )}
          {!formikForm.errors.first_name && formikForm.errors.last_name && (
            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
              {formikForm.errors.last_name}
            </p>
          )}
        </div>
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
            type="text"
            className={classNames({
              "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder border-solid border-[1px] shadow-free-trial w-[100%] leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border":
                true,
              "border-error-color":
                formikForm.errors.email && formikForm.touched.email,
            })}
            {...formikForm.getFieldProps("email")}
          />
          {formikForm.errors.email && formikForm.touched.email && (
            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
              {formikForm.errors.email}
            </p>
          )}
        </div>
        <div className="form-group mb-[24px]">
          <label
            htmlFor="password"
            className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
          >
            {t<string>("SIGN.PASSWORD")}
          </label>
          <input
            placeholder={t<string>("SIGN.PASSWORD_PLACEHOLDER")}
            id="password"
            type="text"
            className={classNames({
              "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder border-solid border-[1px] shadow-free-trial w-[100%] leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border":
                true,
              "border-error-color":
                formikForm.errors.password && formikForm.touched.password,
            })}
            {...formikForm.getFieldProps("password")}
          />
          {formikForm.errors.password && formikForm.touched.password && (
            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
              {formikForm.errors.password}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mb-[32px]">
          <div>
            <div className="flex">
              <input
                type="checkbox"
                id="remember-me"
                className="opacity-0 absolute h-[20px] w-[20px]"
                checked={formikForm.values.agree}
                onChange={(event: any) =>
                  formikForm.setFieldValue("agree", event.target.checked)
                }
              />
              <div
                className="bg-white border-[1px] border-input w-[20px] h-[20px] mr-[8px] rounded-[5px] cursor-pointer flex 
                    flex-shrink-0 justify-center items-center focus-within:border-blue-500"
              >
                <svg
                  className="fill-current hidden w-[20px] h-[20px] p-[4px] rounded-[5px] pointer-events-none"
                  version="1.1"
                  viewBox="0 0 17 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <g
                      transform="translate(-9 -11)"
                      fill="#fff"
                      fillRule="nonzero"
                    >
                      <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                    </g>
                  </g>
                </svg>
              </div>
              <label
                htmlFor="remember-me"
                className="text-[16px] leading-[20px] tracking-[-0.1px] cursor-pointer"
              >
                {t<string>("SIGN.AGREE")}
              </label>
            </div>
            {formikForm.errors.agree && formikForm.touched.agree && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.agree}
              </p>
            )}
          </div>
        </div>
        <ReCAPTCHA
          style={{
            zIndex: 20,
          }}
          sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
          onChange={onChange}
        />
        <button
          type="submit"
          className="bg-button-submit-footer py-[10px] px-[26px] rounded-[6px] 
              w-full mb-[24px] mt-[20px]"
        >
          <span className="text-list-title">{t<string>("SIGN.UP_BTN")}</span>
        </button>
        <p className="">
          <span className="text-[16px] leading-[26px] text-simple-text tracking-[-0.1px] mr-[12px]">
            {t<string>("SIGN.HAVE")}
          </span>
          <Link
            to="/sign-in"
            className="text-[14px] leading-[18px] text-buttons-bg font-medium"
          >
            {t<string>("SIGN.LOGIN")}
          </Link>
        </p>
      </form>
    </div>
  );
}

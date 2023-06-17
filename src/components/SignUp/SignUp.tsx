import { useState } from "react";
import { PrivateUIRoutes } from "../../core/router";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { hotjar } from "react-hotjar";

import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import AuthService from "../../core/services/auth.service";
import classNames from "classnames";

import logo from "../../assets/photos/sign/logo.svg";
import icon_google from "../../assets/photos/sign/g_logo.svg";
import icon_hide from "../../assets/icon-hide.svg";
import icon_show from "../../assets/icon-show.svg";
import { LogEvent } from "../../core/constants/functions";
import ReCAPTCHA from "react-google-recaptcha";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const [hide, setHide] = useState(true);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const valueFormValidationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(4, t<string>("ERRORS.MIN_4"))
      .required(t<string>("ERRORS.FIRST_NAME_REQUIRED")),
    last_name: Yup.string()
      .min(4, t<string>("ERRORS.MIN_4"))
      .required(t<string>("ERRORS.LAST_NAME_REQUIRED")),
    email: Yup.string()
      .required(t<string>("ERRORS.EMAIL_REQUIRED"))
      .email(t<string>("ERRORS.INVALID_EMAIL")),
    password: Yup.string()
      .min(8, t<string>("ERRORS.MIN_8"))
      .required(t<string>("ERRORS.PASSWORD_REQUIRED")),
  });

  const formikForm = useFormik<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
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

        if (response.data.data.token) {
          setTimeout(() => {
            setLoading(false);
            navigate(`/${PrivateUIRoutes.Main}`);
          }, 300);
        }
      } catch (errors: any) {
        console.log(errors);
      }
    },
    flow: "implicit",
  });

  const HandleSubmitForm = async (values: any) => {
    setLoading(true);
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
        setTimeout(() => {
          setLoading(false);
          // navigate('/' + UIRoutes.SIGN_IN);
          navigate(`/${PrivateUIRoutes.Main}`);
        }, 200);
      }
    } catch (errors: any) {
      setLoading(false);
      toast.error(errors?.response?.data?.errors);
    }
  };

  const onChange = (value: any) => {
    setIsCaptchaDone(true);
  };

  return (
    <div className="flex mx-auto  min-h-[calc(100vh-102px)] font-poppins max-lg:min-h-[calc(100vh-61px)]">
      <div
        className="flex bg-cover bg-no-repeat bg-left-bottom justify-center  w-[46%] max-lg:bg-sign max-lg:w-[100%] 
        py-[50px] px-[100px] max-sm:px-[16px] max-sm:py-[24px]"
      >
        <form
          onSubmit={formikForm.handleSubmit}
          className="self-center w-full max-w-[425px] max-lg:bg-white 
          max-lg:px-[48px] max-lg:py-[60px] max-sm:px-[16px] max-sm:py-[24px] max-sm:rounded-[8px]"
        >
          <h1 className="text-[24px] text-home-title text-center leading-normal mb-[32px] font-semibold">
            {t<string>("SIGN.UP")}
          </h1>

          <button
            onClick={() => HandleGoogleSignIn()}
            className="flex justify-center w-full mb-[32px] py-[10px] px-[26px] 
            rounded-[5px] shadow-free-trial
            border-solid border-[1px]  border-r-header-bottom
          "
            type="button"
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
              htmlFor="first_name"
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
            >
              {t<string>("SIGN.FIRST_NAME")}
            </label>
            <input
              onChange={formikForm.handleChange}
              value={formikForm.values.first_name}
              placeholder={t<string>("SIGN.FIRST_NAME")}
              id="first_name"
              name="first_name"
              type="text"
              className={classNames({
                "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder border-solid border-[1px] shadow-free-trial w-[100%]":
                  true,
                "leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border":
                  true,
                "border-error-color":
                  formikForm.errors.first_name && formikForm.touched.first_name,
              })}
            />
            {formikForm.errors.first_name && formikForm.touched.first_name && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.first_name}
              </p>
            )}
          </div>

          <div className="form-group mb-[24px]">
            <label
              htmlFor="last_name"
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
            >
              {t<string>("SIGN.LAST_NAME")}
            </label>
            <input
              onChange={formikForm.handleChange}
              value={formikForm.values.last_name}
              placeholder={t<string>("SIGN.LAST_NAME")}
              id="last_name"
              name="last_name"
              type="text"
              className={classNames({
                "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder border-solid border-[1px] shadow-free-trial w-[100%]":
                  true,
                "leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border":
                  true,
                "border-error-color":
                  formikForm.errors.last_name && formikForm.touched.last_name,
              })}
            />
            {formikForm.errors.last_name && formikForm.touched.last_name && (
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
              onChange={formikForm.handleChange}
              value={formikForm.values.email}
              placeholder={t<string>("SIGN.EMAIL_PLACEHOLDER")}
              id="email"
              name="email"
              type="email"
              className={classNames({
                "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder border-solid border-[1px] shadow-free-trial w-[100%]":
                  true,
                "leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border":
                  true,
                "border-error-color":
                  formikForm.errors.email && formikForm.touched.email,
              })}
            />
            {formikForm.errors.email && formikForm.touched.email && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.email}
              </p>
            )}
          </div>

          <div className="form-group mb-[24px] relative">
            <label
              htmlFor="password"
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
            >
              {t<string>("SIGN.PASSWORD")}
            </label>
            <input
              onChange={formikForm.handleChange}
              value={formikForm.values.password}
              placeholder={t<string>("SIGN.PASSWORD_PLACEHOLDER")}
              id="password"
              type={hide ? "password" : "text"}
              name="password"
              className={classNames({
                "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder border-solid border-[1px] shadow-free-trial w-[100%]":
                  true,
                "leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border":
                  true,
                "border-error-color":
                  formikForm.errors.password && formikForm.touched.password,
              })}
            />
            <button
              type="button"
              onClick={() => setHide(!hide)}
              className="absolute right-[9px] top-[31px] w-[30px] h-[30px] rounded-[50%] p-[5px] hover:bg-search-input
              transition-all duration-[300ms] ease-out hover:ease-in"
            >
              <img src={hide ? icon_hide : icon_show} alt="" />
            </button>
            {formikForm.errors.password && formikForm.touched.password && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.password}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center mb-[32px]">
            <div className="flex">
              <input
                type="checkbox"
                id="remember-me"
                className="opacity-0 absolute h-[20px] w-[20px]"
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
                  <g fill="none">
                    <g transform="translate(-9 -11)" fill="#fff">
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
          </div>

          <ReCAPTCHA
            style={{
              zIndex: 20,
            }}
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_SECRET}
            onChange={onChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={classNames({
              "py-[10px] px-[26px] rounded-[6px] w-full mb-[24px] mt-[20px]":
                true,
              "bg-simple-text cursor-not-allowed": loading,
              "bg-button-submit-footer hover:bg-buttons-bg-hover active:bg-buttons-bg-active":
                !loading,
            })}
          >
            <span className="text-list-title">{t<string>("SIGN.UP_BTN")}</span>
          </button>

          <p className="">
            <span className="text-[16px] leading-[26px] text-simple-text tracking-[-0.1px] mr-[12px]">
              {t<string>("SIGN.HAVE")}
            </span>
            <Link
              to="/sign-in"
              className="text-[14px] leading-[18px] text-buttons-bg  hover:text-buttons-bg-hover active:text-buttons-bg-active font-medium"
            >
              {t<string>("SIGN.LOGIN")}
            </Link>
          </p>
        </form>
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

export default SignIn;

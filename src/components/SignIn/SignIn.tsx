import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useGoogleLogin } from "@react-oauth/google";
import { PrivateUIRoutes } from "../../core/router";

import * as Yup from "yup";
import classNames from "classnames";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/photos/sign/logo.svg";
import icon_hide from "../../assets/icon-hide.svg";
import icon_google from "../../assets/photos/sign/g_logo.svg";
import icon_show from "../../assets/icon-show.svg";

import AuthService from "../../core/services/auth.service";

const SignIn = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  // localStorage.setItem(
  //   process.env.REACT_APP_TOKEN_KEY,
  //   response.data.payload.token
  // );

  // console.log(process.env.REACT_APP_TOKEN_KEY);
  const valueFormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t<string>("ERRORS.EMAIL_REQUIRED"))
      .email(t<string>("ERRORS.INVALID_EMAIL")),
    password: Yup.string()
      .min(8, t<string>("ERRORS.MIN_8"))
      .required(t<string>("ERRORS.PASSWORD_REQUIRED")),
  });

  const formikForm = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {
      handleSubmitForm(values);
    },
  });

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await AuthService.loginGoogle(
          codeResponse.access_token
        );
        localStorage.setItem(
          process.env.REACT_APP_TOKEN_KEY,
          response.data.data.token
        );

        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        if (response.data.data.token) {
          setTimeout(() => {
            setLoading(false);
            navigate("/" + PrivateUIRoutes.Main);
          }, 300);
        }
      } catch (errors: any) {
        console.log(errors);
      }
    },
    flow: "implicit",
  });

  const handleSubmitForm = async (values: any) => {
    setLoading(true);
    try {
      const response = await AuthService.login(values.email, values.password);

      localStorage.setItem(
        process.env.REACT_APP_TOKEN_KEY,
        response.data.data.token
      );

      const user = response.data.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      // dispatch(setIsAuth(true));

      // document.body.style.overflowY = "scroll";
      // dispatch(setModal(false));
      // toast.success(t<string>("SIGN.LOGIN_SUCCESS"));
      if (response.data.data.token) {
        setTimeout(() => {
          setLoading(false);
          navigate("/" + PrivateUIRoutes.Main);
        }, 300);
      }
      // if(
      //   response?.data?.payload.role === "admin" ||
      //   response?.data?.payload.role === "super_admin"
      // ) {
      //   if (
      //     !location.pathname.split("/").includes("banks-rating") &&
      //     !location.pathname.split("/").includes("calculator")
      //   ) {
      //     navigate(/${UIRoutes.ADMIN}/${PrivateUIRoutes.ADMIN_PANEL});
      //   }
      // } else {
      //   if (
      //     !location.pathname.split("/").includes("banks-rating") &&
      //     !location.pathname.split("/").includes("calculator")
      //   ) {
      //     navigate(/${UIRoutes.ACCOUNT}/${UIRoutes.PROFILE});
      //   }
      // }
    } catch (errors: any) {
      console.log(errors);
      setLoading(false);
      //     CommonService.showErrors(errors?.response?.data?.payload);
      // toast.error(errors?.response?.data?.errors);
      toast.error(errors?.response?.data?.errors);
    }
  };
  // {...formikForm.getFieldProps("comment")}

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
            {t<string>("SIGN.IN")}
          </h1>

          <button
            onClick={() => handleGoogleSignIn()}
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
              {t<string>("SIGN.OR")}
            </span>
            <div className="flex-[1] bg-header-bottom h-[1px]"></div>
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
                "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder border-solid border-[1px] shadow-free-trial w-[100%]":
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
                "py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder border-solid border-[1px] shadow-free-trial w-[100%] pr-[46px]":
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
                {t<string>("SIGN.KEEP_ME")}
              </label>
            </div>

            <Link
              to="/reset-password"
              className="text-[14px] leading-[18px] text-buttons-bg font-medium"
            >
              {t<string>("SIGN.FORGOT")}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={classNames({
              "py-[10px] px-[26px] rounded-[6px] w-full mb-[24px]": true,
              "bg-simple-text cursor-not-allowed": loading,
              "bg-button-submit-footer": !loading,
            })}
          >
            <span className="text-list-title">{t<string>("SIGN.IN")}</span>
          </button>
          <p className="">
            <span className="text-[16px] leading-[26px] text-simple-text tracking-[-0.1px] mr-[12px]">
              {t<string>("SIGN.DONT_HAVE")}
            </span>
            <Link
              to="/sign-up"
              className="text-[14px] leading-[18px] text-buttons-bg font-medium"
            >
              {t<string>("SIGN.REGISTER")}
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

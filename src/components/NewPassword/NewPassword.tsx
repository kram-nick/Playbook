import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import logo from "../../assets/photos/sign/logo.svg";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import AuthService from "../../core/services/auth.service";
import { UIRoutes } from "../../core/router";
import useSearchParams from "../../core/hooks/useSearchParams";

const NewPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { searchedParam } = useSearchParams();

  useHttpGet<any>(
    `${APIRoutes.RESET_PASSWORD}/validate?token=${searchedParam("token")}`,
    {
      resolve: (response) => {
        if (response && new Date() > new Date(response?.data?.data?.status)) {
          navigate(`/${UIRoutes.RESET_PASSWORD}`);
        }
      },
      reject: (response) => {
        navigate(`/${UIRoutes.RESET_PASSWORD}`);
        toast.error(response?.response?.data?.errors);
      },
      dependencies: [],
    }
  );

  const valueFormValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t<string>("ERRORS.NOT_EMPTY"))
      .min(8, t<string>("ERRORS.MIN_8")),
    confirm_password: Yup.string()
      .required(t<string>("ERRORS.NOT_EMPTY"))
      .oneOf([Yup.ref("password")], t<string>("ERRORS.NOT_MATCH_PASSWORD")),
    agree: Yup.boolean().isTrue(t<string>("ERRORS.AGREE_TERMS")),
  });

  const formikForm = useFormik<{
    password: string;
    confirm_password: string;
    agree: boolean;
  }>({
    initialValues: {
      password: "",
      confirm_password: "",
      agree: false,
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: (values: any) => {
      HandleSubmit(values);
    },
  });

  const HandleSubmit = async (values: any) => {
    try {
      const response = await AuthService.NewPassword({
        token: searchedParam("token"),
        password: values.password,
      });
      toast.success(response?.data?.received);
      navigate(`/${UIRoutes.SIGN_IN}`);
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
        <form
          onSubmit={formikForm.handleSubmit}
          className="self-center w-full max-w-[425px] max-lg:bg-white 
          max-lg:px-[48px] max-lg:py-[60px] max-[690px]:px-[16px] max-[690px]:py-[32px] max-[690px]:rounded-[8px]
          max-[690px]:min-h-[calc(100vh-140px)]"
        >
          <h1 className="text-[24px] text-home-title text-center leading-normal mb-[8px] font-semibold">
            {t<string>("SIGN.CREATE_PASSWORD")}
          </h1>

          <p className="text-[16px] leading-[26px] text-center text-simple-text mb-[32px] max-[690px]:mb-[10vh]">
            {t<string>("SIGN.CREATE_PASSTEXT")}
          </p>

          <div className="form-group mb-[24px]">
            <label
              htmlFor="password"
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
            >
              {t<string>("SIGN.NEW_PASSWORD")}
            </label>
            <input
              placeholder={t<string>("SIGN.PASSWORD_PLACEHOLDER")}
              id="password"
              type="password"
              className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder
              border-solid border-[1px] shadow-free-trial w-[100%]
              leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
              {...formikForm.getFieldProps("password")}
            />
            {formikForm.errors.password && formikForm.touched.password && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.password}
              </p>
            )}
          </div>
          <div className="form-group mb-[24px]">
            <label
              htmlFor="password"
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
            >
              {t<string>("SIGN.REPEAT_PASSWORD")}
            </label>
            <input
              placeholder={t<string>("SIGN.CONFIRM_PASSWORD_PLACEHOLDER")}
              type="password"
              className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder
              border-solid border-[1px] shadow-free-trial w-[100%]
              leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
              {...formikForm.getFieldProps("confirm_password")}
            />
            {formikForm.errors.confirm_password &&
              formikForm.touched.confirm_password && (
                <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                  {formikForm.errors.confirm_password}
                </p>
              )}
          </div>

          <div className="flex justify-between items-center mb-[32px]">
            <div>
              <div className="flex">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="opacity-0 absolute h-[20px] w-[20px] cursor-pointer"
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

          <button
            className="bg-button-submit-footer py-[10px] px-[26px] rounded-[6px] 
           w-full mb-[24px]
          "
          >
            <span className="text-list-title">
              {t<string>("SIGN.CONTINUE")}
            </span>
          </button>
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

export default NewPassword;

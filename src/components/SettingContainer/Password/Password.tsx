import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import PlaybookService from "../../../core/services/playbook.service";
import AuthService from "../../../core/services/auth.service";

const Password = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const valueFormValidationSchema = Yup.object().shape({
    current_password: Yup.string().required(t<string>("ERRORS.NOT_EMPTY")),
    new_password: Yup.string()
      .required(t<string>("ERRORS.NOT_EMPTY"))
      .min(8, t<string>("ERRORS.MIN_8")),
    confirm_password: Yup.string()
      .required(t<string>("ERRORS.NOT_EMPTY"))
      .oneOf([Yup.ref("new_password")], t<string>("ERRORS.NOT_MATCH_PASSWORD")),
  });

  const formikForm = useFormik<{
    current_password: string;
    new_password: string;
    confirm_password: string;
  }>({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: (values: any) => {
      HandleChangePassword(values);
    },
  });

  const HandleChangePassword = async (values: any) => {
    const { current_password, new_password } = values;
    try {
      await AuthService.ChangePassword({ current_password, new_password });
      toast.success(t<string>("ERRORS.PASSWORD_CHANGED"));
      formikForm.resetForm();
    } catch (errors: any) {
      toast.error(t<string>("ERRORS.CHANGE_PASSWORD_FAILED"));
    }
  };

  return (
    <form
      className="form font-poppins relative max-[1024px]:pb-[60px]"
      onSubmit={formikForm.handleSubmit}
    >
      <div className="flex items-start justify-between pb-[20px] border-b-[1px] border-solid border-header-bottom gap-[20px] mb-[24px]">
        <div className="">
          <h3 className="text-[20px] leading-[28px] font-medium text-home-title mb-[4px]">
            {t<string>("SETTINGS.PASSWORD")}
          </h3>
          <p className="tracking-[-0.1px] text-[14px] leading-[20px] text-simple-text">
            {t<string>("SETTINGS.TAB_2_TEXT")}
          </p>
        </div>
        <div className="flex items-center gap-[16px]  max-[1024px]:absolute right-[0] bottom-[0px]">
          <button
            className="min-w-[130px] h-[38px] flex items-center justify-center px-[15px] bg-white rounded-[5px] text-home-title
            text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]
            hover:bg-secondary-hover
      active:bg-secondary-active
            "
            onClick={() => {
              navigate("/");
            }}
          >
            {t<string>("BTNS.CANCEL")}
          </button>
          <button
            type="submit"
            className="min-w-[130px] h-[38px] flex items-center justify-center px-[15px] bg-buttons-bg rounded-[5px] text-buttons-color 
              text-[16px] font-medium leading-[20px] shadow-free-trial 
              hover:bg-buttons-bg-hover
                active:bg-buttons-bg-active
              "
          >
            {t<string>("BTNS.SAVE")}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
        max-[690px]:mb-[6px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.CURRENT_PASSWORD")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%]">
          <input
            className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder
            border-solid border-[1px] border-header-bottom shadow-free-trial w-[100%]
            leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            {...formikForm.getFieldProps("current_password")}
          />
          {formikForm.errors.current_password &&
            formikForm.touched.current_password && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.current_password}
              </p>
            )}
        </div>
      </div>

      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
        max-[690px]:mb-[6px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.NEW_PASSWORD")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%]">
          <input
            type="password"
            className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder
            border-solid border-[1px] bg-banner-txt border-header-bottom shadow-free-trial w-[100%]
            leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            {...formikForm.getFieldProps("new_password")}
          />
          {formikForm.errors.new_password &&
            formikForm.touched.new_password && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.new_password}
              </p>
            )}
          <p className="font-poppins mt-[6px] text-simple-text">
            {t<string>("SETTINGS.TAB_1_TEXT")}
          </p>
        </div>
      </div>

      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
        max-[690px]:mb-[6px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.CONFIRM_PASSWORD")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%]">
          <input
            type="password"
            className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-placeholder
            border-solid border-[1px] bg-banner-txt border-header-bottom shadow-free-trial w-[100%]
            leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            {...formikForm.getFieldProps("confirm_password")}
          />
          {formikForm.errors.confirm_password &&
            formikForm.touched.confirm_password && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.confirm_password}
              </p>
            )}
          <p className="font-poppins mt-[6px] text-simple-text">
            {t<string>("SETTINGS.TAB_2_TEXT")}
          </p>
        </div>
      </div>
    </form>
  );
};

export default Password;

import * as Yup from "yup";
import classNames from "classnames";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import icon_add from "../../../assets/photos/main/plus-upload.svg";
import upload from "../../../assets/photos/main/upload.svg";
import { toast } from "react-toastify";
import { Data } from "../../../core/models";
import { useAppDispatch } from "../../../core/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import useHttpGet from "../../../core/hooks/useHttpGet";
import { APIRoutes } from "../../../core/http";
import { setUser } from "../../../core/store/reducers/account/accountDataSlice";
import PlaybookService from "../../../core/services/playbook.service";
import { selectStyles } from "../../../core/constants";
export interface selectOption {
  readonly value: string;
  readonly label: string;
}

export const timesOptions: readonly selectOption[] = [
  { value: "EST", label: "Eastern Standart Time (EST)" },
  { value: "PST", label: "Pacific Standard Time (PST)" },
  { value: "EET", label: "Eastern European Time (EET)" },
];
export const countryOptions: readonly selectOption[] = [
  { value: "UKR", label: "UKR" },
  { value: "USA", label: "USA" },
  { value: "CA", label: "CA" },
  { value: "UK", label: "UK" },
  { value: "PL", label: "PL" },
];

const Account = () => {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState<null | File>(null);
  const [updateReloader, setUpdateReloader] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const valueFormValidationSchema = Yup.object().shape({
    first_name: Yup.string().required(t<string>("ERRORS.NOT_EMPTY")),
    last_name: Yup.string().required(t<string>("ERRORS.NOT_EMPTY")),
    username: Yup.string().required(t<string>("ERRORS.NOT_EMPTY")),
  });

  const { fetchedData: userInfo } = useHttpGet<any>(APIRoutes.USERS_ACCOUNT, {
    resolve: (response: any) => {
      if (response) {
        dispatch(setUser(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        for (let key in response?.data) {
          if (formikForm.values.hasOwnProperty(key)) {
            formikForm.setFieldValue(key, response?.data[key]);
          }
        }
      }
    },
    dependencies: [updateReloader],
  });

  const formikForm = useFormik<{
    first_name: string;
    last_name: string;
    username: string;
    profile_image: string;
    email: string;
    timezone: string;
    country_code: string;
    title: string;
    bio: string;
  }>({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      profile_image: "",
      email: "",
      timezone: "",
      country_code: "",
      title: "",
      bio: "",
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {
      delete values.email;

      for (let item in values) {
        if (values[item] !== userInfo.data[item]) {
          HandleSubmit({
            ...values,
            profile_image: profileImage || values.profile_image,
          });
          return;
        }
      }

      toast.warn(t<string>("ERRORS.NOT_UPDATED"));
    },
  });

  const HandleSubmit = async (values: Data.UserAccount) => {
    try {
      await PlaybookService.UpdateUserAccount(values);
      toast.success(t<string>("ERRORS.ACCOUNT_UPDATED"));
      setUpdateReloader(!updateReloader);
    } catch (errors: any) {
      for (let error in errors?.response?.data?.errors) {
        toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
      }
    }
  };

  const PhotoUploader = (file: File) => {
    if (file) {
      setProfileImage(file);
      const fileUrl = URL.createObjectURL(file);
      formikForm.setFieldValue("profile_image", fileUrl);
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
            {t<string>("SETTINGS.PERSONAL_DATA")}
          </h3>
          <p className="tracking-[-0.1px] text-[14px] leading-[20px] text-simple-text">
            {t<string>("SETTINGS.TAB_1_TEXT")}
          </p>
        </div>
        <div className="flex items-center gap-[16px]  max-[1024px]:absolute right-[0] bottom-[0px]">
          <button
            className="min-w-[130px] h-[38px] flex items-center justify-center px-[15px] bg-white rounded-[5px] text-home-title
                text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
            onClick={() => {
              navigate("/");
            }}
          >
            {t<string>("BTNS.CANCEL")}
          </button>
          <button
            type="submit"
            className="min-w-[130px] h-[38px] flex items-center justify-center px-[15px] bg-buttons-bg rounded-[5px] text-buttons-color 
                  text-[16px] font-medium leading-[20px] shadow-free-trial "
          >
            {t<string>("BTNS.SAVE")}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-[32px] justify-between max-w-[824px]">
        <div className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px] max-[690px]:hidden">
          {t<string>("SETTINGS.NAME")}
        </div>

        <div className="grid grid-cols-2 gap-x-[24px] min-[691px]:max-w-[512px] w-[100%] max-[690px]:grid-cols-1">
          <label
            htmlFor=""
            className="min-[691px]:hidden text-[14px] text-home-title leading-[20px] mb-[6px] tracking-[-0.1px]"
          >
            {t<string>("SETTINGS.FIRST_NAME")}
          </label>
          <div>
            <input
              placeholder={t<string>("SETTINGS.FIRST_NAME")}
              className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] border-header-bottom shadow-free-trial max-[690px]:w-[100%] leading-[18px] font-normal 
                font-poppins text-[16px] tracking-[-0.01px] outline-none box-border max-[690px]:mb-[20px]"
              {...formikForm.getFieldProps("first_name")}
            />
            {formikForm.errors.first_name && formikForm.touched.first_name && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.first_name}
              </p>
            )}
          </div>

          <label
            htmlFor=""
            className="min-[691px]:hidden text-[14px] text-home-title leading-[20px] mb-[6px] tracking-[-0.1px]"
          >
            {t<string>("SETTINGS.LAST_NAME")}
          </label>
          <div>
            <input
              placeholder={t<string>("SETTINGS.LAST_NAME")}
              className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] border-header-bottom shadow-free-trial max-[690px]:w-[100%]
                leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
              {...formikForm.getFieldProps("last_name")}
            />
            {formikForm.errors.last_name && formikForm.touched.last_name && (
              <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
                {formikForm.errors.last_name}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
            max-[690px]:mb-[6px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.USERNAME")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%]">
          <input
            placeholder={t<string>("SETTINGS.USERNAME")}
            className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] border-header-bottom shadow-free-trial w-[100%]
                leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            {...formikForm.getFieldProps("username")}
          />
          {formikForm.errors.username && formikForm.touched.username && (
            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color">
              {formikForm.errors.username}
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
          {t<string>("SETTINGS.EMAIL")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%]">
          <input
            disabled
            placeholder={t<string>("SETTINGS.EMAIL")}
            className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] bg-banner-txt border-header-bottom shadow-free-trial w-[100%]
                leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            {...formikForm.getFieldProps("email")}
          />
        </div>
      </div>
      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[1024px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
            max-[1024px]:mb-[20px]"
        >
          {t<string>("SETTINGS.PHOTO")}
          <p className="leading-[20px] font-normal mt-[4px] text-simple-text">
            {t<string>("SETTINGS.PHOTO_TEXT")}
          </p>
        </div>

        <div
          className="flex items-start gap-[20px] max-w-[512px] w-[100%] max-[1024px]:max-w-[100%] max-[1024px]:items-center
               max-[1024px]:justify-between max-[690px]:flex-wrap"
        >
          <div className="flex flex-col items-center">
            {formikForm.values.profile_image ? (
              <div
                className="
                w-[80px] h-[80px] rounded-[50%] overflow-hidden"
              >
                <img
                  className="w-[100%] h-[100%] object-cover"
                  src={formikForm.values.profile_image}
                  alt=""
                />
              </div>
            ) : (
              <div
                className="photo relative bg-center bg-no-repeat bg-without-photo 
              bg-top-entrepreneur w-[80px] h-[80px] rounded-[50%] "
              ></div>
            )}
            <button
              onClick={() => formikForm.setFieldValue("profile_image", "")}
              type="button"
              className="flex items-center justify-center px-[15px] bg-white rounded-[5px] text-home-title
                text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px] mt-[4px]"
            >
              {t<string>("SETTINGS.REMOVE")}
            </button>
          </div>
          <label
            className="px-[24px] py-[24px] border-[1px] border-solid border-header-bottom bg-white 
                rounded-[18px] cursor-pointer w-[calc(100%-100px)] max-[1024px]:hidden"
          >
            <div className="w-[40px] h-[40px] ml-[auto] mr-[auto] mb-[16px]">
              <img src={icon_add} alt="" />
            </div>
            <p className="text-center text-[14px] tracking-[-0.1px] font-normal leading-[20px] text-simple-text mb-[4px]">
              <span className="mr-[5px] font-medium text-buttons-bg">
                {t<string>("FIELDS.CLICK_UPLOAD")}
              </span>
              {t<string>("FIELDS.DROP")}
            </p>
            <p className="text-center text-[14px] tracking-[-0.1px] font-normal leading-[20px] text-simple-text">
              {t<string>("SETTINGS.PHOTO_SIZE")}
            </p>
            <input
              className="hidden"
              type="file"
              onChange={(event: any) => PhotoUploader(event.target.files[0])}
            />
          </label>
          <label
            className="cursor-pointer hidden max-[1024px]:flex items-center justify-center bg-white rounded-[6px] px-[15px]
                shadow-free-trial w-[calc(100%-100px)] max-w-[512px] h-[45px] border-[1px] border-solid border-header-bottom
                gap-[6px] text-[16px] font-medium max-[690px]:w-[100%] max-[690px]:max-w-[100%]"
          >
            <input
              className="hidden"
              type="file"
              onChange={(event: any) => PhotoUploader(event.target.files[0])}
            />
            <img src={upload} alt="" />
            {t<string>("SETTINGS.UPLOAD")}
          </label>
        </div>
      </div>
      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
            max-[690px]:mb-[6px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.ROLE")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%]">
          <input
            placeholder={t<string>("SETTINGS.ROLE")}
            className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] border-header-bottom shadow-free-trial w-[100%]
                leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            {...formikForm.getFieldProps("title")}
          />
        </div>
      </div>
      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
            max-[690px]:mb-[6px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.COUNTRY")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%] cursor-pointer">
          <Select
            className="select-custom h-[44px] cursor-pointer"
            options={countryOptions}
            styles={selectStyles}
            value={countryOptions.find(
              (el: selectOption) => el.value === formikForm.values.country_code
            )}
            onChange={(value: any) => {
              formikForm.setFieldValue("country_code", value.value);
            }}
          />
        </div>
      </div>
      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
            max-[690px]:mb-[6px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.TZONE")}
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%] cursor-pointer">
          <Select
            className="select-custom h-[44px] cursor-pointer"
            options={timesOptions}
            styles={selectStyles}
            value={timesOptions.find(
              (el: selectOption) => el.value === formikForm.values.timezone
            )}
            onChange={(value: any) => {
              formikForm.setFieldValue("timezone", value.value);
            }}
          />
        </div>
      </div>
      <div className="line my-[20px] h-[1px] bg-header-bottom"></div>

      <div className="flex items-start gap-x-[32px] justify-between max-w-[824px] max-[690px]:flex-wrap">
        <div
          className="max-w-[280px] font-medium text-home-title text-[14px] leading-[18px] tracking-[-0.1px]
            max-[690px]:mb-[20px] max-[690px]:font-normal"
        >
          {t<string>("SETTINGS.BIO")}
          <p className="leading-[20px] font-normal mt-[4px] text-simple-text">
            {t<string>("SETTINGS.BIO_TEXT")}
          </p>
        </div>

        <div className="max-w-[512px] w-[100%] max-[690px]:max-w-[100%] flex">
          <textarea
            placeholder={t<string>("SETTINGS.BIO")}
            className="h-[190px] px-[16px] py-[12px] rounded-[5px]  
                placeholder:text-input-paceholder resize-none
                border-solid border-[1px] border-header-bottom shadow-free-trial w-[100%]
                leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            {...formikForm.getFieldProps("bio")}
          ></textarea>
        </div>
      </div>
      <div className="line my-[20px] h-[1px] bg-header-bottom max-[1024px]:mb-[0px] max-[690px]:hidden"></div>
    </form>
  );
};

export default Account;

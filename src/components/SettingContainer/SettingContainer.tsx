import * as Yup from "yup";
import classNames from "classnames";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { selectStyles, SettingsTabs } from "../../core/constants";
import icon_add from "../../assets/photos/main/plus-upload.svg";
import upload from "../../assets/photos/main/upload.svg";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
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

const MainContent = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(SettingsTabs[0]);

  const valueFormValidationSchema = Yup.object().shape({
    email: Yup.string().email(t<string>("ERRORS.INVALID_EMAIL")),
  });

  useHttpGet<any>(APIRoutes.USERS_ACCOUNT, {
    resolve: (response: any) => {
      console.log(response?.data);
      if (response) {
        for (let key in response?.data) {
          response?.data[key]
            ? formikForm.setFieldValue(key, response?.data[key])
            : formikForm.setFieldValue(key, "");
        }
      }
    },
    query: {},
    dependencies: [],
  });

  const formikForm = useFormik<{
    first_name: string;
    last_name: string;
    email: string;
    bio: string;
    timezone: string;
    country_code: string;
    profile_image: string;
    title: string;
  }>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
      timezone: "",
      country_code: "",
      profile_image: "",
      title: "",
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {
      // handleSubmitForm(values);
    },
  });

  console.log(formikForm.values.country_code);

  return (
    <>
      <h1 className="font-poppins text-[24px] leading-normal font-semibold text-home-title mb-[24px]">
        {t<string>("SETTINGS.TITLE")}
      </h1>

      <div
        className="flex items-end gap-[24px] border-b-[1px] border-solid border-header-bottom mb-[32px]
        max-[690px]:overflow-x-auto max-[690px]:whitespace-nowrap max-[690px]:ml-[-16px] max-[690px]:mr-[-16px]
        max-[690px]:w-[calc(100%+32px)] max-[690px]:pb-[1px] max-[690px]:px-[15px]"
      >
        {SettingsTabs.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => setActiveTab(item)}
            className={classNames({
              "text-buttons-bg font-medium": activeTab.id === index + 1,
              "text-nav-txt-private": activeTab.id !== index + 1,
              "tracking-[-0.1px] relative transition duration-150 ease-in text-[16px] leading-[24px] cursor-pointer pt-[7px] pb-[11px]":
                true,
            })}
          >
            {item.title}
            <div
              className={classNames({
                "w-[100%]": activeTab.id === index + 1,
                "w-[0%]": activeTab.id !== index + 1,
                "absolute bottom-[-1px] left-[-1px] h-[2px] transition duration-300 ease-in bg-buttons-bg":
                  true,
              })}
            ></div>
          </div>
        ))}
      </div>

      {activeTab.id === 1 && (
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
              <input
                placeholder={t<string>("SETTINGS.FIRST_NAME")}
                className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] border-header-bottom shadow-free-trial max-[690px]:w-[100%] leading-[18px] font-normal 
                font-poppins text-[16px] tracking-[-0.01px] outline-none box-border max-[690px]:mb-[20px]"
                {...formikForm.getFieldProps("first_name")}
              />

              <label
                htmlFor=""
                className="min-[691px]:hidden text-[14px] text-home-title leading-[20px] mb-[6px] tracking-[-0.1px]"
              >
                {t<string>("SETTINGS.LAST_NAME")}
              </label>
              <input
                placeholder={t<string>("SETTINGS.LAST_NAME")}
                className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] border-header-bottom shadow-free-trial max-[690px]:w-[100%]
                leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
                {...formikForm.getFieldProps("last_name")}
              />
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
                placeholder={t<string>("SETTINGS.EMAIL")}
                className="h-[44px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
                border-solid border-[1px] border-header-bottom shadow-free-trial w-[100%]
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
              {formikForm.values.profile_image ? (
                <div
                  className="relative 
                w-[80px] h-[80px] rounded-[50%]"
                >
                  <img
                    className="w-[100%] h-[100%] rounded-[50%] object-cover"
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
              <div
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
              </div>
              <div
                className="cursor-pointer hidden max-[1024px]:flex items-center justify-center bg-white rounded-[6px] px-[15px]
                shadow-free-trial w-[calc(100%-100px)] max-w-[512px] h-[45px] border-[1px] border-solid border-header-bottom
                gap-[6px] text-[16px] font-medium max-[690px]:w-[100%] max-[690px]:max-w-[100%]"
              >
                <img src={upload} alt="" />
                {t<string>("SETTINGS.UPLOAD")}
              </div>
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
                  (el: selectOption) =>
                    el.value === formikForm.values.country_code
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
      )}
    </>
  );
};

export default MainContent;

import { useState, useEffect } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useModal from "../../../core/hooks/useModal";
import { colourOptions, colourStyles } from "../../../core/constants";
import PlaybookService from "../../../core/services/playbook.service";
import { PrivateUIRoutes } from "../../../core/router";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/useRedux";
import { setReloadChecker } from "../../../core/store/reducers/helpers/helpersDataSlice";
import useHttpGet from "../../../core/hooks/useHttpGet";
import { APIRoutes } from "../../../core/http";

import icon_banner from "../../assets/photos/main/icon-banner.svg";
import icon_add from "../../assets/photos/main/icon-smiley.svg";
import icon_close from "../../../assets/photos/main/modal-close.svg";

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export default function ModalPlaybookDetail() {
  const [activeColor, setActiveColor] = useState<any>(null);
  const [playbook, setPlaybook] = useState<any>(null);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { sharedData, sharedId, reloadChecker, playbookType } = useAppSelector(
    (state) => state.helpers
  );
  const { closeModal } = useModal();

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${sharedId}`, {
    query: {},
    dependencies: [reloadChecker],
    resolve: (repsonse) => {
      setPlaybook(repsonse?.data);
      setActiveColor(
        colourOptions.find(
          (color) => repsonse?.data?.color_code === color?.color
        )
      );
    },
  });

  useEffect(() => {
    if (playbook && playbookType === "edit") {
      for (let prop in playbook) {
        if (playbook[prop] !== null) {
          formikForm.setFieldValue(prop, playbook[prop]);
        } else {
          formikForm.setFieldValue(prop, "");
        }
      }
    }
  }, [playbook]);

  const formikForm = useFormik<{
    id: string;
    name: string;
    content: string;
    color_code: string;
    header_url: string;
    icon_url: string;
    favorited: boolean;
    privacy: boolean | any;
    category_id: number | string;
    status: string;
    order: string;
    url: string;
  }>({
    initialValues: {
      id: "",
      name: "",
      content: "",
      color_code: "",
      header_url:
        "https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/1618602532707-3OAII3QVHYKCW3KJ1HJU/cars_boast.jpg",
      icon_url: "https://cdn-icons-png.flaticon.com/512/4436/4436481.png",
      favorited: false,
      privacy: false,
      category_id: 0,
      status: "",
      order: "",
      url: "",
    },
    // validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {
      HandleSubmitForm(values);
    },
  });

  const HandleSubmitForm = (values: any) => {
    if (playbookType === "create") {
      createPlaybook(values);
    } else {
      updatePlaybook(values);
    }
  };

  const handlePrivate = async () => {
    const privacy =
      formikForm.values.privacy === "private" ? "public" : "private";

    try {
      await PlaybookService.ChangePrivacy({ privacy }, formikForm.values.id);

      dispatch(setReloadChecker(!reloadChecker));
      toast.success(t<string>("MAIN.UPDATE_PRIVACY_SUCCESS"));
    } catch (errors: any) {
      formikForm.setFieldValue("privacy", !formikForm.values.privacy);
      for (let error in errors?.response?.data?.errors) {
        toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
      }
    }
  };

  // useEffect(() => {
  //   if (sharedData?.id) {
  //     formikForm.setValues(sharedData);
  //     formikForm.setFieldValue(
  //       "privacy",
  //       sharedData.privacy === ("private" || true) ? true : false
  //     );

  //     if (sharedData?.color_code) {
  //       const color = colourOptions.find(
  //         (el: any) => el.color === sharedData.color_code
  //       );
  //       setActiveColor(color);
  //     }
  //   } else {
  //     setActiveColor(colourOptions[1]);
  //   }
  // }, [sharedData]);

  const updatePlaybook = async (values: any) => {
    try {
      await PlaybookService.UpdatePlaybook(values);
      dispatch(setReloadChecker(!reloadChecker));
      toast.success(t<string>("MAIN.UPDATE_SUCCESS"));
      closeModal();
    } catch (errors: any) {
      for (let error in errors?.response?.data?.errors) {
        toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
      }
    }
  };

  const createPlaybook = async (values: any) => {
    try {
      const response = await PlaybookService.CreatePlaybook(values);
      navigate(`/${PrivateUIRoutes.Chapters}/${response.data.data.id}`);
      dispatch(setReloadChecker(!reloadChecker));
      toast.success(t<string>("MAIN.CREATE_SUCCESS"));
      closeModal();
    } catch (errors: any) {
      for (let error in errors?.response?.data?.errors) {
        toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
      }
    }
  };

  return (
    <div
      className="modal-overlay bg-overlay max-sm:overflow-y-auto max-sm:items-start"
      onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box relative w-[100%] max-w-[530px] px-[24px] pt-[24px] shadow-free-trial 
                border-[1px] border-solid border-border-btn bg-white font-poppins
                max-sm:min-h-[100vh] max-sm:px-[16px] max-sm:py-[16px] max-sm:pb-[80px] max-sm:max-w-[100%]">
        <div className="flex items-center justify-between mb-[24px]">
          <p
            className="text-[20px] font-medium text-home-title leading-[26px] tracking-[-0.1px]
                  max-sm:text-[16px] max-sm:leading-[22px] max-sm:pl-[28px]">
            {playbookType === "edit" ? "Edit Details" : "Add a Playbook"}
          </p>
          <button className="absolute top-[16px] right-[16px] max-sm:right-[auto] max-sm:top-[6px] max-sm:left-[6px]">
            <img src={icon_close} alt="" onClick={closeModal} />
          </button>
        </div>

        <form
          onSubmit={formikForm.handleSubmit}
          className="form grid gap-y-[16px] mb-[24px]">
          <div className="form-group flex flex-wrap">
            <label
              htmlFor=""
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]">
              {t<string>("FIELDS.NAME")}
            </label>
            <input
              placeholder={t<string>("FIELDS.NAME")}
              onChange={formikForm.handleChange}
              value={formikForm.values.name}
              id="name"
              name="name"
              type="text"
              className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-border-input
                    border-solid border-[1px] shadow-free-trial min-w-[100%]
                    leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
              // onChange={(e) => setName(e.target.value)}
              // value={props.item ? props.item.title : ""}
            />
          </div>

          <div className="form-group flex flex-wrap">
            <label
              htmlFor=""
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]">
              {t<string>("FIELDS.DESCRIPTION")}
            </label>
            <textarea
              onChange={formikForm.handleChange}
              value={formikForm.values.content}
              id="content"
              name="content"
              placeholder={t<string>("FIELDS.DESCRIPTION")}
              className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-border-input
                  border-solid border-[1px] shadow-free-trial min-w-[100%] h-[105px] resize-none
                  leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"></textarea>
          </div>
          <div className="form-group">
            <label
              htmlFor=""
              className="block text-[14px] text-home-title leading-[20px] mb-[6px]">
              {t<string>("FIELDS.COLOR")}
            </label>

            <Select
              className="select-custom h-[40px]"
              defaultValue={activeColor}
              options={colourOptions}
              styles={colourStyles}
              onChange={(option) => {
                formikForm.setFieldValue("color_code", option.color);
                setActiveColor(option);
              }}
            />
          </div>
          {/* <div className="flex items-center rounded-[4px] bg-gray-btn px-[8px] py-[6px] gap-[6px] cursor-pointer">
                  <img src={icon_banner} alt="" />
                  <span className="text-[14px] tracking-[-0.01px] leading-[20px]">
                    {t<string>("FIELDS.ADD_COVER")}
                  </span>
                </div>
                <div
                  onClick={handleIconsModal}
                  className="flex items-center rounded-[4px] bg-gray-btn px-[8px] py-[6px] gap-[6px] cursor-pointer">
                  <img src={icon_add} alt="" />
                  <span className="text-[14px] tracking-[-0.01px] leading-[20px]">
                    {t<string>("FIELDS.ADD_ICON")}
                  </span>
                </div> */}

          <label className="flex items-center  w-[100%] justify-between">
            <span className="text-[16px] text-home-title leading-[20px]">
              {t<string>("FIELDS.ADD_TO_F")}
            </span>
            <span className="switch flex w-[34px] h-[20px]">
              <input
                type="checkbox"
                hidden
                value={Number(formikForm.values.favorited)}
                onChange={(e) => {
                  if (+e.target.value) {
                    formikForm.setFieldValue("favorited", false);
                  } else {
                    formikForm.setFieldValue("favorited", true);
                  }
                }}
                checked={formikForm.values.favorited}
                id="favorited"
                name="favorited"
              />
              <span
                className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"
              />
            </span>
          </label>
          <label className="flex items-center  w-[100%] justify-between">
            <span className="text-[16px] text-home-title leading-[20px]">
              {t<string>("FIELDS.PRIVATE")}
            </span>
            <span className="switch flex w-[34px] h-[20px]">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                value={formikForm.values.privacy}
                checked={formikForm.values.privacy === "private"}
                onChange={(e) => {
                  if (playbookType === "edit") {
                    handlePrivate();
                    closeModal();
                  }
                  e.target.value === "private"
                    ? formikForm.setFieldValue("privacy", "public")
                    : formikForm.setFieldValue("privacy", "private");
                }}
                hidden
              />
              <span
                className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"></span>
            </span>
          </label>

          <div
            className="grid grid-cols-2 font-poppins gap-[16px] max-sm:absolute max-sm:bottom-[24px] 
                  max-sm:left-[16px] max-sm:right-[16px]">
            <button
              className="h-[46px] flex items-center justify-center 
                      py-[8px] px-[15px] bg-white rounded-[5px] text-home-title
                      text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
              title="Cancel"
              onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit"
              className="h-[46px] flex items-center justify-center  
                      py-[8px] px-[15px] bg-buttons-bg rounded-[5px] text-buttons-color 
                      text-[16px] font-medium leading-[20px] shadow-free-trial ">
              {sharedData ? "Save" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import { toast } from "react-toastify";

import useModal from "../../../core/hooks/useModal";
import { Data } from "../../../core/models";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/useRedux";
import { APIRoutes } from "../../../core/http";
import useHttpGet from "../../../core/hooks/useHttpGet";
import PlaybookService from "../../../core/services/playbook.service";
import {
  setReloadChecker,
  setSharedId,
} from "../../../core/store/reducers/helpers/helpersDataSlice";

import icon_close from "../../../assets/photos/main/modal-close.svg";
import icon_star from "../../../assets/photos/main/star.svg";
import check from "../../../assets/photos/main/check.svg";
import arrowDown from "../../../assets/photos/home/arrow-down.svg";
import delete_icon from "../../../assets/photos/main/close-cross.svg";
import plus from "../../../assets/photos/modals/plus.svg";

const ModalSale = () => {
  const [playbook, setPlaybook] = useState<Data.Playbook>();
  const [thumbnail, setThumbnail] = useState<null | File>(null);
  const [tags, setTags] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [tagItem, setTagItem] = useState({
    text: "",
    active: false,
  });
  const [selectedType, setSelectedType] = useState(true);

  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { sharedId, reloadChecker } = useAppSelector((state) => state.helpers);

  const user: Data.UserAccount = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    formikForm.setFieldValue("playbook_id", playbook?.id);
    formikForm.setFieldValue("name", playbook?.name);
    formikForm.setFieldValue("content", playbook?.content);

    return () => {
      formikForm.resetForm();
    };
  }, [sharedId]);

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${sharedId}`, {
    dependencies: [],
    resolve: (response) => {
      setPlaybook(response?.data);
    },
  });

  useHttpGet<any>(`${APIRoutes.TAGS}`, {
    dependencies: [tagItem],
    resolve: (response) => {
      setTags(
        response?.data?.filter((tag: Data.Tag) =>
          tag.name
            .toLocaleLowerCase()
            .includes(tagItem.text.toLocaleLowerCase())
        )
      );
    },
  });

  const valueFormValidationSchema = Yup.object().shape({
    chargeable: Yup.boolean(),
    name: Yup.string().required(t<string>("ERRORS.NAME_REQUIRED")),
    content: Yup.string().required(t<string>("ERRORS.CONTENT_REQUIRED")),
    sale_price: Yup.number().when("chargeable", {
      is: true,
      then: (schema) => schema.min(1, t<string>("ERRORS.SALE_PRICE")),
    }),
    retail_price: Yup.number().when("chargeable", {
      is: true,
      then: (schema) => schema.min(1, t<string>("ERRORS.RETAIL_PRICE")),
    }),
    discount_price: Yup.number(),
    tags: Yup.array().min(1, t<string>("ERRORS.TAGS")),
    agree: Yup.boolean().isTrue(t<string>("ERRORS.AGREE_TERMS")),
  });

  const formikForm = useFormik<{
    playbook_id: string;
    name: string;
    content: string;
    status: string;
    tags: Data.Tag[];
    chargeable: boolean;
    discount_price: number | string;
    retail_price: number;
    sale_price: number;
    thumbnail_url: string;
  }>({
    initialValues: {
      playbook_id: "",
      name: "",
      content: "",
      status: "live",
      tags: [],
      chargeable: true,
      discount_price: 0,
      retail_price: 0,
      sale_price: 0,
      thumbnail_url: "",
    },
    validationSchema: valueFormValidationSchema,
    onSubmit: async (values: any) => {
      AddListing(values);
    },
  });

  const AddListing = async (values: any) => {
    const tags_ids = values.tags.map((tag: Data.Tag) => tag.id);

    if (!values.chargeable) {
      delete values.discount_price;
      delete values.retail_price;
      delete values.sale_price;
    }

    try {
      await PlaybookService.AddListing({
        ...values,
        playbook_id: playbook?.id,
        tags: tags_ids,
        thumbnail_url: thumbnail || "",
      });
      dispatch(setSharedId(0));
      dispatch(setReloadChecker(!reloadChecker));
      closeModal();
      toast.success(t<string>("MAIN.UPDATE_PRIVACY_SUCCESS"));
    } catch (errors: any) {
      for (let error in errors?.response?.data?.errors) {
        toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
      }
    }
  };

  const ClearDescription = () => {
    setPlaybook((prev: any) => {
      return {
        ...prev,
        content: "",
      };
    });
  };

  const RemoveTag = (selectedTag: any) => {
    const tagsArr = formikForm.values.tags.filter(
      (tag: Data.Tag) => tag.id !== selectedTag.id
    );

    if (tagsArr) {
      formikForm.setFieldValue("tags", [...tagsArr]);
    }
  };

  const FreeOfCharge = () => {
    formikForm.setFieldValue("discount_price", 0);
    formikForm.setFieldValue("retail_price", 0);
    formikForm.setFieldValue("sale_price", 0);
  };

  const countValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = +event.target.value;
    const regex = /^\d+$/;

    if (!regex.test(event.target.value)) {
      formikForm.setFieldValue(type, 0);
    } else {
      if (value === 0 || value < 0) {
        formikForm.setFieldValue(type, 0);
      } else {
        formikForm.setFieldValue(type, value);
      }
    }
  };

  const ThumbnailUploader = (file: File) => {
    if (file) {
      setThumbnail(file);
      const fileUrl = URL.createObjectURL(file);
      formikForm.setFieldValue("thumbnail_url", fileUrl);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setTagItem({ ...tagItem, active: false });
      }}
      className="modal-box relative w-[100%] max-w-[839px] p-[24px] shadow-free-trial rounded-[5px]
                border-[1px] border-solid border-border-btn bg-white font-poppins 
              flex flex-col items-center
                max-md:m-[12px]
                ">
      {selectedType ? (
        <div>
          <div
            className="w-full flex justify-between items-center mb-[20px]
              max-md:mb-[15px]
              ">
            <span className="leading-[28px] tracking-[-0.1px] text-[20px] font-normal font-poppins text-footer-main">
              {t<string>("MODALS.LIST_TITLE")}
            </span>
            <button type="button" onClick={closeModal}>
              <img src={icon_close} alt="close" />
            </button>
          </div>
          <div className="w-full flex flex-row gap-[24px] mb-[12px]">
            <span className="text-[16px] font-semibold leading-[21px] text-footer-main font-poppins min-w-[244px]">
              {t<string>("MODALS.THUMBNAIL")}
            </span>
            <span className="text-[16px] font-semibold leading-[21px] text-footer-main font-poppins ">
              {t<string>("MODALS.DETAILS")}
            </span>
          </div>
          <div
            className="mb-[24px] flex flex-row items-start gap-[24px] justify-between w-full
                max-md:flex-col
                max-md:mb-[19px]
              ">
            <div
              className="relative rounded-[5px] border-[0.718421px] border-solid border-header-bottom flex flex-col gap-[11.49px]
                items-start p-[11.1px] min-w-[244px]
                max-md:w-full
                ">
              <div className="flex flex-col items-start gap-[2.87px] w-full">
                <h4 className="text-[16px] font-semibold normal leading-[21px] text-footer-main font-poppins">
                  {`${playbook?.name.slice(0, 15)}...`}
                </h4>
                <div className="flex flex-row items-center gap-[7.18px]">
                  <img
                    src={user?.profile_image}
                    alt="avatar"
                    className="w-[14.8px] h-[14.8px] object-cover rounded-[50px]"
                  />
                  <span className="text-[12px] normal font-poppins font-normal leading-[26px] tracking-[-0.1px] text-input-paceholder">
                    {user.first_name} {user.last_name}
                  </span>
                </div>
              </div>
              <img
                src={formikForm.values.thumbnail_url || playbook?.header_url}
                alt="card"
                className="max-md:w-full h-[148px] w-[222px] object-cover"
              />
              <div className="flex flex-row items-center gap-[4.93px] max-md:w-full">
                <button
                  type="button"
                  className="flex justify-center min-w-[188.7px]  
             bg-blue-light shadow-get_free rounded-[3.7px] border-[0.62px] h-[28.37px] text-[14px] font-poppins font-normal items-center self-stretch not-italic leading-[21px] text-buttons-bg 
             max-md:min-w-[90%]
             ">
                  {t<string>("MODALS.FREE_BTN")}
                </button>
                <button
                  type="button"
                  className="min-w-[28.37px] min-h-[28.37px] p-[7.4px] sahdow-payment-btn border-[0.62px] rounded-[3.7px] border-header-bottom flex items-center justify-center
            max-md:min-w-[10%]
            max-md:h-[28.37px]
            ">
                  <img src={icon_star} alt="icon_star" />
                </button>
              </div>
              <button
                onClick={() => setSelectedType(false)}
                type="button"
                className="absolute left-0 bottom-[-28px] text-[16px] text-buttons-bg font-medium tracking-[-0.1px] leading-[18px]">
                {t<string>("MODALS.CHANGE_THUMB")}
              </button>
            </div>
            <form
              onSubmit={formikForm.handleSubmit}
              className="flex flex-col gap-[24px] justify-between min-w-[486px] w-full
        max-md:flex-col
        max-md:mb-[19px]
        max-sm:min-w-[325px]
        ">
              <div className="flex flex-col gap-[16px]">
                <label className="flex flex-col gap-[6px]">
                  <span className="text-[14px] text-home-title font-light leading-[24px]">
                    {t<string>("MODALS.NAME")}
                  </span>
                  <input
                    disabled
                    type="text"
                    value={playbook?.name}
                    onChange={(event) => {
                      setPlaybook((prev: any) => {
                        return {
                          ...prev,
                          name: event.target.value,
                        };
                      });
                    }}
                    className="outline-none border-[1px] border-solid border-border-input rounded-[4px] px-[16px] py-[7px]
                text-[16px] font-poppins font-normal tracking-[-0.1px] leading-[26px]
                "
                  />
                  {formikForm.errors.name && formikForm.touched.name && (
                    <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color pl-[4px]">
                      {formikForm.errors.name}
                    </p>
                  )}
                </label>

                <label className="flex flex-col gap-[6px]">
                  <p className="flex w-full justify-between">
                    <span className="text-[14px] text-home-title font-light leading-[20px]">
                      {t<string>("MODALS.DESCRIPTION")}
                    </span>
                    <button
                      type="button"
                      onClick={ClearDescription}
                      className="text-[14px] text-input-paceholder font-medium leading-[20px]">
                      {t<string>("MODALS.CLEAR")}
                    </button>
                  </p>

                  <textarea
                    className="outline-none resize-none border-[1px] border-solid border-border-input rounded-[4px] px-[16px] py-[7px]
                text-[16px] font-poppins font-normal tracking-[-0.1px] leading-[26px] h-[132px]
                "
                    disabled
                    onChange={(event) => {
                      setPlaybook((prev: any) => {
                        return {
                          ...prev,
                          content: event.target.value,
                        };
                      });
                    }}
                    value={playbook?.content}
                  />
                  {formikForm.errors.content && formikForm.touched.content && (
                    <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color pl-[4px]">
                      {formikForm.errors.content}
                    </p>
                  )}
                </label>

                <label className="relative flex flex-col gap-[6px]">
                  <p>
                    <span className="text-[14px] text-home-title font-light leading-[20px]">
                      {t<string>("MODALS.TAGS")}
                    </span>{" "}
                    <span className="text-[14px] text-input-paceholder font-light leading-[20px]">
                      {t<string>("MODALS.MAX_TAG")}
                    </span>
                  </p>

                  <input
                    className={classNames({
                      "max-w-full pl-[12px] overflow-x-auto outline-none border-[1px] border-solid border-border-input rounded-[4px] pr-[16px] py-[7px] text-[16px] font-poppins font-normal tracking-[-0.1px] leading-[26px]":
                        true,
                      //   "pl-[12px]": formikForm.values.tags.length === 0,
                      //   "pl-[185px]": formikForm.values.tags.length === 1,
                      //   "pl-[320px]": formikForm.values.tags.length === 2,
                      //   "pl-[75%]": formikForm.values.tags.length >= 3,
                    })}
                    type="text"
                    value={tagItem.text}
                    onChange={(event) => {
                      setTagItem({ ...tagItem, text: event.target.value });
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      setTagItem({
                        ...tagItem,
                        active: true,
                      });
                    }}
                  />
                  <div className="scroll-visible max-w-[95%] overflow-x-scroll absolute left-[18px] right-[12px] flex-nowrap top-[40px] flex flex-row items-center gap-[8px]">
                    {formikForm.values.tags.map(
                      (tag: Data.Tag, index: number) => {
                        return (
                          <label
                            className="flex items-center flex-row gap-[6px] min-w-max px-[12px] py-[4px] border-solid rounded-[100px] bg-selected-btn"
                            key={tag.id}>
                            <span className="font-poppins normal font-light text-[12px] leading-[16px]">
                              {tag.name}
                            </span>
                            <img
                              className="cursor-pointer"
                              onClick={() => RemoveTag(tag)}
                              src={delete_icon}
                              alt="delete_icon"
                            />
                          </label>
                        );
                      }
                    )}
                  </div>
                  {tagItem.active && (
                    <ul className="w-full shadow-tags rounded-[4px] border-[1px] border-solid border-header-bottom">
                      {tags.map((tag: Data.Tag) => (
                        <li
                          onClick={() => {
                            const sameTag = formikForm.values.tags.find(
                              (currTag) => currTag.id === tag.id
                            );

                            const tagsArr = [
                              ...formikForm.values.tags.filter(
                                (tagCurr) => tag.id !== tagCurr.id
                              ),
                            ];
                            if (tagsArr) {
                              tagsArr.unshift(tag);
                              formikForm.setFieldValue("tags", [...tagsArr]);
                            }
                            if (sameTag) {
                              RemoveTag(sameTag);
                            }
                          }}
                          className="flex justify-between px-[16px] py-[10px] hover:bg-chapter-color"
                          key={tag.id}>
                          <span className="font-light text-[14px] normal leading-[20px] font-poppins tracking-[-0.1px] text-home-title">
                            {tag.name}{" "}
                          </span>
                          {formikForm.values.tags.find(
                            (newTag: Data.Tag) => tag.id === newTag.id
                          ) && <img src={check} alt="selected" />}
                        </li>
                      ))}
                    </ul>
                  )}
                  {formikForm.errors.tags && formikForm.touched.tags && (
                    <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color pl-[4px]">
                      {t<string>("ERRORS.TAGS")}
                    </p>
                  )}
                </label>

                <label
                  className={classNames({
                    "flex flex-col gap-[6px]": true,
                    "mt-[-100px] z-[-1]": tagItem.active,
                  })}>
                  <span className="text-[14px] text-home-title font-light leading-[20px]">
                    {t<string>("MODALS.VISIBILITY")}
                  </span>
                  <div className="relative border-[1px] border-solid border-border-input rounded-[4px]  min-h-[26px]">
                    <button
                      type="button"
                      className="w-full flex justify-between items-center px-[16px] py-[7px]"
                      onClick={() => {
                        //     setShowDrop(!showDrop);
                      }}>
                      {formikForm.values.status || t<string>("MODALS.SELECT")}
                      <img src={arrowDown} alt="arrowDown" />
                    </button>
                    {showDrop && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowDrop(!showDrop);
                        }}
                        className="cursor-pointer absolute left-[0px] bottom-[-30px] w-[520px] bg-blue-600 z-20 flex flex-col items-start">
                        {/* {tags.map((tag: Data.Tag) => ( */}
                        <span className="px-[16px] py-[7px] text-[14px] text-home-title font-light leading-[20px]">
                          {formikForm.values.status}
                        </span>
                        {/* ))} */}
                      </button>
                    )}
                  </div>
                  {/* <input
                type="text"
                {...formikForm.getFieldProps("status")}
                className="outline-none 
                text-[16px] font-poppins font-normal tracking-[-0.1px] leading-[26px]
                "
              /> */}
                </label>
              </div>
              <div className="w-full border-[1px] border-solid border-header-bottom" />
              <div className="flex flex-col gap-[16px]">
                <div className="flex justify-between flex-row w-full">
                  <span className="text-[16px] font-semibold text-home-title leading-[21px] font-poppins not-italic">
                    {t<string>("MODALS.PRICE")}
                  </span>
                  <label className="flex items-center gap-[16px]">
                    <span className="text-[16px] text-home-title leading-[20px]">
                      {t<string>("MODALS.SHARE")}
                    </span>
                    <span className="switch flex w-[34px] h-[20px]">
                      <input
                        type="checkbox"
                        checked={!formikForm.values.chargeable}
                        onChange={(event) => {
                          if (event.target.checked) {
                            formikForm.setFieldValue("chargeable", false);
                            FreeOfCharge();
                          } else {
                            formikForm.setFieldValue("chargeable", true);
                          }
                        }}
                        hidden
                      />
                      <span
                        className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"></span>
                    </span>
                  </label>
                </div>
                {formikForm.values.chargeable && (
                  <>
                    <div className="w-full flex justify-between flex-row gap-[16px]">
                      <label className="w-full flex flex-col gap-[6px] flex-1">
                        <span className="text-[14px] text-home-title font-light leading-[20px]">
                          {t<string>("MODALS.RETAIL")}
                        </span>
                        <label className="relative w-full">
                          <input
                            type="text"
                            value={formikForm.values.retail_price}
                            onChange={(event) => {
                              countValidation(event, "retail_price");
                            }}
                            className="w-full outline-none border-[1px] border-solid border-border-input rounded-[4px] px-[16px] py-[7px]
                  text-[16px] font-poppins font-normal tracking-[-0.1px] leading-[26px]"
                          />
                          <span className="absolute left-[7px] top-[9px] font-poppins font-light text-[16px]">
                            $
                          </span>
                        </label>
                        {formikForm.errors.retail_price &&
                          formikForm.touched.retail_price && (
                            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color pl-[4px]">
                              {formikForm.errors.retail_price}
                            </p>
                          )}
                      </label>
                      <label className="flex flex-col gap-[6px] flex-1">
                        <span className="text-[14px] text-home-title font-light leading-[20px]">
                          {t<string>("MODALS.DISCOUNT")}
                        </span>
                        <label className="w-full relative">
                          <input
                            type="text"
                            value={formikForm.values.discount_price}
                            onChange={(event) => {
                              countValidation(event, "discount_price");
                            }}
                            className="w-full outline-none border-[1px] border-solid border-border-input rounded-[4px] px-[16px] py-[7px]
                  text-[16px] font-poppins font-normal tracking-[-0.1px] leading-[26px] pr-[82%]"
                          />
                          <span
                            className={classNames({
                              "absolute top-[9px] font-poppins font-light text-[16px]":
                                true,
                              "left-[32px]":
                                +formikForm.values.discount_price >= 0 &&
                                +formikForm.values.discount_price <= 99,
                              "left-[42px]":
                                +formikForm.values.discount_price > 99,
                            })}>
                            %
                          </span>
                        </label>
                      </label>
                    </div>
                    <div>
                      <label className="flex flex-col gap-[6px] flex-1">
                        <span className="text-[14px] text-home-title font-light leading-[20px]">
                          {t<string>("MODALS.SALE_PRICE")}
                        </span>
                        <label className="relative">
                          <input
                            type="text"
                            value={formikForm.values.sale_price}
                            onChange={(event) => {
                              countValidation(event, "sale_price");
                            }}
                            className="w-full outline-none border-[1px] border-solid border-border-input rounded-[4px] px-[16px] py-[7px]
                  text-[16px] font-poppins font-normal tracking-[-0.1px] leading-[26px]
                  "
                          />
                          <span className="absolute left-[7px] top-[9px] font-poppins font-light text-[16px]">
                            $
                          </span>
                        </label>
                        {formikForm.errors.sale_price &&
                          formikForm.touched.sale_price && (
                            <p className="block text-[14px] leading-[20px] mt-[6px] text-error-color pl-[4px]">
                              {formikForm.errors.sale_price}
                            </p>
                          )}
                      </label>
                    </div>
                  </>
                )}
              </div>
              <div
                className="w-full flex items-center justify-end gap-[16px]
          max-sm:justify-between
          ">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-[16px] text-top-playbook-title font-poppins font-medium leading-[21px] 
                px-[41px] py-[12px] rounded-[6px] shadow-purchase_btn border-[1px] border-header-bottom">
                  {t<string>("MODALS.CANCEL")}
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  type="submit"
                  className="text-[16px] text-buttons-color bg-buttons-bg font-poppins font-medium leading-[21px]
                px-[70.5px] py-[12px] rounded-[6px] shadow-purchase_btn
                max-sm:px-[36.5px]
                ">
                  {t<string>("MODALS.SALE_BTN")}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <span className="leading-[28px] tracking-[-0.1px] text-[20px] font-medium font-poppins text-footer-main">
            {t<string>("MODALS.THUMBNAIL")}
          </span>
          <div className="w-[541px] h-[378px mt-[32px]">
            <img
              className="w-[100%] rounded-[3.7px]"
              src={formikForm.values.thumbnail_url || playbook?.header_url}
              alt=""
            />
          </div>
          <div className="flex flex-row gap-[12px] mt-[24px]">
            <div className="h-[78px] w-[98px]">
              <img
                className="w-[100%] h-[100%] object-cover border-[2px] rounded-[4px] border-buttons-bg"
                src={formikForm.values.thumbnail_url || playbook?.header_url}
                alt=""
              />
            </div>
            <label className="flex items-center justify-center h-[78px] w-[98px] bg-chapter-color rounded-[4px] border-card-border border-[1px] cursor-pointer">
              <img src={plus} alt="add" />
              <input
                className="hidden"
                type="file"
                accept=".svg, .png, .jpg, .gif"
                onChange={(event: any) =>
                  ThumbnailUploader(event.target.files[0])
                }
              />
            </label>
          </div>
          <div className="flex flex-row justify-end gap-[16px] mt-[32px]">
            <button
              onClick={() => {
                formikForm.setFieldValue("thumbnail_url", "");
                setThumbnail(null);
                setSelectedType(true);
              }}
              type="button"
              className="text-[16px] text-top-playbook-title font-poppins font-medium leading-[21px] 
                px-[41px] py-[12px] rounded-[6px] shadow-purchase_btn border-[1px] border-header-bottom">
              {t<string>("MODALS.CANCEL")}
            </button>
            <button
              onClick={() => setSelectedType(true)}
              type="button"
              className="text-[16px] font-poppins font-medium leading-[21px] 
                px-[50px] py-[12px] rounded-[6px] shadow-purchase_btn border-[1px] text-buttons-color bg-buttons-bg">
              {t<string>("MODALS.SAVE")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalSale;

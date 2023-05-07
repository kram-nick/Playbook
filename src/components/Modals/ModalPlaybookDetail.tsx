import React, { ReactNode } from "react";
import icon_banner from "../../assets/photos/main/icon-banner.svg";
import icon_add from "../../assets/photos/main/icon-smiley.svg";
import icon_close from "../../assets/photos/main/modal-close.svg";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useState } from "react"; 
import ModalIcons from "./ModalIcons";
import { useModal } from "../../core/hooks/useModal";
import { colourStyles } from "../../core/constants";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  class?: string;
  item: any;
  toggle: () => void;
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export default function ModalPlaybookDetail(props: ModalType) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  let { isOpenModal, toggle } = useModal();

  const handleIconsModal = () => {
    isOpenModal = true;
    toggle();
  };

  return (
    <>
      {props.isOpen && (
        <div>
          <div className="modal-overlay bg-overlay" onClick={props.toggle}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="modal-box relative w-[100%] max-w-[530px] px-[24px] py-[24px] shadow-free-trial 
                border-[1px] border-solid border-border-btn bg-white font-poppins
                max-sm:min-h-[100vh] max-sm:px-[16px] max-sm:py-[16px] max-sm:pb-[80px] max-sm:max-w-[100%]"
            >
              <div className="flex items-center justify-between mb-[24px]">
                <p className="text-[20px] font-medium text-home-title leading-[26px] tracking-[-0.1px]
                  max-sm:text-[16px] max-sm:leading-[22px] max-sm:pl-[28px]">
                  {props.item ? "Edit Details" : "Add a Playbook"}
                </p>
                <button className="absolute top-[16px] right-[16px] max-sm:right-[auto] max-sm:top-[6px] max-sm:left-[6px]">
                  <img src={icon_close} alt="" onClick={props.toggle} />
                </button>
              </div>

              <div className="form grid gap-y-[16px] mb-[24px]">
                <div className="form-group flex flex-wrap">
                  <label
                    htmlFor=""
                    className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
                  >
                    {t<string>("FIELDS.NAME")}
                  </label>
                  <input
                    placeholder={t<string>("FIELDS.NAME")}
                    id="email"
                    type="text"
                    className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-border-input
                    border-solid border-[1px] shadow-free-trial min-w-[100%]
                    leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
                    onChange={(e) => setName(e.target.value)}
                    value={props.item ? props.item.title : ""}
                  />
                </div>

                <div className="form-group flex flex-wrap">
                  <label
                    htmlFor=""
                    className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
                  >
                    {t<string>("FIELDS.DESCRIPTION")}
                  </label>
                  <textarea
                    name=""
                    placeholder={t<string>("FIELDS.DESCRIPTION")}
                    className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-border-input
                  border-solid border-[1px] shadow-free-trial min-w-[100%] h-[105px] resize-none
                  leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label
                    htmlFor=""
                    className="block text-[14px] text-home-title leading-[20px] mb-[6px]"
                  >
                    {t<string>("FIELDS.COLOR")}
                  </label>

                  <Select className="select-custom h-[40px]"
                    defaultValue={colourOptions[1]}
                    options={colourOptions}
                    styles={colourStyles}
                  />
                </div>

                <div className="flex items-center rounded-[4px] bg-gray-btn px-[8px] py-[6px] gap-[6px] cursor-pointer">
                  <img src={icon_banner} alt="" />
                  <span className="text-[14px] tracking-[-0.01px] leading-[20px]">
                    {t<string>("FIELDS.ADD_COVER")}
                  </span>
                </div>
                <div
                  onClick={handleIconsModal}
                  className="flex items-center rounded-[4px] bg-gray-btn px-[8px] py-[6px] gap-[6px] cursor-pointer"
                >
                  <img src={icon_add} alt="" />
                  <span className="text-[14px] tracking-[-0.01px] leading-[20px]">
                    {t<string>("FIELDS.ADD_ICON")}
                  </span>
                </div>

                <label className="flex items-center  w-[100%] justify-between">
                  <span className="text-[16px] text-home-title leading-[20px]">
                    {t<string>("FIELDS.ADD_TO_F")}
                  </span>
                  <span className="switch flex w-[34px] h-[20px]">
                    <input type="checkbox" hidden></input>
                    <span
                      className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"
                    ></span>
                  </span>
                </label>
                <label className="flex items-center  w-[100%] justify-between">
                  <span className="text-[16px] text-home-title leading-[20px]">
                    {t<string>("FIELDS.PRIVATE")}
                  </span>
                  <span className="switch flex w-[34px] h-[20px]">
                    <input type="checkbox" hidden></input>
                    <span
                      className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                      bg-header-bottom cursor-pointer relative transition duration-300 ease-out"
                    ></span>
                  </span>
                </label>
              </div>

              {props.children}
            </div>
          </div>
          <ModalIcons isOpen={isOpenModal} toggle={toggle}></ModalIcons>
        </div>
      )}
    </>
  );
}

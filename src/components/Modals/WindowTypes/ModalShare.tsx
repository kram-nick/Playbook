import { useTranslation } from "react-i18next";
import Select from "react-select";

import useModal from "../../../core/hooks/useModal";

import icon_web from "../../../assets/photos/share/global.svg";
import icon_link from "../../../assets/photos/share/link.svg";
import icon_export from "../../../assets/photos/share/export.svg";
import icon_close from "../../../assets/photos/main/modal-close.svg";

export interface ShareOption {
  readonly value: number;
  readonly label: string;
}

export const shareOptions: readonly ShareOption[] = [
  { value: 1, label: "Can view" },
  { value: 2, label: "Can edit" },
];

export default function ModalShare() {
  const { t } = useTranslation();

  const { closeModal } = useModal();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-box relative w-[100%] max-w-[530px] px-[24px] py-[24px] shadow-free-trial 
              border-[1px] border-solid border-border-btn bg-white font-poppins">
      <div className="mb-[24px]">
        <p className="text-[20px] font-medium text-home-title leading-[26px] tracking-[-0.1px] mb-[4px]">
          {/* Share {item?.title} */}
        </p>
        <button className="absolute top-[16px] right-[16px]">
          <img src={icon_close} alt="" onClick={closeModal} />
        </button>

        <p className="text-[16px] leading-normal text-simple-text tracking-[-0.1px]">
          File Upload description
        </p>
      </div>

      <div className="form grid gap-y-[16px] relative">
        <div className="form-group custom-invite flex flex-wrap mb-[8px]">
          <input
            placeholder={t<string>("FIELDS.EMAIL")}
            type="email"
            className="py-[10px] px-[16px] pr-[200px] rounded-[5px]  placeholder:text-border-input
                  border-solid border-[1px] shadow-free-trial min-w-[100%]
                  leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
          />
          <Select
            className="select-custom"
            defaultValue={shareOptions[0]}
            options={shareOptions}
          />
          <button
            className="absolute h-[40px] w-[70px] flex items-center justify-center  
                    py-[8px] px-[5px] bg-buttons-bg rounded-r-[5px] text-buttons-color 
                    text-[14px] font-medium leading-[20px] top-[0] right-[0px]">
            {t<string>("FIELDS.INVITE")}
          </button>
        </div>

        <label className="flex items-center w-[100%] justify-between">
          <span className="flex items-center gap-[6px] text-[16px] text-home-title leading-[20px]">
            <img src={icon_web} alt="" />
            {t<string>("FIELDS.PUBLIC_LINK")}
          </span>
          <span className="switch flex w-[34px] h-[20px]">
            <input type="checkbox" hidden></input>
            <span
              className="switch-check flex w-[34px] h-[20px] rounded-[20px] 
                    bg-header-bottom cursor-pointer relative transition duration-300 ease-out"></span>
          </span>
        </label>
        {/* <div className="flex items-center w-[100%] justify-between">
          <span className="flex items-center gap-[6px] text-[16px] text-home-title leading-[20px]">
            <img src={icon_link} alt="" />
            {t<string>("FIELDS.PRIVATE_LINK")}
          </span>
          <button
            className="h-[38px] flex items-center justify-center 
                      py-[8px] px-[12px] bg-white rounded-[5px] text-home-title
                      text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
            title="Copy">
            {t<string>("FIELDS.COPY_LINK")}
          </button>
        </div>

        <div className="flex items-center w-[100%] justify-between">
          <span className="flex items-center gap-[6px] text-[16px] text-home-title leading-[20px]">
            <img src={icon_export} alt="" />
            {t<string>("FIELDS.EXPORT")}
          </span>
          <button
            className="h-[38px] flex items-center justify-center 
                      py-[8px] px-[12px] bg-white rounded-[5px] text-home-title
                      text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
            title="Copy">
            {t<string>("FIELDS.EXPORT")}
          </button>
        </div> */}
      </div>
    </div>
  );
}

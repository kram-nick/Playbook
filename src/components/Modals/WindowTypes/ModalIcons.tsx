import { useState } from "react";
import EmojiPicker, { Categories } from "emoji-picker-react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import icon_add from "../../assets/photos/main/plus-upload.svg";

import { tabsIcons } from "../../../core/constants";
import useModal from "../../../core/hooks/useModal";

interface ModalType {
  class?: string;
  item?: any;
}

export default function ModalIcons(props: ModalType) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(tabsIcons[0]);

  const { closeModal } = useModal();

  return (
    <div className="modal-overlay bg-overlay" onClick={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-box relative w-[100%] max-w-[480px] px-[24px] py-[24px] shadow-free-trial 
              border-[1px] border-solid border-border-btn bg-white font-poppins">
        <div
          className="flex items-center w-[100%] justify-between border-b-[1px] border-solid 
                  pt-[7px] pb-[15px]">
          <div className="flex items-end gap-[24px]">
            {tabsIcons.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => setActiveTab(item)}
                className={classNames({
                  "font-semibold text-buttons-bg": activeTab.id === index + 1,
                  "font-medium text-home-title": activeTab.id !== index + 1,
                  "tracking-[-0.1px] relative transition duration-150 ease-in text-[15px] leading-[22px] cursor-pointer":
                    true,
                })}>
                {item.title}
                <div
                  className={classNames({
                    "w-[100%]": activeTab.id === index + 1,
                    "w-[0%]": activeTab.id !== index + 1,
                    "absolute bottom-[-15px] left-[-1px] h-[1px] transition duration-300 ease-in bg-buttons-bg":
                      true,
                  })}></div>
              </div>
            ))}
          </div>

          <button className="text-[15px] tracking-[-0.1px] leading-[22px] font-normal text-input-paceholder">
            {t<string>("BTNS.REMOVE")}
          </button>
        </div>

        {activeTab && activeTab.id === 1 && (
          <div className="customEmojiPicker mt-[24px]">
            <EmojiPicker
              height={220}
              width="100%"
              skinTonesDisabled
              previewConfig={{
                showPreview: false,
              }}
              lazyLoadEmojis={true}
              categories={[
                {
                  name: "Smiles & Emotions",
                  category: Categories.SMILEYS_PEOPLE,
                },
              ]}
            />
          </div>
        )}

        {activeTab && activeTab.id === 3 && (
          <div
            className="mt-[24px] px-[24px] py-[24px] border-[1px] border-solid border-header-bottom bg-white 
                    rounded-[18px] cursor-pointer">
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
              <span className="mr-[5px] text-buttons-bg">
                {t<string>("FIELDS.B_FILES")}
              </span>
              {t<string>("FIELDS.Y_COMPUTER")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

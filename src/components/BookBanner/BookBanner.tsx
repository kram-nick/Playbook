import { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import icon from "../../assets/photos/chapter/icon-banner.svg";
import add_banner from "../../assets/photos/chapter/add-banner.svg";

import PlaybookService from "../../core/services/playbook.service";

import { FileMode } from "../../core/models/enums";

type BookBannerProps = {
  preview?: boolean;
  data?: any;
};

const BookBanner = ({ preview, data }: BookBannerProps) => {
  const { t } = useTranslation();
  const [isBanner, setIsBanner] = useState(true);
  const { playbook_id } = useParams();

  const handleUpload = async (file: any, mode: string) => {
    try {
      await PlaybookService.UploadFile({
        playbook_id: String(playbook_id),
        file,
        mode,
      });
    } catch (errors: any) {
      for (let error in errors?.response?.data?.errors) {
        toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
      }
    }
  };

  const handleBanner = () => {
    setIsBanner(!isBanner);
    data.header_url = null;
  };

  return (
    <div className="relative rounded-t-[8px] bg-header-bottom h-[218px] mb-[52px] font-poppins max-[1024px]:rounded-t-[0px]">
      <div className="absolute w-[73px] h-[73px] left-[50px] bottom-[-24px] z-[10]">
        <label>
          <img src={data?.icon_url} alt="" />
          <input
            type="file"
            className="hidden"
            onChange={(event) => {
              if (event?.target?.files) {
                handleUpload(event?.target?.files[0], FileMode.PLAYYBOOK_ICON);
              }
            }}
          />
        </label>
      </div>
      {isBanner && (
        <div
          className="absolute rounded-t-[8px] overflow-hidden w-[100%] h-[100%] left-[0px] top-[0px] z-[1]
        max-[1024px]:rounded-t-[0]">
          <img
            className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
            src={data?.header_url}
            alt=""
          />
        </div>
      )}
      {data?.header_url && !preview && (
        <div className="absolute border-solid border-[1px] rounded-[5px] flex items-center right-[8px] bottom-[8px] z-[10] bg-white">
          <label
            className="rounded-l-[5px] h-[38px] border-solid border-r-[1px] flex items-center border-header-bottom
            px-[12px] text-[14px] cursor-pointer leading-[18px] tracking-[-0.1px] font-medium text-home-title 
            hover:bg-people-bg transition duration-300 linear">
            {t<string>("BTNS.CHANGE_COVER")}
            <input
              className="hidden"
              onChange={(event) => {
                event.preventDefault();
                if (event.target.files) {
                  handleUpload(
                    event.target.files[0],
                    FileMode.PLAYBOOK_HEADER_IMAGE
                  );
                }
              }}
              type="file"
            />
          </label>
          <div
            onClick={handleBanner}
            className="rounded-r-[5px] h-[38px] flex items-center 
            px-[12px] text-[14px] cursor-pointer leading-[18px] tracking-[-0.1px] font-medium text-home-title
            hover:bg-people-bg transition duration-300 linear">
            {t<string>("BTNS.REMOVE")}
          </div>
        </div>
      )}
      {!data?.header_url && !preview && (
        <label
          onClick={handleBanner}
          className="absolute border-solid border-[1px] border-header-bottom rounded-[5px] right-[8px] bottom-[12px] z-[10] bg-white
          px-[12px] h-[40px] flex items-center gap-[6px] hover:bg-people-bg transition duration-300 linear
          text-[16px] leading-[18px] font-medium text-home-title">
          <img src={add_banner} alt="" />
          <input
            type="file"
            className="hidden"
            onChange={(event) => {
              if (event?.target?.files) {
                handleUpload(
                  event?.target?.files[0],
                  FileMode.PLAYBOOK_HEADER_IMAGE
                );
              }
            }}
          />
          {t<string>("BTNS.ADD_COVER")}
        </label>
      )}
    </div>
  );
};

export default BookBanner;

import { useTranslation } from "react-i18next";

import back from "../../../assets/photos/main/arrow-back.svg";
import divider from "../../../assets/photos/create/divider.svg";
import preview from "../../../assets/photos/create/preview.svg";
import play_active from "../../../assets/photos/main/play-active.svg";
import add_user from "../../../assets/photos/create/add-user.svg";
import { useAppSelector } from "../../../core/hooks/useRedux";
import classNames from "classnames";
import { Link } from "react-router-dom";

type HeaderProps = { 
  previewState?: boolean,
}
 

const Header = ({previewState}: HeaderProps) => {
  const { t } = useTranslation();
  const { data } = useAppSelector((state) => state.app);

  return (
    <header className="h-[74px] bg-white flex items-center border-b-[1px] max-lg:h-[60px]">
      <nav className="w-full flex flex-row  justify-between pl-[24px] pr-[32px] items-center py-[10px] max-lg:px-[16px]">
        <div className="flex flex-row items-center gap-[8px] max-[690px]:max-w-[calc(100%-100px)]">
          <Link  to="/main"
            className={classNames({
              "font-poppins font-medium text-[14px] leading-[20px] text-nav-txt-private":true,
              "max-lg:hidden":data.name,
            })}>
            Home
          </Link>
          {data && data.name && (
            <span className={classNames({
              "font-poppins flex items-center font-medium text-[14px] leading-[20px] gap-[4px] max-lg:text-[16px] max-lg:gap-[8px]":true,
              "text-home-title":!data.chapter_title,
              "text-nav-txt-private max-lg:hidden":data.chapter_title,
            })}>
              <img src={divider} alt="" className="max-lg:hidden" /> 
              <img src={back} alt="" className="hidden max-lg:block" /> 
              {data.name}
            </span>
          )}
          {data && data.chapter_title && (
            <span className="font-poppins flex items-center font-medium text-[14px] leading-[20px] text-home-title 
              gap-[4px] max-lg:gap-[8px] max-[690px]:w-[100%]">
              <img src={divider} alt="" className="max-lg:hidden" /> 
              <img src={back} alt="" className="hidden max-lg:block" /> 
              <span className="truncate max-w-[100px] max-lg:text-[16px] max-[690px]:max-w-[100%]">{data.chapter_title}</span>
            </span>
          )}          
 
          {/* <span className="font-poppins font-normal text-simple-text leading-[20px] tracking-[-0.1px]">
            ({t<string>("COMMON.DRAFT")})
          </span> */}
        </div>
        <div className="flex flex-row gap-[28px] rounded-[5px] items-center max-lg:gap-[12px] max-[690px]:min-w-[60px]">
        <Link  to="/preview" className="flex flex-row gap-[4px] items-center cursor-pointer">
          <span className={classNames({
            "font-poppins text-[16px]   font-medium leading-[20.8px] max-lg:hidden":true,
            "text-buttons-bg":previewState,
            "text-nav-txt-private":!previewState,
          })}>
            {t<string>("COMMON.PREVIEW")}
          </span>
          <img src={previewState ? play_active: preview} alt="preview" className="max-lg:w-[24px] max-lg:h-[24px]" />
        </Link>            
          {/* <button className="flex flex-row gap-[4px] items-center cursor-pointer">
            <span className={classNames({
              "font-poppins text-[16px] text-nav-txt-private font-medium leading-[20.8px]":true
            })}>
              {t<string>("COMMON.PREVIEW")}
            </span>
            <img src={preview} alt="preview" />
          </button> */}
          <button className="flex flex-row gap-[4px] items-center cursor-pointer">
            <span className="font-poppins text-[16px] text-nav-txt-private font-medium leading-[20.8px] max-lg:hidden">
              {t<string>("COMMON.SHARE")}
            </span>
            <img src={add_user} alt="add-user" className="max-lg:w-[24px] max-lg:h-[24px]" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

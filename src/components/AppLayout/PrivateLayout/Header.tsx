import { useTranslation } from "react-i18next";

import next from "../../../assets/photos/create/right-arrow-inactive.svg";
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
    <header className="py-[12px] bg-white flex items-center border-b-[1px]  ">
      <nav className="w-full flex flex-row  justify-between pl-[24px] pr-[32px] items-center py-[14px]">
        <div className="flex flex-row items-center gap-[8px]">
          <span className="font-poppins font-medium text-[14px] leading-[20px] text-nav-txt-private">
            Home
          </span>
          {data && data.title && (
            <span className={classNames({
              "font-poppins flex items-center font-medium text-[14px] leading-[20px] gap-[4px]":true,
              "text-home-title":data.chapter_title,
              "text-nav-txt-private":data.chapter_title,
            })}>
              <img src={divider} alt="" />
              {data.title}
            </span>
          )}
          {data && data.chapter_title && (
            <span className="font-poppins flex items-center font-medium text-[14px] leading-[20px] text-home-title gap-[4px]">
              <img src={divider} alt="" />
              <span className="truncate max-w-[100px]">{data.chapter_title}</span>
            </span>
          )}          
 
          {/* <span className="font-poppins font-normal text-simple-text leading-[20px] tracking-[-0.1px]">
            ({t<string>("COMMON.DRAFT")})
          </span> */}
        </div>
        <div className="flex flex-row gap-[28px] rounded-[5px] items-center">
        <Link  to="/preview" className="flex flex-row gap-[4px] items-center cursor-pointer">
          <span className={classNames({
            "font-poppins text-[16px]   font-medium leading-[20.8px]":true,
            "text-buttons-bg":previewState,
            "text-nav-txt-private":!previewState,
          })}>
            {t<string>("COMMON.PREVIEW")}
          </span>
          <img src={previewState ? play_active: preview} alt="preview" />
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
            <span className="font-poppins text-[16px] text-nav-txt-private font-medium leading-[20.8px]">
              {t<string>("COMMON.SHARE")}
            </span>
            <img src={add_user} alt="add-user" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

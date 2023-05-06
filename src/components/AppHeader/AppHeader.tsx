import { useTranslation } from "react-i18next"; 
import { User } from "../../core/constants";
import classNames from "classnames";
import { Link } from "react-router-dom";

import search from "../../assets/photos/main/search.svg";
import arrow_down from "../../assets/photos/main/arrow-down.svg";
import icon_burger from "../../assets/photos/common/burger.svg";  
import playbookLogo from "../../assets/photos/squeeze/mob-logo.svg";

type HeaderProps = { 
  profile?: boolean,
}

const AppHeader = ({profile}: HeaderProps) => {
  const { t } = useTranslation(); 
 

  return (
    <header className="py-[14px] px-[24px]   border-b-[1px] bg-tools-block  
      max-lg:py-[8px] max-lg:px-[32px]  max-sm:px-[16px] max-sm:gap-[12px]"> 
      <div className={classNames({
        "flex items-center justify-between mx-[auto]":true,
        "max-w-[1200px]": profile
      })}>

      <div className="flex items-center max-[690px]:w-[calc(100%-60px)]">
        {profile ? (
          <Link  to="/main" className="mr-[32px] min-w-[160px] block max-[690px]:hidden">
            <img   src={playbookLogo} alt="playbookLogo" />
          </Link>
        ): (
          <div className="absolute flex items-center justify-center w-[32px] h-[32px] 
            top-[14px] left-[28px] min-[1024px]:hidden cursor-pointer max-sm:left-[12px]">
            <img src={icon_burger} alt="" />
          </div>
        )}
 
        <div className={classNames({
            "max-w-[350px] w-[100%] relative":true,
            "max-[690px]:ml-[0px]": profile,
            "max-lg:ml-[48px]": !profile
          })}> 
          <img src={search} alt="" className="absolute left-[12px] top-[11px] w-[24px]" />
          <input
            placeholder={t<string>("MAIN.SEARCH_PLACEHOLDER")}
            type="text"
            className="py-[10px] pl-[48px] pr-[12px] h-[46px] rounded-[8px]  placeholder:text-simple-text
            border-solid border-[1px] w-[100%] bg-search-input
            leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border max-lg:h-[44px]"
          />
        </div> 
      </div>
 

        <Link  to="/profile" className="user flex items-center gap-[8px]">
          <div className="relative w-[40px]">
            <div className="photo bg-center bg-no-repeat bg-without-photo 
              bg-top-entrepreneur w-[40px] h-[40px] rounded-[50%]"></div>
            <div className="status absolute border-solid border-[2px] border-buttons-color 
              rounded-[50%] border-bg-white bg-checkbox-bg w-[14px] h-[14px] bottom-[-3px]
              right-[-2px]"></div>
          </div>

          <div className="text gap-y-[2px] grid max-sm:hidden">
            {User.name && (
              <p className="text-[12px] font-inter font-medium text-home-title leading-[12px]">{User.name}</p>
            )}  
            {User.email && (
              <p className="text-[10px] font-poppins font-normal text-simple-text leading-[16px]">{User.email}</p>
            )}          
          </div>
          <button className="max-sm:hidden">
            <img src={arrow_down} alt="" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;

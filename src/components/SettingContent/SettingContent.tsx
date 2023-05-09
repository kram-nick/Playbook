 
import AppHeader from "../AppHeader"; 

import to_arrow from "../../assets/photos/create/right.svg";
import back from "../../assets/photos/main/arrow-back.svg";
import home from "../../assets/photos/create/home.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SettingContainer from "../SettingContainer";
 
const MainContent = () => {  
  const { t } = useTranslation();

  return (
    <div className="w-full flex-1">
      <div className="max-[1024px]:hidden">
        <AppHeader /> 
      </div>
      <div className="min-[1024px]:hidden flex items-center font-poppins border-b-[1px] bg-white border-header-bottom h-[60px]
        px-[16px]">
        <Link to="/main" className="flex flex-row items-center gap-[8px] text-[16px] font-medium leading-[20px]">
          <img src={back} alt="home" /> 
          Home
        </Link>
      </div>


      <div className="p-[24px] max-[690px]:px-[16px]">
        <div className="w-full flex flex-row justify-start items-center gap-[4px] mb-[20px] max-[1024px]:hidden">
          <Link to="/main" className="flex flex-row items-center gap-[4px] mb-[4px]">
            <img src={home} alt="home" />
            <img src={to_arrow} alt="to_arrow" />
          </Link>
          {/* <div className="flex flex-row items-center ">
            <span className="font-poppins text-[14px] leading-[20px] tracking-[-0.1px] font-normal text-nav-txt-private ">
              {title}
            </span>
            <img src={to_arrow} alt="to-arrow" />
          </div> */}
          <span className="font-poppins text-[14px] leading-[20px] tracking-[-0.1px] font-normal text-nav-txt-private mb-[4px]">
            {t<string>("SETTINGS.TITLE")}
          </span>
        </div> 

        <SettingContainer />
      </div>
    </div>
  );
};

export default MainContent;

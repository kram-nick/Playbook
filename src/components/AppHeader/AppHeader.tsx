import { useTranslation } from "react-i18next"; 
import { User } from "../../core/constants";

import search from "../../assets/photos/main/search.svg";
import arrow_down from "../../assets/photos/main/arrow-down.svg";

const AppHeader = () => {
  const { t } = useTranslation(); 
 

  return (
    <header className="py-[14px] px-[24px] flex items-center border-b-[1px] bg-tools-block justify-between"> 
      <div className="max-w-[350px] w-[100%] relative"> 
        <img src={search} alt="" className="absolute left-[12px] top-[11px] w-[24px]" />
        <input
          placeholder={t<string>("MAIN.SEARCH_PLACEHOLDER")}
          type="text"
          className="py-[10px] pl-[48px] pr-[12px] h-[46px] rounded-[8px]  placeholder:text-simple-text
          border-solid border-[1px] w-[100%] bg-search-input
          leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
        />
      </div> 

      <div className="user flex items-center gap-[8px]">
        <div className="relative w-[40px]">
          <div className="photo bg-center bg-no-repeat bg-without-photo 
            bg-top-entrepreneur w-[40px] h-[40px] rounded-[50%]"></div>
          <div className="status absolute border-solid border-[2px] border-buttons-color 
            rounded-[50%] border-bg-white bg-checkbox-bg w-[14px] h-[14px] bottom-[-3px]
            right-[-2px]"></div>
        </div>

         <div className="text gap-y-[2px] grid">
            {User.name && (
              <p className="text-[12px] font-inter font-medium text-home-title leading-[12px]">{User.name}</p>
            )}  
            {User.email && (
              <p className="text-[10px] font-poppins font-normal text-simple-text leading-[16px]">{User.email}</p>
            )}          
          </div>
          <button>
            <img src={arrow_down} alt="" />
          </button>
           
      </div>

    </header>
    
  );
};

export default AppHeader;

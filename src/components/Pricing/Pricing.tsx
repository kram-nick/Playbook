import { useTranslation } from "react-i18next";
 
import classNames from "classnames";

import quote from "../../assets/photos/home/quote.svg";
import check from "../../assets/photos/home/check.svg";
import check_base from "../../assets/photos/home/check-base.svg";

const Pricing = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white min-[1024px]:pt-[140px] min-[1024px]:pb-[80px] max-[1024px]:pt-[80px] max-[1024px]:pb-[50px]
    overflow-hidden ">

      <div className="w-[100%] max-w-[1264px] px-[32px] mx-[auto] font-poppins max-[650px]:px-[16px]">
        <h2 className="text-center font-bold text-[40px] leading-[52px] text-home-title tracking-[-0.1px] max-w-[670px] mx-[auto]
            max-lg:text-[28px] max-lg:leading-[36.4px] mb-[80px] max-[1024px]:mb-[40px]">
            {t<string>("HOME.PRICE_TITLE")}
        </h2> 

        <div className="grid grid-cols-3 font-poppins gap-[24px] max-[1024px]:flex max-[1024px]:justify-center flex-wrap">
          <div className="p-[32px] shadow-free-trial rounded-[20px] bg-people-bg border-header-bottom border-[1px]
            max-[1024px]:w-[calc(50%-12px)] max-[650px]:w-[100%]">
            <div className="price text-[40px] tracking-[-0.1px] mb-[16px] font-bold text-home-title">
              $0
              <span className="text-[20px] font-normal leading-[32px] tracking-[-0.1px] text-simple-text">/{t<string>("HOME.MONTH")}</span>
            </div>

            <h4 className="text-[20px] font-medium leading-[32px] tracking-[-0.1px] text-home-title mb-[8px]">
              {t<string>("HOME.PRICE_FREE")}
            </h4>
            <p className="text-[16px] font-normal leading-[26px] tracking-[-0.1px] text-simple-text">
              {t<string>("HOME.PRICE_DESC")}
            </p>

            <div className="h-[1px] bg-search-input my-[24px] w-[100%]"></div>

            <ul className="gap-[12px] grid">
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_1")}
              </li>
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                1 {t<string>("HOME.PRICE_OL_2")}
              </li> 
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check_base} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_3")}
              </li>
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check_base} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_4")}
              </li>                            
            </ul>

            <button className="h-[45px] w-[100%] rounded-[6px] bg-white font-medium text-[16px] leading-[26px] 
              tracking-[-0.1px] text-home-title border-[1px] border-header-bottom mt-[32px] shadow-free-trial">
              {t<string>("HOME.PRICE_BTN")}
            </button>
          </div>

          <div className="p-[32px] shadow-free-trial rounded-[20px] bg-white border-buttons-bg border-[2px] shadow-pricing
            max-[1024px]:w-[calc(50%-12px)] max-[650px]:w-[100%] max-[650px]:shadow-none">
            <div className="price text-[40px] tracking-[-0.1px] mb-[16px] font-bold text-home-title">
              $50
              <span className="text-[20px] font-normal leading-[32px] tracking-[-0.1px] text-simple-text">/{t<string>("HOME.MONTH")}</span>
            </div>

            <h4 className="text-[20px] font-medium leading-[32px] tracking-[-0.1px] text-home-title mb-[8px]">
              {t<string>("HOME.PRICE_ADV")}
            </h4>
            <p className="text-[16px] font-normal leading-[26px] tracking-[-0.1px] text-simple-text">
              {t<string>("HOME.PRICE_DESC")}
            </p>

            <div className="h-[1px] bg-search-input my-[24px] w-[100%]"></div>

            <ul className="gap-[12px] grid">
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_1")}
              </li>
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                1 {t<string>("HOME.PRICE_OL_2")}
              </li> 
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_3")}
              </li>
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check_base} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_4")}
              </li>                            
            </ul>

            <button className="h-[45px] w-[100%] rounded-[6px] bg-buttons-bg font-medium text-[16px] leading-[26px] 
              tracking-[-0.1px] text-white shadow-free-trial border-[1px] border-header-bottom mt-[32px]">
              {t<string>("HOME.PRICE_BTN")}
            </button>
          </div>  

          <div className="p-[32px] shadow-free-trial rounded-[20px] bg-people-bg border-header-bottom border-[1px] justify-self: center
            max-[1024px]:w-[calc(50%-12px)] max-[650px]:w-[100%]">
            <div className="price text-[40px] tracking-[-0.1px] mb-[16px] font-bold text-home-title">
              $90
              <span className="text-[20px] font-normal leading-[32px] tracking-[-0.1px] text-simple-text">/{t<string>("HOME.MONTH")}</span>
            </div>

            <h4 className="text-[20px] font-medium leading-[32px] tracking-[-0.1px] text-home-title mb-[8px]">
              {t<string>("HOME.PRICE_PRO")}
            </h4>
            <p className="text-[16px] font-normal leading-[26px] tracking-[-0.1px] text-simple-text">
              {t<string>("HOME.PRICE_DESC")}
            </p>

            <div className="h-[1px] bg-search-input my-[24px] w-[100%]"></div>

            <ul className="gap-[12px] grid">
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_1")}
              </li>
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                1 {t<string>("HOME.PRICE_OL_2")}
              </li> 
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_3")}
              </li>
              <li className="flex items-center gap-[12px] text-[16px] leading-[26px] tracking-[-0.1px] text-home-title">
                <img src={check} alt=""  className="min-w-[20px] w-[20px]"/>
                {t<string>("HOME.PRICE_OL_4")}
              </li>                            
            </ul>

            <button className="h-[45px] w-[100%] rounded-[6px] bg-home-title font-medium text-[16px] leading-[26px] 
              tracking-[-0.1px] text-white shadow-free-trial border-[1px] border-header-bottom mt-[32px]">
              {t<string>("HOME.PRICE_BTN")}
            </button>
          </div>          
        </div>
  
      </div>       
    </section>  
  );
};

export default Pricing;

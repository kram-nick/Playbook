import { useTranslation } from "react-i18next";

import figures from "../../assets/photos/top-playbook/figures.svg";
import arrow_to_side from "../../assets/photos/top-playbook/arrow-to-side.svg";
import illustraion_tab from "../../assets/photos/top-playbook/illustration-tab.svg";
import illustraion_mob from "../../assets/photos/top-playbook/illustration-mob.svg";

const TopFeatures = () => {
  const { t } = useTranslation();

  return (
    <section
      className="px-[7vw] flex flex-col gap-[80px] mb-[140px] mx-auto max-w-[1880px]
    max-sm:gap-[32px]
    max-lg:px-[32px]
    max-lg:mb-[100px]
    ">
      <div className="flex flex-col gap-[24px] items-center justify-center w-full">
        <h2
          className=" text-top-playbook-title font-inter font-bold leading-[52px] text-center text-[40px]
        max-lg:text-[28px]
        ">
          {t<string>("HOME.TOOLS_TITLE")}
        </h2>
        <p className="text-top-subtitle-playbook font-poppins font-normal text-center leading-[26px] text-[16px] max-w-[534px]">
          {t<string>("HOME.TOOLS_SUBTITLE")}
        </p>
      </div>
      <div
        className="flex flex-row gap-[40px] justify-between items-center
      max-sm:flex-col-reverse
      max-sm:gap-[48px]
      max-lg:gap-[22px]
      ">
        <ul
          className="flex flex-col gap-[61px]
          max-sm:gap-[40px]
        max-lg:gap-[60px]
        ">
          <div className="flex-1 max-w-[344px]">
            <span className="mb-1 py-[8px] px-[16px] text-[12px] font-poppins text-top-sub-accent capitalize text-center leading-[19px] tracking-[0.03em] font-semibold rounded-[100px] bg-top-engineering">
              {t<string>("HOME.MANAGEMENT")}
            </span>
            <div
              className="text-top-playbook-title text-[24px] font-semibold normal-case leading-[36px] mb-[8px] mt-[16px] 
            max-lg:text-[24px]
            ">
              <button>{t<string>("HOME.HIRE")}</button>
            </div>
            <p className="font-poppins text-[16px] leading-[26px] text-top-sub-secondary font-normal not-italic">
              {t<string>("HOME.TOP_DESC")}
            </p>
          </div>
          <div className="flex-1 max-w-[344px]">
            <span className="mb-1 py-[8px] px-[16px] text-[12px] font-poppins text-top-sub-accent capitalize text-center leading-[19px] tracking-[0.03em] font-semibold rounded-[100px] bg-top-entrepreneur">
              {t<string>("HOME.ENTREPRENEUR")}
            </span>
            <div
              className="text-top-playbook-title text-[24px] font-semibold normal-case leading-[36px] mb-[8px] mt-[16px] 
            max-lg:text-[24px]
            ">
              <button>{t<string>("HOME.STARTUP")}</button>
            </div>
            <p className="font-poppins text-[16px] leading-[26px] text-top-sub-secondary font-normal not-italic">
              {t<string>("HOME.TOP_DESC")}
            </p>
          </div>
          <div className="flex-1 max-w-[344px]">
            <span className="mb-1 py-[8px] px-[16px] text-[12px] font-poppins text-top-sub-accent capitalize text-center leading-[19px] tracking-[0.03em] font-semibold rounded-[100px] bg-top-ceo">
              {t<string>("HOME.CEO")}
            </span>
            <div
              className="text-top-playbook-title text-[24px] font-semibold normal-case leading-[36px] mb-[8px] mt-[16px] 
            max-lg:text-[24px]
            ">
              <button>{t<string>("HOME.CULTURE")}</button>
            </div>
            <p className="font-poppins text-[16px] leading-[26px] text-top-sub-secondary font-normal not-italic">
              {t<string>("HOME.TOP_DESC")}
            </p>
          </div>
        </ul>
        <img
          src={illustraion_mob}
          alt="illustraion_tab"
          className="hidden max-lg:hidden max-sm:block"
        />
        <img
          src={illustraion_tab}
          alt="illustraion_tab"
          className="hidden max-lg:block max-sm:hidden"
        />
        <div
          className="bg-top-playbook pt-[80px] pr-[107px] pb-[83px] pl-[109px] rounded-[30px] relative
        max-lg:hidden
        ">
          <img src={figures} alt="figures" />
          <img
            className="absolute left-[36px] bottom-[230px]
            max-xl:bottom-[200px]
            "
            src={arrow_to_side}
            alt="arrow_to_side"
          />
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;

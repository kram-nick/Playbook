import { useTranslation } from "react-i18next";

import groupOne from "../../assets/photos/home/illustration.svg";
import navArrows from "../../assets/photos/home/arrows-right.svg";
import facebook from "../../assets/photos/home/facebook.svg";
import youtube from "../../assets/photos/home/youtube.svg";
import twitter from "../../assets/photos/home/twitter.svg";
import people from "../../assets/photos/home/people.svg";
import sales from "../../assets/photos/home/sales.svg";
import product from "../../assets/photos/home/products.svg";
import engineering from "../../assets/photos/home/engineering.svg";
import culture from "../../assets/photos/home/culture.svg";
import marketing from "../../assets/photos/home/marketing.svg";
import ToolsBlock from "../../components/ToolsBlock/ToolsBlock";
import Banner from "../../components/Banner/Banner";
import TopFeatures from "../../components/TopFeatures/TopFeatures";
import Review from "../../components/Review/Review";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="flex mx-auto max-w-[1880px] justify-between gap-[40px] my-[38px] pl-[7vw] pr-[50px]
        max-sm:px-[16px]
        max-sm:items-center
        max-sm:flex-col-reverse
        max-sm:my-[22px]
        max-md:flex-col-reverse
      max-lg:my-[62px]
      max-lg:pl-[32px]
      max-lg:pr-[20px]
      max-lg:gap-[12px]
      max-lg:items-center
      ">
        <div
          className="mt-[46px]
          max-sm:w-full
          max-md:w-full
          max-lg:mt-0
        max-lg:w-[368px]
        ">
          <h1
            className="max-w-[511px] font-poppins  text-[56px] leading-[60px] font-bold text-home-title tracking-[-0.01em]
          max-lg:text-[38px]
          max-lg:leading-[53px]
          ">
            {t<string>("HOME.TITLE")}
          </h1>
          <div className="flex flex-col gap-[16px] mt-[24px]">
            <p className="text-[16px] font-poppins text-simple-text max-w-[474px] leading-[26px] tracking-[-0.1px]">
              {t<string>("HOME.SUBTITLE")}
            </p>
          </div>
          <div
            className="flex items-center gap-[32px] mt-[48px]
          max-sm:gap-[16px]
          max-sm:mt-[36px]
          ">
            <Link to="/sign-up" className="text-[16px] font-semibold leading-[21px] py-[17px] px-[20px] bg-buttons-bg rounded-[8px] text-buttons-color shadow-free-trial">
              {t<string>("HOME.FREE_START")}
            </Link>
            <div className="flex items-center">
              <p className="text-buttons-bg text-[16px] font-semibold leading-[21px] min-w-[90px]">
                {t<string>("HOME.LEARN")}
              </p>
              <img
                className="max-w-[32px]
                "
                src={navArrows}
                alt="navigate arrows"
              />
            </div>
          </div>
          <div
            className="flex items-center gap-[16px] mt-[80px] bg-people-bg p-[16px] rounded-[8px]
            max-lg:hidden
          ">
            <div>
              <img src={people} alt="people" />
            </div>
            <p
              className="text-simple-text max-w-[256px] leading-[23px] tracking-[-0.1px] text-[16px] font-poppins font-normal
            max-sm:text-center
            ">
              {t<string>("HOME.JOIN").split(" ")[0]}{" "}
              <span className="font-semibold">
                {t<string>("HOME.JOIN").split(" ")[1]}{" "}
              </span>
              {t<string>("HOME.JOIN").split(" ").slice(2).join(" ")}
            </p>
          </div>
          <div
            className="flex gap-[85.5px]  mt-[15px]
          max-lg:hidden
          ">
            <button className="flex items-center gap-[12px]">
              <img src={facebook} alt="facebook" />
              <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
                {t<string>("HOME.FACEBOOK")}
              </span>
            </button>
            <button className="flex items-center gap-[12px]">
              <img src={youtube} alt="youtube" />
              <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
                {t<string>("HOME.YOUTUBE")}
              </span>
            </button>
            <a
              href="https://twitter.com/playbookwork"
              target="blank"
              className="flex items-center gap-[12px]">
              <img src={twitter} alt="twitter" />
              <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
                {t<string>("HOME.TWITTER")}
              </span>
            </a>
          </div>
        </div>
        <div>
          <img
            className="object-cover
            max-sm:h-[485px]
            max-lg:h-[465px]
            max-lg:w-[380px]
            max-xl:w-[700px]
          "
            src={groupOne}
            alt="group"
          />
          {/* <img
            src={groupOneMob}
            alt="groupOneMob"
            className="hidden
            max-sm:hidden
            max-lg:block
          "
          />
          <img
            src={groupThreeMob}
            alt="groupOneMob"
            className="hidden max-sm:block"
          /> */}
        </div>
      </div>
      <div
        className="hidden  items-center justify-center flex-col
        max-sm:px-[16px]
      max-lg:flex
      ">
        <div
          className="items-center gap-[16px] mt-[36px] bg-people-bg p-[16px] rounded-[8px]
          max-sm:w-full
          max-sm:flex-col
      max-lg:flex
      ">
          <div>
            <img
              src={people}
              alt="people"
              className="
          max-sm:w-full
            "
            />
          </div>
          <p
            className="text-simple-text max-w-[256px] leading-[23px] tracking-[-0.1px] text-[16px] font-poppins font-normal
          max-sm:w-full
          max-sm:text-center
          ">
            {t<string>("HOME.JOIN").split(" ")[0]}{" "}
            <span className="font-semibold">
              {t<string>("HOME.JOIN").split(" ")[1]}{" "}
            </span>
            {t<string>("HOME.JOIN").split(" ").slice(2).join(" ")}
          </p>
        </div>
        <div
          className="gap-[85.5px] mt-[15px]
          max-sm:mt-[9px]
          max-sm:w-full
          max-sm:justify-between
          max-sm:gap-[25.45px]
          max-lg:flex
        ">
          <button
            className="flex items-center gap-[12px] max-sm:flex-1 
          max-sm:gap-[4px]
          max-sm:justify-between
          ">
            <img src={facebook} alt="facebook" />
            <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
              {t<string>("HOME.TITLE")}
            </span>
          </button>
          <button
            className="flex items-center gap-[12px] max-sm:flex-1 
          max-sm:gap-[4px]
          max-sm:justify-between
          ">
            <img src={youtube} alt="youtube" />
            <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
              {t<string>("HOME.YOUTUBE")}
            </span>
          </button>
          <a
            href="https://twitter.com/playbookwork"
            target="blank"
            className="flex items-center gap-[12px] max-sm:flex-1 
            max-sm:gap-[4px]
            max-sm:justify-between
            ">
            <img src={twitter} alt="twitter" />
            <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
              {t<string>("HOME.TWITTER")}
            </span>
          </a>
        </div>
      </div>
      <div className="bg-tools-bg  mt-[104px]">
        <div
          className="flex flex-col mx-auto max-w-[1880px] items-center px-[7vw] pt-[140px] pb-[270px]
        max-sm:pt-[60px]
        max-sm:px-[18px]
        max-lg:px-[42px]
        max-lg:pb-[154px]
        ">
          <h1
            className="text-center max-w-[885px] font-bold text-[40px] leading-[52px] text-home-title font-poppins tracking-[-0.1px]
          max-lg:text-[28px]
          max-lg:leading-[36.4px]
          ">
            {t<string>("HOME.DESIGN")}
          </h1>
          <p className="font-poppins text-center mt-[24px] max-w-[620px] text-[16px] leading-[26px] text-simple-text">
            {t<string>("HOME.DESIGN_SUB")}
          </p>
          <div
            className="flex w-full justify-between mt-[108px]
          max-sm:gap-x-[2px]
          max-sm:gap-y-[32px]
          max-sm:mt-[40px]
          max-lg:flex-wrap
          max-lg:justify-around
          max-lg:gap-x-[87px]
          max-lg:gap-y-[50px]
          max-lg:mt-[81px]
          ">
            <div
              className="flex flex-col justify-between items-center h-[150px]
            max-sm:min-w-[168px]
            ">
              <img src={sales} alt="sales" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                {t<string>("HOME.SALES_BLOCK")}
              </span>
            </div>
            <div
              className="flex flex-col justify-between items-center h-[150px]
            max-sm:min-w-[168px]
            ">
              <img src={product} alt="product" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                {t<string>("HOME.PRODUCT_BLOCK")}
              </span>
            </div>
            <div
              className="flex flex-col justify-between items-center h-[150px]
            max-sm:min-w-[168px]
            ">
              <img src={engineering} alt="engineering" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                {t<string>("HOME.ENGINEERING_BLOCK")}
              </span>
            </div>
            <div
              className="flex flex-col justify-between items-center h-[150px]
            max-sm:min-w-[168px]
            ">
              <img src={culture} alt="culture" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                {t<string>("HOME.CULTURE_BLOCK")}
              </span>
            </div>
            <div
              className="flex flex-col justify-between items-center h-[150px]
            max-sm:min-w-[168px]
            ">
              <img src={marketing} alt="marketing" />
              <span className="font-poppins text-[24px] leading-[36px] font-semibold">
                {t<string>("HOME.MARKETING_BLOCK")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative top-[-130px]
      max-lg:top-[-67px]
      ">
        <ToolsBlock />
      </div>
      <TopFeatures />
      <Review />
      <Banner />
    </>
  );
};

export default HomePage;

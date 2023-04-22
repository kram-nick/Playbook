import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import classnames from "classnames";

import ToolsBlock from "../../components/ToolsBlock/ToolsBlock";

import email_icon from "../../assets/photos/squeeze/email.svg";
import avatar from "../../assets/photos/squeeze/person.svg";
import playbookLogo from "../../assets/photos/terms/playbook-logo.svg";

const Squeeze = () => {
  const { t } = useTranslation();

  const location = useLocation();

  return (
    <main className="pb-[32px]">
      <div
        className={classnames({
          "pt-[40px] bg-no-repeat bg-center bg-cover flex flex-col items-center gap-[5.7vw] 2xl-[2000px]:h-[960px] max-[415px]:h-[900px] max-[415px]:bg-mob-transparent max-[910px]:min-h-[910px] max-lg:bg-tablet-transparent max-lg:min-h-[980px] lg:min-h-[100vh]":
            true,
          "lg:bg-engineering-bckg":
            location.pathname.split("-")[1] === "engineering",
          "lg:bg-entrepreneur-bckg":
            location.pathname.split("-")[1] === "entrepreneur",
          "lg:bg-product-bckg": location.pathname.split("-")[1] === "product",
          "lg:bg-sales-bckg": location.pathname.split("-")[1] === "sales",
        })}>
        <img
          className="hidden lg:block"
          src={playbookLogo}
          alt="playbook-logo"
        />
        <div
          className="flex flex-col items-center w-full 
        min-[325px]:px-[16px] 
        min-[325px]:gap-[32px] 
        md:gap-[48px]
        md:px-[37px] 
        ">
          <div className="flex flex-row gap-[12px] items-center">
            <img
              src={avatar}
              alt="avatar"
              className="
            min-[325px]:w-[40px]
            min-[325px]:h-[40px]
            md:w-[60px]
            md:h-[60px]
            "
            />
            <div className="flex flex-col ">
              <h6
                className=" font-poppins text-list-title font-semibold leading-[36px] 
              min-[325px]:text-[18px]
              min-[325px]:leading-[27px]
              md:text-[24px]
              md:font-medium
              ">
                Jane Cooper
              </h6>
              <span
                className=" font-poppins font-normal text-list-title  tracking-[-0.1px]
              min-[325px]:text-[12px]
              min-[325px]:font-light
              min-[325px]:leading-[15px]
              md:leading-[26px]
              md:font-normal
              md:text-[16px]
              ">
                Sales Manager
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-[3vw] md:items-center 
          min-[325px]:items-center
          min-[325px]:gap-[60px]
          min-[325px]:relative
          md:min-w-[90%]
          md:static
          lg:static
          xl:static
          ">
            <h1
              className="max-w-[56vw] text-list-title text-[56px] font-bold tracking-[-0.01em] text-center leading-[70px] font-poppins
            min-[325px]:min-w-full
            min-[325px]:px-[8px]
            md:min-w-[80%]
            lg:min-w-[56vw]
            max-lg:text-[38px]
            max-lg:leading-[53px]
            max-lg:max-w-[70vw]">
              {location.pathname.split("-")[1] === "sales" &&
                t<string>("SQUEEZE.BEST_SALES")}
              {location.pathname.split("-")[1] === "product" &&
                t<string>("SQUEEZE.BEST_PRODUCT")}
              {location.pathname.split("-")[1] === "engineering" &&
                t<string>("SQUEEZE.BEST_ENGINEERING")}
              {location.pathname.split("-")[1] === "entrepreneur" &&
                t<string>("SQUEEZE.BEST_ENTREPRENEUR")}
            </h1>
            <div
              className=" flex justify-center items-center
              min-[325px]:static
              min-[325px]:flex
              min-[325px]:flex-col
              min-[325px]:gap-[24px]
              max-[1024px]:w-full
              md:relative
              lg-relative
              md:max-w-80%
            ">
              <input
                type="text"
                placeholder={t<string>("COMMON.EMAI_PLACEHOLDER")}
                className="
                min-[325px]:min-w-full
                min-[325px]:px-[52px]
                min-[325px]:py-[16px]
                min-[325px]:font-light
                min-[325px]:rounded-[8px]
                lg:min-w-[44vw] 
                md:py-[23.5px]
                md:px-[52px]
                md:font-normal
                md:min-w-[100%]
                md:rounded-[16px]
                max-lg:min-w-[80vw]
              border-[1px] border-solid border-input-squeeze bg-top-playbook
              shadow-inp-squeeze text-[16px] font-poppins text-inp-squeez-placeholder leading-[21px]
              outline-none max-[1084px]:px-[36px]"
              />
              <img
                className="absolute bottom-[24px] left-[13vw] 
                min-[325px]:bottom-[115px]
                min-[325px]:left-[16px]
                md:bottom-[24px]
                max-lg:left-[6px]
                max-[1084px]:left-[12vw]"
                src={email_icon}
                alt="email_icon"
              />
              <button
                className={classnames({
                  "  rounded-[8px] shadow-free-trial min-[325px]:static min-[325px]:px-[112.5px] min-[325px]:py-[17.5px] min-[325px]:mb-[16px] min-[325px]:min-w-full md:mb-[0px] md:px-[36px] md:right-[6px] md:bottom-[6p] md:absolute md:min-w-[0px]":
                    true,
                  "bg-top-entrepreneur":
                    location.pathname.split("-")[1] === "sales",
                  "bg-term-of-use-head":
                    location.pathname.split("-")[1] === "product" ||
                    location.pathname.split("-")[1] === "entrepreneur",
                  "bg-bg-squeeze-engineering":
                    location.pathname.split("-")[1] === "engineering",
                })}>
                <span
                  className="font-semibold font-poppins text-[16px] leading-[21px] text-list-title
                md:font-medium
                ">
                  {t<string>("SQUEEZE.FREE_TRIAL")}
                </span>
              </button>
            </div>
          </div>
          <span
            className=" md:max-w-none text-center text-[16px] font-poppins font-normal text-list-title leading-[26px] tracking-[-0.1px]
          min-[325px]:max-w-full
          min-[325px]:font-light
          lg:max-w-[48vw]
          ">
            {t<string>("SQUEEZE.TRY_PLAYBOOOK")}
          </span>
        </div>
      </div>
      <div
        className="mt-[4.4vw] px-[7vw] flex flex-col items-center 
      min-[325px]:40px
      min-[325px]:mt-[50px]
      min-[325px]:mb-[40px]
      min-[325px]:gap-[24px]
      md:mb-[60px]
      md:mt-[75px]
      md:gap-[24px]
      lg:mb-[80px]
      ">
        <h1
          className="text-center font-bold leading-[52px] text-home-title font-poppins 
          min-[325px]:text-[28px]
          min-[325px]:leading-[36px]
          md:leading-[52px]
          md:tracking-[-0.1px]
          lg:text-[40px]
          ">
          {t<string>("SQUEEZE.MAXIMIZE_TITLE")}
        </h1>
        <p
          className="font-poppins text-center text-[16px] leading-[26px] text-simple-text
        min-[325px]:max-w-full
        min-[325px]:font-light
        lg:max-w-[34.5vw] 
        ">
          {t<string>("SQUEEZE.MAXIMIZE_DESC")}
        </p>
      </div>
      <ToolsBlock />
      <div
        className="mx-auto max-w-[1880px] flex justify-end items-end
      min-[325px]:h-[35vh]
      min-[325px]:pr-[18px]
      min-[325px]:pl-[17px]
      md:px-[32px]
      md:h-[18vh]
      ">
        <div className=" flex flex-row justify-end gap-[24px] ">
          <span
            className="font-poppins font-normal text-16px leading-[26px] text-squeeze-footer tracking-[-0.1px]
            min-[325px]:font-light
            min-[325px]:tracking-[0.01em]
            md:font-normal
          ">
            {t<string>("COMMON.TERM_SERVICE")}
          </span>
          <span
            className="font-poppins font-normal text-16px leading-[26px] text-squeeze-footer tracking-[-0.1px]
            min-[325px]:font-light
            min-[325px]:tracking-[0.01em]
            md:font-normal
          ">
            {t<string>("COMMON.PRIVACY_POLICY")}
          </span>
        </div>
      </div>
    </main>
  );
};

export default Squeeze;

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../../../../assets/photos/common/logo-footer.svg";
import mail_icon from "../../../../assets/photos/footer/mail-icon.svg";
import facebook from "../../../../assets/photos/footer/facebook.svg";
import youtube from "../../../../assets/photos/footer/youtube.svg";
import twitter from "../../../../assets/photos/footer/twitter.svg";
import facebook_tab from "../../../../assets/photos/footer/facebook-tab.svg";
import youtube_tab from "../../../../assets/photos/footer/youtube-tab.svg";
import twitter_tab from "../../../../assets/photos/footer/twitter-tab.svg";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-footer-main min-h-[638px] flex flex-col items-center gap-[75px] pt-[56px] pb-[11px] ">
      <div className="flex gap-[96px] items-center w-full flex-col  px-[7vw]">
        <img src={logo} alt="logo" />

        <div
          className="flex justify-between w-full gap-[30px] flex-row
          max-sm:flex-col
          max-sm:gap-[80px]
          max-lg:flex-wrap
        ">
          <div className="flex gap-[40px] flex-col flex-1 min-w-max ">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              {t<string>("COMMON.SOLUTIONS")}
            </span>
            <ul
              className="flex flex-col gap-[12px]
            max-sm:gap-[8px]
            ">
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.DISCOVER")}
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.CREATE")}
              </li>
              {/* <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.READLINES")}
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.BRANDED")}
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.AGENCIES")}
              </li> */}
            </ul>
          </div>

          <div className="flex gap-[40px] flex-col flex-1 min-w-max ">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              {t<string>("COMMON.RESOURCES")}
            </span>
            <ul
              className="flex flex-col gap-[12px] max-sm:gap-[8px]">
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                <Link to="/sign-in">
                  {t<string>("COMMON.LOGIN")}
                </Link>                
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                <Link to="/sign-up">
                  {t<string>("COMMON.SIGN_UP")}
                </Link>
              </li>
              {/* <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.NEWSLETTER")}
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.CULTURE")}
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.HOW_TO_WRITE")}
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.CONVOS")}
              </li> */}
            </ul>
          </div>
          <div className="flex gap-[40px] flex-col flex-1 min-w-max ">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              {t<string>("COMMON.LEGAL")}
            </span>
            <ul
              className="flex flex-col gap-[12px]
            max-sm:gap-[8px]
            ">
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.PRIVACY_POLICY")}
              </li>
              <Link
                to="/term-of-use"
                className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                {t<string>("COMMON.TERMS_OF_USE")}
              </Link>
            </ul>
          </div>
          <div className="flex gap-[40px] flex-col flex-2 max-w-[375px]">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              {t<string>("COMMON.SUBSCRIBE")}
            </span>
            <div className="flex gap-[40px] flex-col ">
              <span className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px]">
                {t<string>("COMMON.DISCOUNTS")}
              </span>
              <div className="relative">
                <img
                  src={mail_icon}
                  alt="mail_icon"
                  className=" absolute bottom-[16px] left-[24px] max-[1024px]:left-[12px]
                "
                />
                <input
                  placeholder={t<string>("COMMON.EMAI_PLACEHOLDER")}
                  type="text"
                  className="w-full bg-footer-placeholder py-[15px] px-[48px] rounded-[8px]
                text-copyrights-main leading-[18px] font-normal font-poppins text-[12px] tracking-[-0.01px] min-w-[25vw] xl:min-w-full
                max-[1024px]:px-[36px] outline-none"
                />
                <button
                  className="absolute bg-button-submit-footer py-[7px] px-[26px] rounded-[4px]  bottom-[6px] right-[6px] 
              ">
                  <span className="text-list-title">
                    {t<string>("COMMON.SUBMIT")}
                  </span>
                </button>
              </div>
              <ul className="flex flex-row gap-[24px] lg:items-center">
                {/* <li>
                  <button>
                    <img
                      src={facebook}
                      alt="facebook"
                      className="lg:block hidden"
                    />
                    <img
                      src={youtube_tab}
                      alt="yotube"
                      className="max-lg:block hidden"
                    />
                  </button>
                </li>
                <li>
                  <button>
                    <img
                      src={youtube}
                      alt="youtube"
                      className="lg:block hidden"
                    />
                    <img
                      src={facebook_tab}
                      alt="facebook"
                      className="max-lg:block hidden"
                    />
                  </button>
                </li> */}
                <li>
                  <a href="https://twitter.com/playbookwork" target="blank">
                    <img
                      src={twitter}
                      alt="twitter"
                      className="lg:block hidden"
                    />
                    <img
                      src={twitter_tab}
                      alt="twitter"
                      className="max-lg:block hidden"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t-[1px] border-border-copyrights">
        <span className=" flex justify-center items-center py-[20px] text-copyrights-main border-none  font-poppins">
          ©Playbook 2023, {t<string>("COMMON.RIGHTS")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

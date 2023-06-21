import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import playbookLogo from "../../../../assets/photos/squeeze/mob-logo.svg";
import arrowDown from "../../../../assets/photos/home/arrow-down.svg";

import HeaderProfile from "../../../HeaderProfile";
import useAuth from "../../../../core/hooks/useAuth";
import { LogEvent } from "../../../../core/constants/functions";
import { hotjar } from "react-hotjar";

const Header = () => {
  const { t } = useTranslation();
  const { isAuth } = useAuth();

  return (
    <div className="min-[325px]:hidden lg:flex justify-between items-center px-[7vw] pt-[30px] pb-[20px]">
      <div>
        <div className="flex items-center gap-[64px]">
          <Link to="/home">
            <img src={playbookLogo} alt="playbook" />
          </Link>

          <div className="flex align-middle gap-[32px] items-center">
            {isAuth ? (
              <div>
                <Link
                  to="/main"
                  className="font-poppins font-medium text-header-links text-[15px]"
                >
                  {t<string>("HOME.HOME")}
                </Link>
              </div>
            ) : (
              <>
                {/* <div>
                  <a
                    href="#pricing"
                    className="font-poppins font-medium text-header-links text-[15px]"
                  >
                    {t<string>("COMMON.PRICING")}
                  </a>
                </div> */}
                <Link
                  to="/discover"
                  className="font-poppins font-medium text-header-links text-[15px]
                  "
                >
                  {t<string>("MAIN.DISCOVER")}
                </Link>
                {/* <div>
                  <button
                    className="font-poppins flex items-center gap-3 text-header-links
                  ">
                    <span className="font-poppins font-medium text-[15px]">
                      {t<string>("COMMON.RESOURCES")}
                    </span>
                    <img
                      className="cursor-pointer"
                      src={arrowDown}
                      alt="arrow down"
                    />
                  </button>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>

      {isAuth ? (
        <HeaderProfile />
      ) : (
        <div className="flex gap-[42px]">
          {/* <button className="text-buttons-bg">
            <span className="font-semibold font-poppins leading-[22px]">
              {t<string>("COMMON.SIGN_IN")}
            </span>
          </button> */}
          <Link
            onClick={() => {
              hotjar.event("SplashPage-SignInLink");
              LogEvent("splash-page", "sign-in-link");
            }}
            to="/sign-in"
            className="flex text-buttons-bg
            hover:text-buttons-bg-hover
                active:text-buttons-bg-active
            "
          >
            <span className="self-center font-semibold font-poppins leading-[22px]">
              {t<string>("COMMON.SIGN_IN")}
            </span>
          </Link>
          <Link
            onClick={() => {
              hotjar.event("SplashPage-GetStarted");
              LogEvent("splash-page", "get-started");
            }}
            to="/sign-up"
            className="py-[14px] px-[24px] bg-buttons-bg rounded-[6px] text-buttons-color
            hover:bg-buttons-bg-hover
                active:bg-buttons-bg-active
            "
          >
            <span className="font-semibold font-poppins leading-[22px]">
              {t<string>("COMMON.GET_STARTED")}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

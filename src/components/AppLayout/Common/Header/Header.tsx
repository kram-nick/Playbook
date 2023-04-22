import playbookLogo from "../../../../assets/photos/squeeze/mob-logo.svg";
import arrowDown from "../../../../assets/photos/home/arrow-down.svg";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="min-[325px]:hidden lg:flex justify-between items-center px-[7vw] pt-[30px] pb-[20px]">
      <div>
        <div className="flex items-center gap-[64px]">
          <img src={playbookLogo} alt="playbook" />
          <div className="flex align-middle gap-[32px] items-center">
            <div>
              <button className="font-poppins font-medium text-header-links text-[15px]">
                {t<string>("COMMON.PRICING")}
              </button>
            </div>
            <div>
              <button className="font-poppins flex items-center gap-3 text-header-links">
                <span className="font-poppins font-medium text-[15px]">
                  {t<string>("COMMON.RESOURCES")}
                </span>
                <img
                  className="cursor-pointer"
                  src={arrowDown}
                  alt="arrow down"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[42px]">
        <button className="text-buttons-bg">
          <span className="font-semibold font-poppins leading-[22px]">
            {t<string>("COMMON.SIGN_IN")}
          </span>
        </button>
        <button className="py-[14px] px-[24px] bg-buttons-bg rounded-[6px] text-buttons-color">
          <span className="font-semibold font-poppins leading-[22px]">
            {t<string>("COMMON.GET_STARTED")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;

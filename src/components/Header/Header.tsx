import playbookLogo from "../../assets/photos/squeeze/mob-logo.svg";
import arrowDown from "../../assets/photos/home/arrow-down.svg";

const Header = () => {
  return (
    <div className="min-[325px]:hidden lg:flex justify-between align-middle px-[7vw] pt-[30px] pb-[20px]">
      <div>
        <div className="flex align-middle gap-[64px]">
          <img src={playbookLogo} alt="playbook" />
          <div className="flex align-middle gap-[32px]">
            <div>
              <a className="font-poppins font-medium text-header-links">
                Pricing
              </a>
            </div>
            <div>
              <a className="font-poppins font-medium flex align-middle gap-3 text-header-links">
                <span>Resources</span>{" "}
                <img
                  className="cursor-pointer"
                  src={arrowDown}
                  alt="arrow down"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[42px]">
        <button className="text-buttons-bg">
          <span className="font-semibold font-poppins leading-[22px]">
            Sign in
          </span>
        </button>
        <button className="py-[14px] px-[24px] bg-buttons-bg rounded-[6px] text-buttons-color">
          <span className="font-semibold font-poppins leading-[22px]">
            Get started
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;

import { Link } from "react-router-dom";

import playbookLogo from "../../assets/photos/terms/playbook-logo.svg";
import arrowDown from "../../assets/photos/terms/arrow-down.svg";

const TermsHeader = () => {
  return (
    <div className="hidden lg:flex bg-term-of-use-head justify-between items-center px-[7vw] pt-[30px]">
      <div>
        <div className="flex align-middle gap-[64px]">
          <Link to="/home">
            <img src={playbookLogo} alt="playbook" />
          </Link>
          <div className="flex items-center gap-[32px]">
            <div>
              <a className="font-poppins font-medium text-buttons-color">
                Pricing
              </a>
            </div>
            <div>
              <a className="font-poppins flex items-center font-medium gap-3 text-buttons-color">
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
        <button className="text-buttons-color">
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

export default TermsHeader;

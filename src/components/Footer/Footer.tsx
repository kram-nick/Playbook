import logo from "../../assets/photos/common/logo-footer.svg";
import mail_icon from "../../assets/photos/footer/mail-icon.svg";
import facebook from "../../assets/photos/footer/facebook.svg";
import youtube from "../../assets/photos/footer/youtube.svg";
import twitter from "../../assets/photos/footer/twitter.svg";

const Footer = () => {
  return (
    <footer className="bg-footer-main min-h-[638px] flex flex-col items-center gap-[75px] pt-[56px] pb-[11px] ">
      <div className="flex gap-[96px] items-center w-full flex-col  px-[7vw]">
        <img src={logo} alt="logo" />

        <div className="flex justify-between w-full gap-[30px] flex-row">
          <div className="flex gap-[40px] flex-col flex-1 min-w-max ">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              Solutions
            </span>
            <ul className="flex flex-col gap-[12px]">
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Online Employee Handbook
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Enterprise Policy Management
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                SOC 2 Audit Readlines
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Branded Employee Handbook
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                PEOs and Agencies
              </li>
            </ul>
          </div>

          <div className="flex gap-[40px] flex-col flex-1 min-w-max ">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              Resources
            </span>
            <ul className="flex flex-col gap-[12px]">
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Blog
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Request a Demo
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Newsletter
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Culture Handbooks
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                How to Write Policies
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Awkward HR Convos
              </li>
            </ul>
          </div>
          <div className="flex gap-[40px] flex-col flex-1 min-w-max ">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              Legal
            </span>
            <ul className="flex flex-col gap-[12px]">
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Personalized Handbook
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Policy Communication
              </li>
              <li className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px] ">
                Manager Participation
              </li>
            </ul>
          </div>
          <div className="flex gap-[40px] flex-col flex-2 max-w-[375px]">
            <span className="font-poppins text-list-title font-semibold leading-[27px] text-[18px] capitalize">
              Subscribe to our new
            </span>
            <div className="flex gap-[40px] flex-col relative">
              <span className="text-copyrights-main leading-[26px] font-normal font-poppins text-[16px] tracking-[-0.01px]">
                Be the first one to know about discounts, offers and events.
                Unsubscribe whenever you like.
              </span>
              <img
                src={mail_icon}
                alt="mail_icon"
                className=" absolute bottom-[71px] left-[24px] max-[1024px]:left-[12px]"
              />
              <input
                placeholder="Enter your email"
                type="text"
                className="bg-footer-placeholder py-[15px] px-[48px] rounded-[8px]
                text-copyrights-main leading-[18px] font-normal font-poppins text-[12px] tracking-[-0.01px] min-w-[25vw] xl:min-w-full
                max-[1024px]:px-[36px]
                "
              />
              <button className="absolute bg-button-submit-footer py-[7px] px-[26px] rounded-[4px]  bottom-[60px] right-[6px] ">
                <span className="text-list-title">Submit</span>
              </button>
              <ul className="flex flex-row gap-[24px] items-center">
                <li>
                  <a>
                    <img src={facebook} alt="facebook" />
                  </a>
                </li>
                <li>
                  <a>
                    <img src={youtube} alt="youtube" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/playbookwork" target="blank">
                    <img src={twitter} alt="twitter" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t-[1px] border-border-copyrights">
        <span className=" flex justify-center items-center py-[20px] text-copyrights-main border-none  ">
          ©Playbook 2023, All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;

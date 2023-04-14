import email_icon from "../../assets/photos/squeeze/email.svg";
import logo from "../../assets/photos/terms/playbook-logo.svg";
import avatar from "../../assets/photos/squeeze/person.svg";

import ToolsBlock from "../ToolsBlock/ToolsBlock";
import Mobile from "../Header/Mobile";

const Squeeze = () => {
  return (
    <main className="pb-[32px]">
      <Mobile />
      <div
        className="pt-[40px] bg-no-repeat bg-center bg-cover 
      min-[325px]:pt-[46px] 
      min-[325px]:bg-mob-transparent 
      min-[325px]:h-[858px]
      min-[325px]:pb-[100px]
      min-[400px]:h-[102vh]
      min-[500px]:h-[100vh]
      min-[500px]:bg-transparent
      min-[600px]:h-[73vh]
      md:h-[100vh]
      md:bg-transparent
      lg:bg-term-back
      md:pb-[202px]
      min-[1600px]:h-[88vh] 
      min-[1700px]:h-[88vh] 
      min-[1900px]:h-[78vh] 
      
       flex flex-col items-center gap-[5.7vw]">
        <img className="hidden lg:block" src={logo} alt="playbook-logo" />
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
              The best Sales playbooks helps you win.
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
                placeholder="Enter your email"
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
                md:bottom-[23px]
                max-lg:left-[6px]
                max-[1084px]:left-[12vw]"
                src={email_icon}
                alt="email_icon"
              />
              <button
                className="bg-top-entrepreneur  rounded-[8px] shadow-free-trial
              min-[325px]:static
              min-[325px]:px-[112.5px]
              min-[325px]:py-[17.5px]
              min-[325px]:mb-[16px]
              min-[325px]:min-w-full
              md:mb-[0px]
              md:px-[36px]
              md:right-[6px]
              md:bottom-[6p]
              md:absolute
              md:min-w-[0px]
              ">
                <span
                  className="font-semibold font-poppins text-[16px] leading-[21px] text-list-title
                md:font-medium
                ">
                  Start Free Trial
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
            Try Playbook free for 3 days, no credit card required. By entering
            your email, you agree to receive marketing emails from Shopify.
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
          Build playbooks to maximize efficiency
        </h1>
        <p
          className="font-poppins text-center text-[16px] leading-[26px] text-simple-text
        min-[325px]:max-w-full
        min-[325px]:font-light
        lg:max-w-[34.5vw] 
        ">
          Using these proven design tools, we mae sure our clients receive the
          result they expect within the set timeframe.
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
            Term of Service
          </span>
          <span
            className="font-poppins font-normal text-16px leading-[26px] text-squeeze-footer tracking-[-0.1px]
            min-[325px]:font-light
            min-[325px]:tracking-[0.01em]
            md:font-normal
          ">
            Privacy Policy
          </span>
        </div>
      </div>
    </main>
  );
};

export default Squeeze;

import { useTranslation } from "react-i18next";
import logo from "../../assets/photos/sign/logo.svg";
import icon_google from "../../assets/photos/sign/g_logo.svg";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex mx-auto  min-h-[calc(100vh-102px)] font-poppins max-lg:min-h-[calc(100vh-61px)]">
      <div className="flex bg-cover bg-no-repeat bg-left-bottom justify-center  w-[46%] max-lg:bg-sign max-lg:w-[100%] 
        py-[50px] px-[100px] max-sm:px-[16px] max-sm:py-[24px]">
        <form className="self-center w-full max-w-[425px] max-lg:bg-white 
          max-lg:px-[48px] max-lg:py-[60px] max-sm:px-[16px] max-sm:py-[24px] max-sm:rounded-[8px]">
          <h1
              className="text-[24px] text-home-title text-center leading-normal mb-[32px] font-semibold">
              {t<string>("SIGN.IN")}
          </h1>     

          <button
            className="flex justify-center w-full mb-[32px] py-[10px] px-[26px] 
            rounded-[5px] shadow-free-trial
            border-solid border-[1px]  border-r-header-bottom
          ">
            <img src={icon_google} alt="" className="mr-[8px]" />
            <span className="text-[16px] text-home-title font-medium">
              {t<string>("SIGN.GOOGLE")}
            </span>
          </button>  

          <div className="text-center mb-[32px] flex justify-center items-center">
            <div className="flex-[1] bg-header-bottom h-[1px]"></div>
            <span className="text-[14px] leading-[20px] px-[12px] bg-white">{t<string>("SIGN.OR")}</span>
            <div className="flex-[1] bg-header-bottom h-[1px]"></div>
          </div>        

          <div className="form-group mb-[24px]">
            <label htmlFor="email" className="block text-[14px] text-home-title leading-[20px] mb-[6px]">{t<string>("SIGN.EMAIL")}</label>
            <input
              placeholder={t<string>("SIGN.EMAIL_PLACEHOLDER")}
              id="email"
              type="text"
              className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
              border-solid border-[1px] shadow-free-trial w-[100%]
              leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            />
          </div>

          <div className="form-group mb-[24px]">
            <label htmlFor="password" className="block text-[14px] text-home-title leading-[20px] mb-[6px]">
              {t<string>("SIGN.PASSWORD")}</label>
            <input
              placeholder={t<string>("SIGN.PASSWORD_PLACEHOLDER")}
              id="password"
              type="text"
              className="py-[10px] px-[16px] rounded-[5px]  placeholder:text-input-paceholder
              border-solid border-[1px] shadow-free-trial w-[100%]
              leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border"
            />
          </div>     

          <div className="flex justify-between items-center mb-[32px]">
            <div className="flex">
              <input type="checkbox" id="remember-me" className="opacity-0 absolute h-[20px] w-[20px]" />  
              <div className="bg-white border-[1px] border-input w-[20px] h-[20px] mr-[8px] rounded-[5px] cursor-pointer flex 
                flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">  
                <svg className="fill-current hidden w-[20px] h-[20px] p-[4px] rounded-[5px] pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">  
                  <g fill="none"  >  
                    <g transform="translate(-9 -11)" fill="#fff" >  
                      <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />  
                    </g>  
                  </g>  
                </svg>  
              </div>                
              <label htmlFor="remember-me" className="text-[16px] leading-[20px] tracking-[-0.1px] cursor-pointer">{t<string>("SIGN.KEEP_ME")}</label>
            </div>    

            <Link  to="/reset-password" className="text-[14px] leading-[18px] text-buttons-bg font-medium"> 
              {t<string>("SIGN.FORGOT")}
            </Link> 
          </div>     
 
          <button
            className="bg-button-submit-footer py-[10px] px-[26px] rounded-[6px] 
           w-full mb-[24px]
          ">
            <span className="text-list-title">
              {t<string>("SIGN.IN")}
            </span>
          </button>
          <p className="">
            <span className="text-[16px] leading-[26px] text-simple-text tracking-[-0.1px] mr-[12px]">{t<string>("SIGN.DONT_HAVE")}</span>
            <Link  to="/sign-up" className="text-[14px] leading-[18px] text-buttons-bg font-medium"> 
              {t<string>("SIGN.REGISTER")}
            </Link> 
          </p>
        </form>
      </div>
      <div className="flex bg-no-repeat bg-left-bottom bg-cover justify-center  bg-sign w-[54%] max-lg:hidden">
          <div className="text-center self-center">
            <p className="text-buttons-color uppercase text-[24px]  leading-normal mb-1">
                {t<string>("SIGN.WELCOME")}
            </p>
            <img src={logo} alt="logo" className="w-full max-w-[500px]" />
            <p className="mt-4 text-buttons-color text-[16px]  leading-normal tracking-[-0.1px]">
                {t<string>("SIGN.GET_STARTED")}
            </p>            
          </div>

      </div>
  </div>
  )
};

export default SignIn;

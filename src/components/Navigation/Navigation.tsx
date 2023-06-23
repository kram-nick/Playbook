import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const HandlePrev = () => {
    if (location.pathname !== "/main") {
      navigate(-1);
    }
  };

  const HandleNext = () => {
    navigate(1);
  };

  return (
    <div className="fixed w-full flex flex-row justify-center bottom-[80px] gap-[10px] ">
      <button
        onClick={HandlePrev}
        className="px-[20px] py-[10px] bg-list-title min-w-[180px] rounded-[6px] border-[1px] border-solid border-header-bottom text-buttons-bg hover:text-buttons-bg-hover active:text-buttons-bg-active">
        <span className="font-poppins font-normal  text-[18px] leading-[26px] tracking-[-0.1px]">
          {t<string>("COMMON.PREV")}
        </span>
      </button>
      <button
        onClick={HandleNext}
        className="px-[20px] py-[10px] bg-list-title min-w-[180px] rounded-[6px] border-[1px] border-solid border-header-bottom text-buttons-bg hover:text-buttons-bg-hover active:text-buttons-bg-active">
        <span className="font-poppins font-normal  text-[18px] leading-[26px] tracking-[-0.1px]">
          {t<string>("COMMON.NEXT")}
        </span>
      </button>
    </div>
  );
};

export default Navigation;

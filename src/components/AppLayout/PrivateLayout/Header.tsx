import { useTranslation } from "react-i18next";

import next from "../../../assets/photos/create/right-arrow-inactive.svg";
import prev from "../../../assets/photos/create/left-arrow-active.svg";
import preview from "../../../assets/photos/create/preview.svg";
import add_user from "../../../assets/photos/create/add-user.svg";
import { useAppSelector } from "../../../core/hooks/useRedux";

const Header = () => {
  const { t } = useTranslation();
  const { title } = useAppSelector((state) => state.app.data);

  return (
    <header className="py-[12.5px] flex items-center border-b-[1px]  ">
      <nav className="bg-tools-block w-full flex flex-row  justify-between pl-[24px] pr-[32px] items-center py-[14px]">
        <div className="flex flex-row items-center gap-[8px]">
          <div className="flex flex-row items-center">
            <button className="cursor-pointer">
              <img src={prev} alt="prev" />
            </button>
            <button className="cursor-pointer">
              <img src={next} alt="next" />
            </button>
          </div>
          <span className="font-poppins font-medium text-[16px] leading-[20.8px] text-home-title">
            {title}
          </span>
          <span className="font-poppins font-normal text-simple-text leading-[20px] tracking-[-0.1px]">
            ({t<string>("COMMON.DRAFT")})
          </span>
        </div>
        <div className="flex flex-row gap-[28px] rounded-[5px] items-center">
          <button className="flex flex-row gap-[4px] items-center cursor-pointer">
            <span className="font-poppins text-[16px] text-nav-txt-private font-medium leading-[20.8px]">
              {t<string>("COMMON.PREVIEW")}
            </span>
            <img src={preview} alt="preview" />
          </button>
          <button className="flex flex-row gap-[4px] items-center cursor-pointer">
            <span className="font-poppins text-[16px] text-nav-txt-private font-medium leading-[20.8px]">
              {t<string>("COMMON.SHARE")}
            </span>
            <img src={add_user} alt="add-user" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

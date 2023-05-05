import { useTranslation } from "react-i18next";
import empty from "../../assets/photos/profile/icon-empty.svg";

const ProfileEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-[52px]">
      <div className="flex justify-center mb-[24px]">
        <img className="max-w-[100%] max-h-[177px]" src={empty} alt="" />
      </div>
      <div className="text font-poppins text-center">
        <p className="text-[20px] leading-[28px] mb-[16px] font-medium text-home-title leading-[28px]">
          {t<string>("PROFILE.EMPTY")}
        </p>
        <p className="text-[16px] text-simple-text leading-[26px] tracking-[-0.1px]">
          {t<string>("PROFILE.VIEW_OTHER")}
        </p> 
      </div>
    </div>
  );
};

export default ProfileEmpty;

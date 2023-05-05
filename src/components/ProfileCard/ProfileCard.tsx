import { useTranslation } from "react-i18next";
import avatar from "../../assets/photos/profile/avatar.svg";

const ProfileCard = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex items-start bg-white rounded-[8px] p-[24px] gap-[16px] border-[1px] 
        border-solid border-header-bottom">
      <div className="w-[120px] h-[120px] rounded-[50%] overflow-hidden relative">
        <img className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]" src={avatar} alt="" />
      </div>
      <div className="text font-poppins">
        <h2 className="text-[24px] mb-[6px] font-bold text-home-title leading-normal">Christopher Ragobeer</h2>
        <p className="text-[20px] mb-[16px] font-medium text-simple-text leading-[28px] tracking-[-0.1px]">@mrragobeer</p>
        <p className="text-[20px] text-home-title leading-[32px] tracking-[-0.1px]">Stay humble. Work hard. Be kind.</p>
      </div>
    </div>
  );
};

export default ProfileCard;

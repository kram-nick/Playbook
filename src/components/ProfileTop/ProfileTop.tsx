import { useTranslation } from "react-i18next";
import avatar from "../../assets/photos/profile/avatar.svg";

type Props = {
  profile: any;
};

const ProfileTop: React.FC<Props> = ({ profile }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex items-start bg-white rounded-[8px] p-[24px] gap-[16px] border-[1px] 
        border-solid border-header-bottom max-[690px]:flex-wrap max-[690px]:px-[16px] max-[690px]:py-[20px]"
    >
      <div className="w-[120px] h-[120px] rounded-[50%] overflow-hidden relative">
        {profile?.data?.user?.profile_image ? (
          <img
            className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
            src={profile?.data?.user?.profile_image}
            alt=""
          />
        ) : (
          <img
            className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
            src={avatar}
            alt=""
          />
        )}
      </div>
      <div className="text font-poppins max-[690px]:w-[100%]">
        <h2 className="text-[24px] mb-[6px] font-bold text-home-title leading-normal max-[690px]:text-[20px]">
          {`${profile?.data?.user?.first_name} ${profile?.data?.user?.last_name}`}
        </h2>
        <p
          className="text-[20px] mb-[16px] font-medium text-simple-text leading-[28px] tracking-[-0.1px] 
          max-[690px]:text-[16px]"
        >
          {`@${profile?.data?.user?.username}`}
        </p>
        <p
          className="text-[20px] text-home-title leading-[32px] tracking-[-0.1px] max-[690px]:text-[16px]
          max-[690px]:leading-[26px]"
        >
          {profile?.data?.user?.bio}
        </p>
      </div>
    </div>
  );
};

export default ProfileTop;

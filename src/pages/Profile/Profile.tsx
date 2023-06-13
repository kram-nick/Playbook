import { Link, useParams } from "react-router-dom";
import AppHeader from "../../components/AppHeader";

import arrow_bread from "../../assets/photos/profile/right.svg";
import ProfileEmpty from "../../components/ProfileEmpty";
import ProfileCardsList from "../../components/ProfileCardsList";
import ProfileTop from "../../components/ProfileTop";
import { playbooks } from "../../core/constants/sidebar";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { username } = useParams();
  const { t } = useTranslation();

  const { fetchedData: profile } = useHttpGet<any>(
    `${APIRoutes.USERS_PUBLIC_PROFILE}?username=${username}`,
    {
      resolve: (response: any) => {
        if (response) {
          console.log(response);
        }
      },
      dependencies: [],
    }
  );

  return (
    <div className="bg-create-bg-main min-h-[100vh] w-[100%]">
      <AppHeader profile={true} />

      <div className="max-w-[1230px] px-[15px] mx-[auto]">
        <ul className="breadcrumb flex items-center flex-wrap font-poppins pt-[24px] pb-[20px]">
          <li className="flex items-center gap-[4px]  mb-[4px]">
            <Link
              to="/main"
              className="text-[14px] leading-[20px] tracking-[-0.1px] text-nav-txt-private"
            >
              Main Page
            </Link>
            <img src={arrow_bread} alt="" />
          </li>
          <li className="flex items-center text-[14px] leading-[20px] tracking-[-0.1px] mb-[4px] text-nav-txt-private">
            {`${profile?.data?.user?.first_name}’ ${t<string>(
              "PROFILE.PLAYBOOKS"
            )}`}
          </li>
        </ul>
        <div className="title text-[32px] mb-[32px] font-bold text-home-title leading-[1.3] max-[690px]:text-[26px]">
          {`${profile?.data?.user?.first_name}’ ${t<string>(
            "PROFILE.PLAYBOOKS"
          )}`}
        </div>

        <div className="max-w-[790px] mx-[auto]">
          <ProfileTop profile={profile} />

          {playbooks.length === 0 ? (
            <ProfileEmpty />
          ) : (
            <ProfileCardsList profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

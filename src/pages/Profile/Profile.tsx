import { Link } from "react-router-dom";
import AppHeader from "../../components/AppHeader"; 

import arrow_bread from "../../assets/photos/profile/right.svg"; 
import ProfileEmpty from "../../components/ProfileEmpty";
import ProfileCardsList from "../../components/ProfileCardsList"; 
import ProfileTop from "../../components/ProfileTop";
import { playbooks } from "../../core/constants/sidebar";

const Profile = () => {
  return (
    <div className="bg-create-bg-main min-h-[100vh] w-[100%]">
      <AppHeader profile={true} /> 

      <div className="max-w-[1230px] px-[15px] mx-[auto]">
        <ul className="breadcrumb flex items-center flex-wrap font-poppins pt-[24px] pb-[20px]">
          <li className="flex items-center gap-[4px]  mb-[4px]">
            <Link to="/main" className="text-[14px] leading-[20px] tracking-[-0.1px] text-nav-txt-private">
              Main Page
            </Link>
            <img src={arrow_bread} alt="" />
          </li>
          <li className="flex items-center text-[14px] leading-[20px] tracking-[-0.1px] mb-[4px] text-nav-txt-private">
            Chris’ Playbooks
          </li>
        </ul>
        <div className="title text-[32px] mb-[32px] font-bold text-home-title leading-[1.3] max-[690px]:text-[26px]">Chris’ Playbooks</div>

        <div className="max-w-[790px] mx-[auto]">
          <ProfileTop />

          {playbooks.length === 0 ? (
            <ProfileEmpty />
          ) :(
            <ProfileCardsList />
          )}
           
        </div>
      </div>
    </div>
  );
};

export default Profile;

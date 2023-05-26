import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import classNames from "classnames";

import arrow_down from "../../assets/photos/main/arrow-down.svg";
import icon_logout from "../../assets/photos/home/logout.svg";
import icon_settings from "../../assets/photos/main/setting.svg";
import { useTranslation } from "react-i18next";
import { UIRoutes } from "../../core/router";
import useOutside from "../../core/hooks/useOutside";
const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

const HeaderProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = getUser();
  const [openDropmenu, setOpen] = useState(false);
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleOpen = () => {
    setIsShow(!isShow);
  };

  const handleToggle = () => {
    setOpen(!openDropmenu);
  };

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/" + UIRoutes.HOME);
    }, 100);
  };

  return (
    <div className="user flex items-center relative">
      <div onClick={handleToggle} className="relative w-[40px] cursor-pointer">
        <div
          className={classNames({
            "photo bg-center bg-no-repeat bg-without-photo relative w-[40px] h-[40px] rounded-[50%] overflow-hidden":
              true,
            "bg-top-entrepreneur": !user.profile_image,
          })}>
          {user && user.profile_image ? (
            <img
              className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
              src={user.profile_image}
              alt=""
            />
          ) : (
            ""
          )}
        </div>
        <div
          className="status absolute border-solid border-[2px] border-buttons-color 
          rounded-[50%] border-bg-white bg-checkbox-bg w-[14px] h-[14px] bottom-[-3px]
          right-[-2px]"></div>
      </div>

      <div
        onClick={handleToggle}
        className="text gap-y-[2px] grid max-sm:hidden ml-[8px] cursor-pointer">
        {user && user.first_name ? (
          <p className="text-[12px] font-inter font-medium text-home-title leading-[12px]">
            {user.first_name} {user.last_name}
          </p>
        ) : (
          ""
        )}
        {user && user.email ? (
          <p className="text-[10px] font-poppins font-normal text-simple-text leading-[16px] truncate max-w-[160px]">
            {user.email}
          </p>
        ) : (
          ""
        )}
      </div>
      <button
        onClick={handleOpen}
        className={classNames({
          "min-[1024px]:bg-card-border ml-[5px]": isShow,
          "max-sm:hidden w-[30px] h-[30px] rounded-[8px] flex items-center justify-center":
            true,
        })}>
        <img src={arrow_down} alt="" />
      </button>

      {isShow && (
        <div
          className="menu absolute right-[0] min-[1024px]:top-[calc(100%+9px)] bg-white 
          border-[1px] border-solid border-header-bottom shadow-dropmenu rounded-[8px] min-w-[196px]">
          <Link
            to="/settings"
            className="menu-item flex items-center p-[12px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border">
            <img src={icon_settings} alt="" className="w-[24px] h-[24px]" />
            <span className="text-[16px] font-medium text-simple-text leading-[20px]">
              {t<string>("MAIN.ACC_SETTINGS")}
            </span>
          </Link>
          <li
            onClick={logout}
            className="menu-item flex items-center p-[12px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border">
            <img src={icon_logout} alt="" className="w-[24px] h-[24px]" />
            <span className="text-[16px] font-medium text-simple-text leading-[20px]">
              {t<string>("MAIN.LOGOUT")}
            </span>
          </li>
        </div>
      )}
    </div>
  );
};

export default HeaderProfile;

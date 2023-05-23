import { useTranslation } from "react-i18next";
import { User } from "../../core/constants";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";

import search_icon from "../../assets/photos/main/search.svg";
import arrow_down from "../../assets/photos/main/arrow-down.svg";
import icon_burger from "../../assets/photos/common/burger.svg";
import playbookLogo from "../../assets/photos/squeeze/mob-logo.svg";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import {
  setSearch,
  setToggleSidebar,
} from "../../core/store/reducers/app/appDataSlice";
import HeaderProfile from "../HeaderProfile";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";

type HeaderProps = {
  profile?: boolean;
};

const AppHeader = ({ profile }: HeaderProps) => {
  const { t } = useTranslation();
  const { search, sideOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const onSubmit = (event: any) => {
    event.preventDefault();
    const target = event.target;
    const data = {
      search: target.search.value,
    };

    dispatch(setSearch(data.search));

    // if(data.email){
    //   setEmail(data.email);
    // } else {
    //   setEmail('chrisragobeer@gmail.com');
    // }
  };

  return (
    <header
      className="py-[14px] px-[24px]   border-b-[1px] bg-tools-block  
      max-lg:py-[8px] max-lg:px-[32px]  max-sm:px-[16px] max-sm:gap-[12px]">
      <div
        className={classNames({
          "flex items-center justify-between mx-[auto]": true,
          "max-w-[1200px]": profile,
        })}>
        <div className="flex items-center max-[690px]:w-[calc(100%-60px)]">
          {profile ? (
            <Link
              to="/home"
              className="mr-[32px] min-w-[160px] block max-[690px]:hidden">
              <img src={playbookLogo} alt="playbookLogo" />
            </Link>
          ) : (
            <div
              onClick={() => dispatch(setToggleSidebar(!sideOpen))}
              className="absolute flex items-center justify-center w-[32px] h-[32px] 
              top-[14px] left-[28px] min-[1024px]:hidden cursor-pointer max-sm:left-[12px]">
              <img src={icon_burger} alt="" />
            </div>
          )}

          <form
            onSubmit={onSubmit}
            className={classNames({
              "max-w-[350px] w-[100%] relative": true,
              "max-[690px]:ml-[0px]": profile,
              "max-lg:ml-[48px]": !profile,
            })}>
            <button
              type="submit"
              className="absolute left-[12px] top-[11px] w-[24px]">
              <img src={search_icon} alt="" />
            </button>

            <input
              placeholder={t<string>("MAIN.SEARCH_PLACEHOLDER")}
              type="text"
              id="search"
              className="py-[10px] pl-[48px] pr-[12px] h-[46px] rounded-[8px]  placeholder:text-simple-text
              border-solid border-[1px] w-[100%] bg-search-input
              leading-[18px] font-normal font-poppins text-[16px] tracking-[-0.01px] outline-none box-border max-lg:h-[44px]"
            />
          </form>
        </div>

        <HeaderProfile />
      </div>
    </header>
  );
};

export default AppHeader;

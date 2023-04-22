import { useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { favourites, playbooks } from "../../core/constants/sidebar";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import { setSelectedData } from "../../core/store/reducers/app/appDataSlice";

import playbookLogo from "../../assets/photos/squeeze/mob-logo.svg";
import to_arrow from "../../assets/photos/create/to-arrow.svg";
import active_arrow from "../../assets/photos/create/open-arrow.svg";
import plus from "../../assets/photos/create/plus.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";

const Sidebar = () => {
  const [showPlaybooks, setShowPlaybooks] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);

  const { data } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handlePlaybooks = () => {
    setShowPlaybooks(!showPlaybooks);
  };

  const handleFavourites = () => {
    setShowFavourites(!showFavourites);
  };

  return (
    <div className="bg-list-title min-w-[280px] px-[12px] border-solid border-r-[1px]  border-r-header-bottom gap-[21.4px] ">
      <img className="py-[16px]" src={playbookLogo} alt="playbookLogo" />
      <nav className="flex flex-col  gap-[24px]">
        <button
          onClick={handlePlaybooks}
          className="flex flex-row items-center justify-between my-[4px] px-[8px] py-[11px] ">
          <span className="flex flex-row items-center gap-[8px] font-manrope text-[16px] font-semibold leading-[21.86px] text-home-title ">
            <img src={showPlaybooks ? active_arrow : to_arrow} alt="arrow" />
            {t<string>("COMMON.PLAYBOOKS")}
          </span>
          <img src={plus} alt="plus" />
        </button>
        {showPlaybooks && (
          <ul className="flex flex-col gap-[4px] mt-[8px] w-full">
            {playbooks.map((playbook: any, index: number) => (
              <button
                key={playbook.id}
                onClick={() =>
                  dispatch(
                    setSelectedData({
                      id: index,
                      selected: true,
                      title: playbook.title,
                    })
                  )
                }
                className={classNames({
                  "flex flex-row px-[8px] py-[6px] gap-[8px] items-center":
                    true,
                  "bg-active-playbook border-l-[2px] border-top-engineering rounded-[4px] pl-[6px]":
                    playbook.id === data.id,
                })}>
                <img src={index > 2 ? red_saas : blue_saas} alt="saas" />
                <span
                  className={classNames({
                    "font-poppins font-normal text-top-sub-secondary text-[16px] leading-[26px] tracking-[-0.1px]":
                      true,
                    "text-top-engineering": playbook.id === data.id,
                  })}>
                  {playbook.title}
                </span>
              </button>
            ))}
          </ul>
        )}
        <hr />
        <button
          onClick={handleFavourites}
          className="flex flex-row items-center justify-between my-[4px] px-[8px] py-[11px] ">
          <span className="flex flex-row items-center gap-[8px] font-manrope text-[16px] font-semibold leading-[21.86px] text-home-title ">
            <img src={showFavourites ? active_arrow : to_arrow} alt="arrow" />
            {t<string>("COMMON.FAVOURITES")}
          </span>
          <img src={plus} alt="plus" />
        </button>
        {showFavourites && (
          <ul className="flex flex-col gap-[4px] pt-[8px]">
            {favourites.map((playbook: any, index: number) => (
              <button
                key={playbook.id}
                onClick={() =>
                  dispatch(
                    setSelectedData({
                      id: playbook.id,
                      selected: true,
                      title: playbook.title,
                    })
                  )
                }
                className={classNames({
                  "flex flex-row px-[8px] py-[6px] gap-[8px] items-center":
                    true,
                  "bg-active-playbook border-l-[2px] border-top-engineering rounded-[4px] pl-[6px]":
                    playbook.id === data.id,
                })}>
                <img src={index > 2 ? red_saas : blue_saas} alt="saas" />
                <span
                  className={classNames({
                    "font-poppins font-normal text-top-sub-secondary text-[16px] leading-[26px] tracking-[-0.1px]":
                      true,
                    "text-top-engineering": playbook.id === data.id,
                  })}>
                  {playbook.title}
                </span>
              </button>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

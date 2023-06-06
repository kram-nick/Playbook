import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import useOutside from "../../core/hooks/useOutside";
import Playbook from "../../core/interface/playbook";
import PlaybookService from "../../core/services/playbook.service";
import {
  setSelectedData,
  setSelectedPlaybook,
  setSelectedTab,
  setSidebarTabs,
} from "../../core/store/reducers/app/appDataSlice";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import { Modal } from "../../core/models/enums";
import useModal from "../../core/hooks/useModal";

import poster from "../../assets/photos/main/image-poster.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";
import dots from "../../assets/photos/main/dots.svg";
import star from "../../assets/photos/main/star.svg";
import star_mobile from "../../assets/photos/main/star-mobile.svg";
import star_active from "../../assets/photos/main/star-active.svg";
import icon_preview from "../../assets/photos/main/icon-play.svg";
import icon_share from "../../assets/photos/main/icon-share.svg";
import icon_sale from "../../assets/photos/main/icon-sale.svg";
import icon_sale_unactive from "../../assets/photos/main/icon-sale-gray.svg";
import icon_settings from "../../assets/photos/main/setting.svg";
import icon_delete from "../../assets/photos/main/delete.svg";

import {
  setPlaybookType,
  setReloadChecker,
  setSharedId,
} from "../../core/store/reducers/helpers/helpersDataSlice";
import { useState } from "react";

type CardProps = {
  items: Array<Playbook>;
  playbook: any;
  index: number;
  tabType?: number;
};

const AppMainCard: React.FC<CardProps> = ({ playbook, tabType }) => {
  const [isSale, setIsSale] = useState(false);

  const { t } = useTranslation();

  const { ref, isShow, setIsShow } = useOutside(false);
  const navigate = useNavigate();
  const { openModal } = useModal();

  const dispatch = useAppDispatch();

  const { listType, sidebarTabs } = useAppSelector((state) => state.app);
  const { reloadChecker } = useAppSelector((state) => state.helpers);

  const SetFavorite = async (id: any, favorited: boolean) => {
    const favorite = favorited ? 0 : 1;
    try {
      await PlaybookService.UpdatePlaybook({
        ...playbook,
        favorited: Boolean(favorite),
      });
      dispatch(setReloadChecker(!reloadChecker));
      toast.success(t<string>("MAIN.UPDATE_SUCCESS"));
    } catch (errors: any) {
      for (let error in errors?.response?.data?.errors) {
        toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
      }
    }
  };

  const HandleOpen = () => {
    setIsShow(!isShow);
  };

  const HandleDelete = () => {
    setIsShow(false);
    dispatch(setSharedId(playbook.id));
    dispatch(setPlaybookType("edit"));
    openModal(Modal.PLAYBOOK_DELETE);
  };

  const HandleDetails = () => {
    setIsShow(false);
    dispatch(setSharedId(playbook.id));
    dispatch(setPlaybookType("edit"));
    openModal(Modal.PLAYBOOK_DETAILS);
  };

  const HandleShare = () => {
    openModal(Modal.PLAYBOOK_SHARE);
  };

  const handleSale = () => {
    openModal(Modal.PLAYBOOK_SALE);
    dispatch(setSharedId(playbook.id));
  };

  const HandlePublish = async () => {
    if (playbook.status !== "published") {
      try {
        await PlaybookService.PublishPlaybook(playbook.id);
        dispatch(setReloadChecker(!reloadChecker));
        toast.success(t<string>("MAIN.PUBLISHED_SUCCESS"));
      } catch (errors: any) {
        for (let error in errors?.response?.data?.errors) {
          toast.error(`${error} ${errors?.response?.data?.errors[error]}`);
        }
      }
    }
  };

  const OpenPlaybook = () => {
    const setData = {
      id: playbook.id,
      selected: true,
      open: true,
      name: playbook?.name,
      type: "my",
      status: playbook?.status,
    };
    if (!sidebarTabs.includes(Number(tabType))) {
      dispatch(setSidebarTabs([...sidebarTabs, Number(tabType)]));
    }
    dispatch(
      setSelectedPlaybook({
        id: playbook.id,
        tabType: Number(tabType),
      })
    );
    dispatch(setSelectedData(setData));
    localStorage.setItem("selected_page", JSON.stringify(setData));
    navigate(`/creating/${playbook.id}`);
  };

  return (
    <div
      className={classNames({
        "flex flex-col w-[calc(25%-15px)] max-xl:w-[calc(33.33%-16px)] max-[690px]:w-[100%]":
          listType,
        "pl-[56px] pr-[12px] py-[12px]": !listType,
        "flex flex-wrap bg-white rounded-[8px] border-[1px] border-solid card-border relative":
          true,
      })}
    >
      <p
        onClick={OpenPlaybook}
        className={classNames({
          "w-[100%] h-[180px] rounded-t-[8px] cursor-pointer": listType,
          "w-[40px] h-[40px] rounded-[4px]": !listType,
          "photo relative left-[-1px] top-[-1px] right-[-1px] overflow-hidden bg-card-border cursor-pointer":
            true,
        })}
      >
        {playbook.header_url && (
          <img
            src={playbook.header_url}
            alt=""
            className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
          />
        )}
      </p>

      <div
        className={classNames({
          "pl-[8px] pr-[70px] py-[12px] relative max-lg:pr-[25px] flex-1":
            listType,
          "w-[calc(100%-40px)]": !listType,
          "item-content flex flex-wrap items-start font-poppins w-[100%]": true,
        })}
      >
        {listType && (
          <Link
            to={`/profile`}
            className="icon w-[28px] h-[28px] overflow-hidden relative rounded-[50%]"
          >
            <img
              src={playbook.profile_image ? playbook.profile_image : red_saas}
              alt="saas"
              className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
            />
          </Link>
        )}

        <div
          className={classNames({
            "flex flex-col justify-between w-[calc(100%-34px)] h-full":
              listType,
            "text pl-[12px]": true,
          })}
        >
          <span
            onClick={OpenPlaybook}
            className="text-[16px] font-medium mb-[4px] leading-[20px] text-home-title cursor-pointer"
          >
            {playbook.name}
          </span>
          <p className="text-[12px] leading-normal text-input-paceholder flex flex-row items-end">
            {/* {playbook.profile_first_name && (
              <span className="truncate max-w-[calc(100%-60px)] inline-block"> */}

            {/* </span>
            )}
  */}
            <Link className="mr-[4px] w-[fit-content]" to={`/profile`}>
              {playbook.profile_first_name
                ? `${playbook.profile_first_name} `
                : ""}
              {playbook.profile_last_name ? playbook.profile_last_name : ""}
            </Link>
            <span className="min-w-[68px]">
              {playbook.profile_last_name && playbook.status
                ? ` • ${playbook.status}`
                : playbook.status}
            </span>
          </p>
        </div>
        {/* • {playbook.edited} */}

        <button
          onClick={() => SetFavorite(playbook.id, playbook.favorited)}
          className={classNames({
            "top-[12px] right-[34px] w-[20px] h-[20px] max-lg:hidden": listType,
            "top-[50%] left-[16px] mt-[-12px] w-[24px] h-[24px]": !listType,
            absolute: true,
          })}
        >
          <img
            src={playbook.favorited ? star_active : star}
            alt=""
            className="w-[100%]"
          />
        </button>

        <div
          className={classNames({
            "top-[12px] right-[8px]": listType,
            "top-[50%] right-[12px] mt-[-10px]": !listType,
            "absolute w-[20px] h-[20px] dropdown-menu": true,
          })}
        >
          <button
            onClick={HandleOpen}
            className={classNames({
              "min-[1024px]:bg-card-border": isShow,
              "w-[20px] h-[20px] rounded-[2px]": true,
            })}
          >
            <img src={dots} alt="" />
          </button>

          {isShow && (
            <div
              className="menu absolute right-[0] min-[1024px]:top-[calc(100%+9px)] bg-white py-[8px]
              min-[1024px]:rounded-[5px] border-[1px] border-solid border-header-bottom shadow-dropmenu
              font-poppins min-w-[162px] z-10 transition-all duration-[300ms] ease-in max-[1024px]:z-[999]
              max-[1024px]:fixed max-[1024px]:left-[0] max-[1024px]:right-[0px] max-[1024px]:bottom-[0px] max-[1024px]:p-[16px]
              max-[1024px]:pb-[32px]"
              ref={ref}
            >
              <div
                className="title min-[1024px]:hidden border-b-[1px] border-solid border-header-bottom mb-[4px] pb-[12px]
                text-[16px] font-medium leading-[20px] text-home-title"
              >
                {playbook.title}
              </div>

              <ul>
                <li
                  onClick={HandlePublish}
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"
                >
                  <img
                    src={icon_preview}
                    alt=""
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">
                    {t<string>("MAIN.PREVIEW")}
                  </span>
                </li>
                <li
                  onMouseLeave={() => setIsSale(false)}
                  onMouseOver={() => setIsSale(true)}
                  onClick={handleSale}
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"
                >
                  <img
                    src={isSale ? icon_sale_unactive : icon_sale}
                    alt="icon_sale"
                    className="w-[24px] h-[24px]"
                  />
                  <span
                    className={classNames({
                      "text-[16px] text-buttons-bg font-medium  leading-[20px]":
                        true,
                      "text-simple-text": isSale,
                    })}
                  >
                    {t<string>("MAIN.SALE")}
                  </span>
                </li>
                <li
                  onClick={HandleShare}
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"
                >
                  <img src={icon_share} alt="" className="w-[24px] h-[24px]" />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">
                    {t<string>("MAIN.SHARE")}
                  </span>
                </li>
                <li
                  onClick={() => SetFavorite(playbook.id, playbook.favorited)}
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border min-[1024px]:hidden 
                  max-[1024px]:px-[0px]"
                >
                  <img
                    src={playbook.favorited ? star_active : star_mobile}
                    alt=""
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">
                    {t<string>("MAIN.FAVORITE")}
                  </span>
                </li>
                <li
                  onClick={HandleDetails}
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"
                >
                  <img
                    src={icon_settings}
                    alt=""
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">
                    {t<string>("MAIN.SETTINGS")}
                  </span>
                </li>
                <li
                  onClick={() => HandleDelete()}
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"
                >
                  <img src={icon_delete} alt="" className="w-[24px] h-[24px]" />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">
                    {t<string>("MAIN.DELETE")}
                  </span>
                </li>
              </ul>
            </div>
          )}

          {isShow && (
            <div
              className={classNames({
                "side-overlay fixed left-[0px] top-[0px] w-[100%] h-[100vh] bg-side-overlay z-[99] min-[1024px]:hidden transition-all duration-[300ms] ease-in":
                  true,
                "opacity-0 invisible z-0": !isShow,
              })}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppMainCard;

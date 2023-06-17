import { useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

// import { favourites, playbooks } from "../../core/constants/sidebar";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import {
  setOpenedPages,
  setPages,
  setSelectedData,
  setSelectedPlaybook,
  setSelectedTab,
  setSidebarTabs,
  setToggleSidebar,
} from "../../core/store/reducers/app/appDataSlice";

import playbookLogo from "../../assets/photos/squeeze/mob-logo.svg";
import pb_black_logo from "../../assets/photos/sidebar/pb-logo-black.svg";
import pb_blue_logo from "../../assets/photos/sidebar/pb-blue.svg";
import book_dark from "../../assets/photos/sidebar/pb-dark.svg";
import active_pb_blue from "../../assets/photos/sidebar/active-pb.svg";
import to_arrow from "../../assets/photos/create/to-arrow.svg";
import plus from "../../assets/photos/create/plus.svg";
import plus_blue from "../../assets/photos/main/plus-blue.svg";
import arrow_blue from "../../assets/photos/main/arrow-down-blue.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";
import light_blue_saas from "../../assets/photos/create/blue-saas.svg";
import plus_gray from "../../assets/photos/sidebar/plus-gray.svg";
import star_active from "../../assets/photos/sidebar/star.svg";
import star from "../../assets/photos/sidebar/favorite.svg";
import { Link, useNavigate } from "react-router-dom";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import {
  setPlaybookType,
  setReloadChecker,
} from "../../core/store/reducers/helpers/helpersDataSlice";
import { MainTabs, Modal } from "../../core/models/enums";
import useModal from "../../core/hooks/useModal";
import PlaybookService from "../../core/services/playbook.service";
import { PrivateUIRoutes, UIRoutes } from "../../core/router";

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { openModal } = useModal();

  const { data, sideOpen, sidebarTabs, selectedTab, selectedPlaybook, pages } =
    useAppSelector((state) => state.app);

  const { reloadChecker } = useAppSelector((state) => state.helpers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const playbook = JSON.parse(localStorage.getItem("saved_playbook") || "{}");
    const page = JSON.parse(localStorage.getItem("selected_page") || "{}");
    if (localStorage.getItem("selected_tabs")) {
      dispatch(
        setSidebarTabs(
          JSON.parse(localStorage.getItem("selected_tabs") || "[]")
        )
      );
    }
    dispatch(setOpenedPages([page?.page_id]));
    dispatch(setSelectedPlaybook(playbook));
    LoadPages(playbook?.id);
  }, []);

  const { fetchedData: playbooks } = useHttpGet<any>(
    `${APIRoutes.PLAYBOOKS}/mine`,
    {
      resolve: (response: any) => {
        let menuItem: any = localStorage.getItem("selected_page");

        if (menuItem) {
          menuItem = JSON.parse(menuItem);
          if (!data.id) {
            dispatch(setSelectedData(menuItem));
          }
        }
        if (response) {
          response.data.playbooks?.forEach((e: any) => {
            if (menuItem?.id === e.id) {
              e.open = menuItem?.open;
            } else {
              e.open = e.open ? true : false;
            }
          });
          response.favorites?.forEach((e: any) => {
            if (menuItem?.id === e.id) {
              e.open = menuItem?.open;
            } else {
              e.open = e.open ? true : false;
            }
          });

          dispatch(setReloadChecker(false));
        }
      },
      dependencies: [reloadChecker],
    }
  );

  const OpenPlaybook = (playbook: any, type: number) => {
    if (
      playbook.id === selectedPlaybook?.id &&
      type === selectedPlaybook?.tabType
    ) {
      dispatch(setSelectedPlaybook(null));
      localStorage.removeItem("saved_playbook");
      localStorage.removeItem("selected_page");
      dispatch(
        setSelectedData({
          selected: false,
          open: false,
          id: null,
          type: "",
          title: "",
          page_title: "",
          page_id: 0,
          chapters: [],
          status: "",
        })
      );
    } else {
      if (!localStorage.getItem("selected_page")) {
        localStorage.setItem(
          "saved_playbook",
          JSON.stringify({
            id: playbook.id,
            tabType: type,
          })
        );
      }
      dispatch(setSelectedTab(null));
      dispatch(
        setSelectedPlaybook({
          id: playbook.id,
          tabType: type,
        })
      );
      LoadPages(playbook.id);
    }
  };

  async function LoadPages(playbook_id: string) {
    if (playbook_id) {
      try {
        const response = await PlaybookService.getPages(playbook_id);
        dispatch(setPages(response?.data?.data));
      } catch (errors: any) {}
    }
  }

  const HandleNewPlaybook = () => {
    dispatch(setPlaybookType("create"));
    openModal(Modal.PLAYBOOK_DETAILS);
  };

  const selectPageMenu = (
    item?: any,
    page?: any,
    type?: string,
    tab?: number
  ) => {
    localStorage.setItem(
      "saved_playbook",
      JSON.stringify({ id: item.id, tabType: tab })
    );
    dispatch(setSelectedPlaybook({ id: item.id, tabType: Number(tab) }));
    navigate(`/creating/${item?.id}`);
    dispatch(setOpenedPages([page.id]));
    const setData = {
      id: item.id,
      selected: true,
      name: item.name,
      page_id: page.id,
      page_title: page.title,
      open: item.open,
      type: type,
    };
    dispatch(setSelectedData(setData));
    localStorage.setItem("selected_page", JSON.stringify(setData));
  };

  const setPriorityItem = (e: any, item: any) => {
    e.stopPropagation();
    item.priority = true;
  };
  const removeFromFavorite = (e: any, item: any) => {
    e.stopPropagation();
    item.priority = false;
    playbooks.push(item);
  };

  const TabOpener = (type: number) => {
    if (sidebarTabs.includes(type)) {
      dispatch(
        setSidebarTabs(
          sidebarTabs.filter((addedType: number) => addedType !== type)
        )
      );
      localStorage.setItem(
        "selected_tabs",
        JSON.stringify(
          sidebarTabs.filter((addedType: number) => addedType !== type)
        )
      );
    } else {
      dispatch(setSidebarTabs([...sidebarTabs, type]));
      localStorage.setItem(
        "selected_tabs",
        JSON.stringify([...sidebarTabs, type])
      );
    }
  };

  console.log(!sideOpen);

  return (
    <div
      className={classNames({
        "sidebar w-[280px]  min-h-[100%] max-lg:min-w-[0%] relative transition-[width] duration-[200ms] ease-in max-[1024px]:w-[0px]":
          true,
        "min-[1024px]:w-[25px]": !sideOpen,
        "max-[2064px]:min-w-[280px]": sideOpen,
        "min-w-[0px]": !sideOpen,
      })}>
      <button
        onClick={() => dispatch(setToggleSidebar(!sideOpen))}
        className={classNames({
          "sideToggle rounded-[50%] w-[30px] h-[30px] absolute top-[10%] right-[-15px] border-[1px] bg-white":
            true,
          "z-[20] flex items-center justify-center transition-all duration-[300ms] linear max-[1024px]:hidden":
            true,
          "invisible opacity-0": sideOpen,
          "right-[-16px]": !sideOpen,
          "top-[12.42%]": !sideOpen,
        })}>
        <img
          src={arrow_blue}
          alt="arrow"
          className={classNames({
            "scale-[-1]": sideOpen,
            "transition-all duration-220 ease": true,
          })}
        />
      </button>
      <div
        className={classNames({
          "bg-list-title w-[280px] h-[100%] px-[12px] border-solid border-r-[1px] left-[0px] border-r-header-bottom gap-[21.4px] max-lg:left-[-350px]":
            true,
          "fixed top-[0] min-h-[100%] max-lg:z-[100] transition-all duration-[200ms] ease-in box-border overflow-y-auto":
            true,
          "overflow-y-hidden": !sideOpen,
          "max-lg:left-[0px!important]": !sideOpen,
          "min-[1024px]:w-[0px]": !sideOpen,
          "px-[0px]": sideOpen,
        })}>
        <Link
          to="/home"
          className={classNames({
            "py-[16px] w-[160px] max-w-[160px] transition-[opacity] duration-[150ms] ease-in table":
              true,
            "min-[1024px]:opacity-0 delay-150 hidden": !sideOpen,
          })}>
          <img src={playbookLogo} alt="playbookLogo" />
        </Link>
        <Link
          to={`/${UIRoutes.DISCOVER}`}
          className={classNames({
            "bg-button-submit-footer flex items-center justify-center w-[100%] py-[4px] px-[16px] rounded-[5px] shadow-free-trial h-[38px] gap-[6px] mb-[10px] mt-[30px]":
              true,
            "hover:bg-buttons-bg-hover active:bg-buttons-bg-active": true,
            hidden: !sideOpen,
          })}>
          <span className="text-list-title text-[16px] font-medium">
            {t<string>("MAIN.DISCOVER")}
          </span>
        </Link>
        <ul className="flex flex-col gap-[4px]">
          <Link
            to={`${PrivateUIRoutes.Main}`}
            onClick={() => {
              dispatch(setSelectedTab(MainTabs.Home));
            }}
            className={classNames({
              "bg-active-playbook  border-top-engineering ":
                selectedTab === MainTabs.Home,
              "border-transparent": selectedTab !== MainTabs.Home,
              "rounded-[4px] px-[8px] py-[10px] flex flex-row items-center gap-[8px] relative border-l-[2px] transition duration-200 ease hover:bg-chapter-color cursor-pointer":
                true,
            })}>
            <img
              src={selectedTab === MainTabs.Home ? active_pb_blue : book_dark}
              alt="active_pb_blue"
            />

            <span
              className={classNames({
                "text-buttons-bg": MainTabs.Home === selectedTab,
                "text-footer-main": MainTabs.Home !== selectedTab,
                "font-poppins font-normal  text-[16px] leading-[26px] tracking-[-0.1px] truncate block":
                  true,
              })}>
              {t<string>("COMMON.PB_HOME")}
            </span>
          </Link>

          <Link
            to={`/${PrivateUIRoutes.Plays}`}
            onClick={() => {
              dispatch(setSelectedTab(MainTabs.Active));
            }}
            className={classNames({
              "bg-active-playbook  border-top-engineering  text-buttons-bg":
                selectedTab === MainTabs.Active,
              "border-transparent": selectedTab !== MainTabs.Active,
              "rounded-[4px] px-[8px] py-[10px] flex flex-row items-center gap-[8px] relative border-l-[2px] transition duration-200 ease hover:bg-chapter-color cursor-pointer":
                true,
            })}>
            <img
              src={
                selectedTab === MainTabs.Active ? pb_blue_logo : pb_black_logo
              }
              alt="pb_black_logo"
            />
            <span className="footer-main-list-title  font-poppins not-italic leading-[26px] tracking-[-0.1px] text-[16px] font-normal">
              {t<string>("COMMON.PB_ACTIVE")}
            </span>
          </Link>
        </ul>

        <hr className="mb-[16px] mt-[12px]" />

        <nav
          className={classNames({
            "flex flex-col w-[255px] transition-[opacity] duration-[150ms] ease-in":
              true,
            "delay-[100ms] min-[1024px]:opacity-0 ": !sideOpen,
            hidden: !sideOpen,
          })}>
          <div
            onClick={() => dispatch(setSelectedTab(MainTabs.My))}
            className={classNames({
              "bg-active-playbook  border-top-engineering rounded-[4px] ":
                selectedTab === MainTabs.My,
              "border-transparent": selectedTab !== MainTabs.My,
              "flex flex-row items-center justify-between my-[4px] relative border-l-[2px] transition duration-200 ease":
                true,
            })}>
            <span
              className="w-[24px] h-[24px] absolute left-[5px] top-[50%] mt-[-12px] p-[4px]"
              onClick={() => TabOpener(MainTabs.My)}>
              <img
                src={sidebarTabs.includes(MainTabs.My) ? arrow_blue : to_arrow}
                alt="arrow"
                className={classNames({
                  "rotate-[90deg]": sidebarTabs.includes(MainTabs.My),
                  "transition duration-200 ease": true,
                })}
              />
            </span>

            <span
              className={classNames({
                "text-buttons-bg": selectedTab === MainTabs.My,
                "flex flex-row items-center gap-[8px] w-[100%] font-manrope text-[16px] font-semibold leading-[21.86px] px-[8px] py-[11px] pl-[32px] ":
                  true,
                "transition duration-200 ease": true,
              })}>
              {t<string>("COMMON.PLAYBOOKS")}
            </span>
            <button onClick={HandleNewPlaybook}>
              <img
                src={selectedTab === MainTabs.My ? plus_blue : plus}
                alt="plus"
                className="w-[16px] h-[16px] absolute right-[8px] top-[50%] mt-[-8px]"
              />
            </button>
          </div>

          {sidebarTabs.includes(MainTabs.My) && (
            <ul className="flex flex-col gap-[4px]  w-full">
              {playbooks?.data?.playbooks.map(
                (playbook: any, index: number) => (
                  <li key={playbook.id} className="w-[100%]">
                    <button
                      onClick={() => OpenPlaybook(playbook, MainTabs.My)}
                      className={classNames({
                        "cursor-pointer sidebar-item flex flex-row px-[8px] py-[6px] gap-[8px] items-center w-[100%] relative hover:pr-[54px] transition duration-200 ease hover:bg-chapter-color":
                          true,
                        "bg-active-playbook border-l-[2px]  border-top-engineering rounded-[4px] pl-[6px] outline-none":
                          playbook.id === selectedPlaybook?.id &&
                          selectedPlaybook?.tabType === MainTabs.My,
                        "focus:bg-active-playbook focus:border-l-[2px]  focus:border-top-engineering focus:rounded-[4px] focus:pl-[6px] focus:outline-none":
                          true,
                      })}>
                      <img
                        // onClick={(e) => openSubMenu(e, item)}
                        src={
                          playbook.id === selectedPlaybook?.id &&
                          selectedPlaybook?.tabType === MainTabs.My
                            ? arrow_blue
                            : to_arrow
                        }
                        alt="arrow"
                        className={classNames({
                          "rotate-[90deg]":
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.My,
                          "transition duration-200 ease": true,
                        })}
                      />
                      <img src={red_saas} alt="saas" />
                      <span
                        className={classNames({
                          "text-buttons-bg":
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.My,
                          "text-top-sub-secondary":
                            playbook.id !== selectedPlaybook?.id ||
                            selectedPlaybook?.tabType !== MainTabs.My,
                          "font-poppins font-normal  text-[16px] leading-[26px] tracking-[-0.1px] truncate block":
                            true,
                        })}>
                        {playbook.name}
                      </span>
                      <div
                        className="options flex items-center gap-[2px] absolute right-[8px] top-[50%] mt-[-10px]
                      transition duration-200 ease invisible opacity-0">
                        <span
                          onClick={(e) => setPriorityItem(e, playbook)}
                          className={classNames({
                            "hover:bg-active-playbook":
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.My,
                            "hover:bg-option-btn":
                              playbook.id !== selectedPlaybook?.id &&
                              selectedPlaybook?.tabType !== MainTabs.My,
                            "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px] cursor-pointer":
                              true,
                          })}>
                          <img
                            src={playbook.favorited ? star_active : star}
                            alt="add to favorite"
                          />
                        </span>
                        <span
                          onClick={(e) => e.stopPropagation()}
                          className={classNames({
                            "hover:bg-active-playbook":
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.My,
                            "hover:bg-option-btn":
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType !== MainTabs.My,
                            "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px] cursor-pointer":
                              true,
                          })}>
                          <img
                            src={
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.My
                                ? plus_blue
                                : plus_gray
                            }
                            alt="add"
                          />
                        </span>
                      </div>
                    </button>

                    {playbook.id === selectedPlaybook?.id &&
                      selectedPlaybook?.tabType === MainTabs.My && (
                        <>
                          {pages.map((page: any, indexChapter: number) => (
                            <button
                              key={page?.id}
                              onClick={() => {
                                selectPageMenu(
                                  playbook,
                                  page,
                                  "my",
                                  MainTabs.My
                                );
                              }}
                              className={classNames({
                                "flex flex-row pr-[8px] py-[8px] pl-[38px] gap-[8px] items-center w-[100%]":
                                  true,
                                "text-top-sub-secondary":
                                  page?.id !== data.page_id,
                                "text-buttons-bg":
                                  playbook.id === data.id &&
                                  page?.id === data.page_id &&
                                  data.type === "my",
                              })}>
                              <p className="truncate text-[16px] leading-[22px] tracking-[-0.1px]">
                                #{indexChapter + 1} {page?.title}
                              </p>
                            </button>
                          ))}
                        </>
                      )}
                  </li>
                )
              )}
            </ul>
          )}
          <hr className="my-[16px]" />
          <button
            onClick={() => dispatch(setSelectedTab(MainTabs.Favorite))}
            className={classNames({
              "bg-active-playbook  border-top-engineering rounded-[4px] ":
                selectedTab === MainTabs.Favorite,
              "border-transparent": selectedTab !== MainTabs.Favorite,
              "flex flex-row items-center justify-between my-[4px] relative border-l-[2px]  transition duration-200 ease":
                true,
            })}>
            <span
              onClick={() => TabOpener(MainTabs.Favorite)}
              className="w-[24px] h-[24px] absolute left-[5px] top-[50%] mt-[-12px] p-[4px]">
              <img
                src={
                  sidebarTabs.includes(MainTabs.Favorite)
                    ? arrow_blue
                    : to_arrow
                }
                alt="arrow"
                className={classNames({
                  "rotate-[90deg]": sidebarTabs.includes(MainTabs.Favorite),
                  "transition duration-200 ease": true,
                })}
              />
            </span>

            <span
              className={classNames({
                "text-buttons-bg": selectedTab === MainTabs.Favorite,
                "transition duration-200 ease": true,
                "flex flex-row items-center gap-[8px] w-[100%] font-manrope text-[16px] font-semibold leading-[21.86px] px-[8px] py-[11px] pl-[32px]":
                  true,
              })}>
              {t<string>("COMMON.FAVORITES")}
            </span>
          </button>
          {sidebarTabs.includes(MainTabs.Favorite) && (
            <ul className="flex flex-col gap-[4px] ">
              {playbooks?.data?.favorites.map(
                (playbook: any, index: number) => (
                  <li key={playbook.id} className="w-[100%]">
                    <button
                      onClick={() => OpenPlaybook(playbook, MainTabs.Favorite)}
                      className={classNames({
                        "sidebar-item flex flex-row px-[8px] py-[6px] gap-[8px] items-center w-[100%] relative hover:pr-[54px] transition duration-200 ease hover:bg-chapter-color":
                          true,
                        "bg-active-playbook border-l-[2px]  border-top-engineering rounded-[4px] pl-[6px] outline-nine":
                          playbook.id === selectedPlaybook?.id &&
                          selectedPlaybook?.tabType === MainTabs.Favorite,
                      })}>
                      <img
                        src={
                          playbook.id === selectedPlaybook?.id &&
                          selectedPlaybook?.tabType === MainTabs.Favorite
                            ? arrow_blue
                            : to_arrow
                        }
                        alt="arrow"
                        className={classNames({
                          "rotate-[90deg]":
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.Favorite,
                          "transition duration-200 ease": true,
                        })}
                      />
                      <img src={blue_saas} alt="saas" />
                      <span
                        className={classNames({
                          "text-buttons-bg":
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.Favorite,
                          "text-top-sub-secondary":
                            playbook.id !== selectedPlaybook?.id ||
                            selectedPlaybook?.tabType !== MainTabs.Favorite,
                          "font-poppins font-normal  text-[16px] leading-[26px] tracking-[-0.1px] truncate block":
                            true,
                        })}>
                        {playbook.name}
                      </span>
                      <div
                        className="options flex items-center gap-[2px] absolute right-[8px] top-[50%] mt-[-10px]
                      transition duration-200 ease invisible opacity-0">
                        <span
                          onClick={(e) => removeFromFavorite(e, playbook)}
                          className={classNames({
                            "hover:bg-active-playbook":
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.Favorite,
                            "hover:bg-option-btn":
                              playbook.id !== selectedPlaybook?.id &&
                              selectedPlaybook?.tabType !== MainTabs.Favorite,
                            "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px]":
                              true,
                          })}>
                          <img
                            src={playbook.favorited ? star_active : star}
                            alt="add to favorite"
                          />
                        </span>
                        <span
                          onClick={(e) => e.stopPropagation()}
                          className={classNames({
                            "hover:bg-active-playbook":
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.Favorite,
                            "hover:bg-option-btn":
                              playbook.id !== selectedPlaybook?.id &&
                              selectedPlaybook?.tabType !== MainTabs.Favorite,
                            "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px]":
                              true,
                          })}>
                          <img
                            src={
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.Favorite
                                ? plus_blue
                                : plus_gray
                            }
                            alt="add"
                          />
                        </span>
                      </div>
                    </button>
                    {playbook.id === selectedPlaybook?.id &&
                      selectedPlaybook?.tabType === MainTabs.Favorite && (
                        <>
                          {pages.map((page: any) => (
                            <button
                              key={page?.id}
                              onClick={() => {
                                selectPageMenu(
                                  playbook,
                                  page,
                                  "favorite",
                                  MainTabs.Favorite
                                );
                              }}
                              className={classNames({
                                "flex flex-row pr-[8px] py-[8px] pl-[38px] gap-[8px] items-center w-[100%]":
                                  true,
                                "text-top-sub-secondary":
                                  page?.id !== data.page_id,
                                "text-buttons-bg":
                                  playbook.id === data.id &&
                                  page?.id === data.page_id &&
                                  data.type === "favorite",
                              })}>
                              <p className="truncate text-[16px] leading-[22px] tracking-[-0.1px]">
                                {page?.title}
                              </p>
                            </button>
                          ))}
                        </>
                      )}
                  </li>
                )
              )}
            </ul>
          )}
          {/* <hr className="my-[16px]" />
          <button
            onClick={() => dispatch(setSelectedTab(MainTabs.Purchased))}
            className={classNames({
              "bg-active-playbook  border-top-engineering rounded-[4px] ":
                selectedTab === MainTabs.Purchased,
              "border-transparent": selectedTab !== MainTabs.Purchased,
              "flex flex-row items-center justify-between my-[4px] relative border-l-[2px]  transition duration-200 ease":
                true,
            })}
          >
            <span
              onClick={() => TabOpener(MainTabs.Purchased)}
              className="w-[24px] h-[24px] absolute left-[5px] top-[50%] mt-[-12px] p-[4px]"
            >
              <img
                src={
                  sidebarTabs.includes(MainTabs.Purchased)
                    ? arrow_blue
                    : to_arrow
                }
                alt="arrow"
                className={classNames({
                  "rotate-[90deg]": sidebarTabs.includes(MainTabs.Purchased),
                  "transition duration-200 ease": true,
                })}
              />
            </span>

            <span
              className={classNames({
                "text-buttons-bg": selectedTab === MainTabs.Purchased,
                "transition duration-200 ease": true,
                "flex flex-row items-center gap-[8px] w-[100%] font-manrope text-[16px] font-semibold leading-[21.86px] px-[8px] py-[11px] pl-[32px]":
                  true,
              })}
            >
              {t<string>("COMMON.PURCHASES")}
            </span>
          </button>
          {playbooks?.data?.purchases.length &&
            sidebarTabs.includes(MainTabs.Purchased) && (
              <ul className="flex flex-col gap-[4px] ">
                {playbooks?.data?.purchases.map(
                  (playbook: any, index: number) => (
                    <li key={playbook.id} className="w-[100%]">
                      <button
                        onClick={() =>
                          OpenPlaybook(playbook, MainTabs.Purchased)
                        }
                        className={classNames({
                          "sidebar-item flex flex-row px-[8px] py-[6px] gap-[8px] items-center w-[100%] relative hover:pr-[54px] transition duration-200 ease":
                            true,
                          "bg-active-playbook border-l-[2px]  border-top-engineering rounded-[4px] pl-[6px] outline-nine":
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.Purchased,
                          "focus:bg-active-playbook focus:border-l-[2px]  focus:border-top-engineering focus:rounded-[4px] focus:pl-[6px] focus:outline-none":
                            true,
                        })}
                      >
                        <img
                          src={
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.Purchased
                              ? arrow_blue
                              : to_arrow
                          }
                          alt="arrow"
                          className={classNames({
                            "rotate-[90deg]":
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.Purchased,
                            "transition duration-200 ease": true,
                          })}
                        />
                        <img src={light_blue_saas} alt="saas" />
                        <span
                          className={classNames({
                            "text-buttons-bg":
                              playbook.id === selectedPlaybook?.id &&
                              selectedPlaybook?.tabType === MainTabs.Purchased,
                            "text-top-sub-secondary":
                              playbook.id !== selectedPlaybook?.id ||
                              selectedPlaybook?.tabType !== MainTabs.Purchased,
                            "font-poppins font-normal  text-[16px] leading-[26px] tracking-[-0.1px] truncate block":
                              true,
                          })}
                        >
                          {playbook.name}
                        </span>
                        <div
                          className="options flex items-center gap-[2px] absolute right-[8px] top-[50%] mt-[-10px]
                      transition duration-200 ease invisible opacity-0"
                        >
                          <span
                            onClick={(e) => removeFromFavorite(e, playbook)}
                            className={classNames({
                              "hover:bg-active-playbook":
                                playbook.id === selectedPlaybook?.id &&
                                selectedPlaybook?.tabType ===
                                  MainTabs.Purchased,
                              "hover:bg-option-btn":
                                playbook.id !== selectedPlaybook?.id &&
                                selectedPlaybook?.tabType !==
                                  MainTabs.Purchased,
                              "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px]":
                                true,
                            })}
                          >
                            <img
                              src={playbook.favorited ? star_active : star}
                              alt="add to favorite"
                            />
                          </span>
                          <span
                            onClick={(e) => e.stopPropagation()}
                            className={classNames({
                              "hover:bg-active-playbook":
                                playbook.id === selectedPlaybook?.id &&
                                selectedPlaybook?.tabType ===
                                  MainTabs.Purchased,
                              "hover:bg-option-btn":
                                playbook.id !== selectedPlaybook?.id &&
                                selectedPlaybook?.tabType !==
                                  MainTabs.Purchased,
                              "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px]":
                                true,
                            })}
                          >
                            <img
                              src={
                                playbook.id === selectedPlaybook?.id &&
                                selectedPlaybook?.tabType === MainTabs.Purchased
                                  ? plus_blue
                                  : plus_gray
                              }
                              alt="add"
                            />
                          </span>
                        </div>
                      </button>
                      {playbook.id === selectedPlaybook?.id &&
                        selectedPlaybook?.tabType === MainTabs.Purchased && (
                          <>
                            {pages.map((page: any, indexChapter: number) => (
                              <button
                                key={page?.id}
                                onClick={() => {
                                  selectPageMenu(
                                    playbook,
                                    page,
                                    "purchased",
                                    MainTabs.Purchased
                                  );
                                }}
                                className={classNames({
                                  "flex flex-row pr-[8px] py-[8px] pl-[38px] gap-[8px] items-center w-[100%]":
                                    true,
                                  "text-top-sub-secondary":
                                    page?.id !== data.page_id,
                                  "text-buttons-bg":
                                    playbook.id === data.id &&
                                    page?.id === data.page_id &&
                                    data.type === "purchased",
                                })}
                              >
                                <p className="truncate text-[16px] leading-[22px] tracking-[-0.1px]">
                                  {page?.title}
                                </p>
                              </button>
                            ))}
                          </>
                        )}
                    </li>
                  )
                )}
              </ul>
            )}
          <hr className="my-[16px]" />
          {playbooks?.data?.listings.length && (
            <button
              onClick={() => dispatch(setSelectedTab(MainTabs.Listings))}
              className={classNames({
                "bg-active-playbook  border-top-engineering rounded-[4px] ":
                  selectedTab === MainTabs.Listings,
                "border-transparent": selectedTab !== MainTabs.Listings,
                "flex flex-row items-center justify-between my-[4px] relative border-l-[2px]  transition duration-200 ease":
                  true,
              })}
            >
              <span
                onClick={() => TabOpener(MainTabs.Listings)}
                className="w-[24px] h-[24px] absolute left-[5px] top-[50%] mt-[-12px] p-[4px]"
              >
                <img
                  src={
                    sidebarTabs.includes(MainTabs.Listings)
                      ? arrow_blue
                      : to_arrow
                  }
                  alt="arrow"
                  className={classNames({
                    "rotate-[90deg]": sidebarTabs.includes(MainTabs.Listings),
                    "transition duration-200 ease": true,
                  })}
                />
              </span>

              <span
                className={classNames({
                  "text-buttons-bg": selectedTab === MainTabs.Listings,
                  "transition duration-200 ease": true,
                  "flex flex-row items-center gap-[8px] w-[100%] font-manrope text-[16px] font-semibold leading-[21.86px] px-[8px] py-[11px] pl-[32px]":
                    true,
                })}
              >
                {t<string>("COMMON.LISTINGS")}
              </span>
            </button>
          )}
          {sidebarTabs.includes(MainTabs.Listings) && (
            <ul className="flex flex-col gap-[4px] ">
              {playbooks?.data?.listings.map((playbook: any, index: number) => (
                <li key={playbook.id} className="w-[100%]">
                  <button
                    onClick={() => OpenPlaybook(playbook, MainTabs.Listings)}
                    className={classNames({
                      "sidebar-item flex flex-row px-[8px] py-[6px] gap-[8px] items-center w-[100%] relative hover:pr-[54px] transition duration-200 ease":
                        true,
                      "bg-active-playbook border-l-[2px]  border-top-engineering rounded-[4px] pl-[6px] outline-none":
                        playbook.id === selectedPlaybook?.id &&
                        selectedPlaybook?.tabType === MainTabs.Listings,
                    })}
                  >
                    <img
                      src={
                        playbook.id === selectedPlaybook?.id &&
                        selectedPlaybook?.tabType === MainTabs.Listings
                          ? arrow_blue
                          : to_arrow
                      }
                      alt="arrow"
                      className={classNames({
                        "rotate-[90deg]":
                          playbook.id === selectedPlaybook?.id &&
                          selectedPlaybook?.tabType === MainTabs.Listings,
                        "transition duration-200 ease": true,
                      })}
                    />
                    <img src={blue_saas} alt="saas" />
                    <span
                      className={classNames({
                        "text-buttons-bg":
                          playbook.id === selectedPlaybook?.id &&
                          selectedPlaybook?.tabType === MainTabs.Listings,
                        "text-top-sub-secondary":
                          playbook.id !== selectedPlaybook?.id &&
                          selectedPlaybook?.tabType !== MainTabs.Listings,
                        "font-poppins font-normal  text-[16px] leading-[26px] tracking-[-0.1px] truncate block":
                          true,
                      })}
                    >
                      {playbook.name}
                    </span>
                    <div
                      className="options flex items-center gap-[2px] absolute right-[8px] top-[50%] mt-[-10px]
                      transition duration-200 ease invisible opacity-0"
                    >
                      <span
                        onClick={(e) => removeFromFavorite(e, playbook)}
                        className={classNames({
                          "hover:bg-active-playbook":
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.Listings,
                          "hover:bg-option-btn":
                            playbook.id !== selectedPlaybook?.id &&
                            selectedPlaybook?.tabType !== MainTabs.Listings,
                          "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px]":
                            true,
                        })}
                      >
                        <img
                          src={playbook.favorited ? star_active : star}
                          alt="add to favorite"
                        />
                      </span>
                      <span
                        onClick={(e) => e.stopPropagation()}
                        className={classNames({
                          "hover:bg-active-playbook":
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.Listings,
                          "hover:bg-option-btn":
                            playbook.id !== selectedPlaybook?.id &&
                            selectedPlaybook?.tabType !== MainTabs.Listings,
                          "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px]":
                            true,
                        })}
                      >
                        <img
                          src={
                            playbook.id === selectedPlaybook?.id &&
                            selectedPlaybook?.tabType === MainTabs.Listings
                              ? plus_blue
                              : plus_gray
                          }
                          alt="add"
                        />
                      </span>
                    </div>
                  </button>
                  {playbook.id === selectedPlaybook?.id &&
                    selectedPlaybook?.tabType === MainTabs.Listings && (
                      <>
                        {pages.map((page: any) => (
                          <button
                            key={page?.id}
                            onClick={() => {
                              selectPageMenu(
                                playbook,
                                page,
                                "listings",
                                MainTabs.Listings
                              );
                            }}
                            className={classNames({
                              "flex flex-row pr-[8px] py-[8px] pl-[38px] gap-[8px] items-center w-[100%]":
                                true,
                              "text-top-sub-secondary":
                                page?.id !== data.page_id,
                              "text-buttons-bg":
                                playbook.id === data.id &&
                                page?.id === data.page_id &&
                                data.type === "listings",
                            })}
                          >
                            <p className="truncate text-[16px] leading-[22px] tracking-[-0.1px]">
                              {page?.title}
                            </p>
                          </button>
                        ))}
                      </>
                    )}
                </li>
              ))}
            </ul>
          )} */}
        </nav>
      </div>

      <div
        onClick={() => dispatch(setToggleSidebar(!sideOpen))}
        className={classNames({
          "side-overlay fixed left-[0px] top-[0px] w-[100%] h-[100vh] bg-side-overlay z-[99] min-[1024px]:hidden transition-all duration-[300ms] ease-in":
            true,
          "opacity-0 invisible z-0": sideOpen,
        })}></div>
    </div>
  );
};

export default Sidebar;

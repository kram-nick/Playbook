import { useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

// import { favourites, playbooks } from "../../core/constants/sidebar";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import {
  setSelectedData,
  setToggleSidebar,
} from "../../core/store/reducers/app/appDataSlice";

import playbookLogo from "../../assets/photos/squeeze/mob-logo.svg";
import to_arrow from "../../assets/photos/create/to-arrow.svg";
import plus from "../../assets/photos/create/plus.svg";
import plus_blue from "../../assets/photos/main/plus-blue.svg";
import arrow_blue from "../../assets/photos/main/arrow-down-blue.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";
import plus_gray from "../../assets/photos/sidebar/plus-gray.svg";
import star_active from "../../assets/photos/sidebar/star.svg";
import star from "../../assets/photos/sidebar/favorite.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { PrivateUIRoutes } from "../../core/router";
import { setReloadChecker } from "../../core/store/reducers/helpers/helpersDataSlice";

const Sidebar = () => {
  const [playbookItem, selectedPlaybooks] = useState({
    open: false,
    selected: false,
  });
  const [favoriteItem, selectedFavorite] = useState({
    open: false,
    selected: false,
  });

  const [playbooks, setPlaybooks]: any = useState([]);
  const [favorites, setToFavotire]: any = useState([]); 
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, sideOpen } = useAppSelector((state) => state.app);

  const { reloadChecker } = useAppSelector((state) => state.helpers);

  const dispatch = useAppDispatch();
  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/menu`, {
    resolve: (response: any) => {
      let menuItem: any = localStorage.getItem("selected_playbook");
      if (menuItem) {
        menuItem = JSON.parse(menuItem);
        if (!data.id) {
          dispatch(setSelectedData(menuItem));
          const menuSectionData = { open: true, selected: false };
          if (menuItem?.type === "my") {
            selectedPlaybooks(menuSectionData);
          }
          if (menuItem?.type === "favorite") {
            selectedFavorite(menuSectionData);
          }
        }
      }
      console.log(menuItem);
      if (response) {
        response.data.playbooks?.forEach((e: any) => {
          if (menuItem?.id === e.id) {
            e.open = menuItem?.open;
            console.log(e);
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
        setTimeout(() => {
          setPlaybooks(response.data.playbooks);
          setToFavotire(response.favorites);
        }, 100);
        dispatch(setReloadChecker(false));
      }
    },
    dependencies: [reloadChecker],
  });

  const selectedTopItem = (item: any, type: string, itemType: string) => {
    handlePlaybooks();
    selectedPlaybooks({
      open:
        type === "toggle" ? (item?.open === true ? false : true) : item?.open,
      selected: type === "selected" ? !item?.selected : item?.selected,
    });
    if (itemType === "my") {
      selectedFavorite({ open: favoriteItem.open, selected: false });
    }
  };
  const selectedFavoriteItem = (item: any, type: string, itemType: string) => {
    handlePlaybooks();
    selectedFavorite({
      open:
        type === "toggle" ? (item?.open === true ? false : true) : item?.open,
      selected: type === "selected" ? !item?.selected : item?.selected,
    });
    if (itemType === "favorite") {
      selectedPlaybooks({ open: playbookItem.open, selected: false });
    }
  };

  const handlePlaybooks = () => { 
    dispatch(
      setSelectedData({
        id: 0,
        selected: false,
        name: "",
        chapters: [],
        page_title: "",
        page_id: 0,
      })
    );
  };
  const selectedItemMenu = (item?: any, type?: string) => {
    console.log(item);
    navigate(`/creating/${item.id}`);
    const data = { open: true, selected: false };
    if (type === "my") {
      selectedPlaybooks(data);
      playbooks?.forEach((element: any) => {
        if (element.id === item.id) {
          element.open = !element.open;
        } else {
          element.open = false;
        }
      });
      setPlaybooks(playbooks);
    } else if (type === "favorite") {
      selectedFavorite(data);
    }

    const setData = {
      id: item.id,
      selected: true,
      open: item.open,
      name: item.name,
      type: type,
    };
    dispatch(setSelectedData(setData));
    localStorage.setItem("selected_playbook", JSON.stringify(setData));
  };

  const selectPageMenu = (item?: any, page?: any, type?: string) => {
    console.log(item);
    navigate(`/editor/${item?.id}/${page?.id}`);
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
    console.log(setData);
    localStorage.setItem("selected_playbook", JSON.stringify(setData));
  };

  const openSubMenu = (e: any, item?: any) => {
    e.stopPropagation();

    // playbooks?.forEach((element: any) => {
    //   if (element.id === item.id) {
    //     element.open = true;
    //   } else {
    //     element.open = false;
    //   }
    // });
  };

  const setPriorityItem = (e: any, item: any) => {
    e.stopPropagation();
    item.priority = true;
    favorites.push(item);

    if (item && item.id) {
      setPlaybooks(
        playbooks.filter((playbook: any) => playbook.id !== item.id)
      );
    }
  };
  const removeFromFavorite = (e: any, item: any) => {
    e.stopPropagation();
    item.priority = false;
    playbooks.push(item);

    if (item && item.id) {
      setToFavotire(
        favorites.filter((playbook: any) => playbook.id !== item.id)
      );
    }
  };

  return (
    <div
      className={classNames({
        "sidebar w-[280px]  min-h-[100%] max-lg:min-w-[0%] relative transition-[width] duration-[200ms] ease-in max-[1024px]:w-[0px]":
          true,
        "min-[1024px]:w-[25px]": !sideOpen,
      })}
    >
      <button
        onClick={() => dispatch(setToggleSidebar(!sideOpen))}
        className={classNames({
          "sideToggle rounded-[50%] w-[30px] h-[30px] absolute top-[10%] right-[-15px] border-[1px] bg-white":
            true,
          "z-[20] flex items-center justify-center transition-all duration-[300ms] linear max-[1024px]:hidden":
            true,
          // "":sideState,
          "invisible opacity-0": sideOpen,
        })}
      >
        <img
          src={arrow_blue}
          alt="arrow"
          className={classNames({
            "scale-[-1]": sideOpen,
            "transition-all duration-200 ease": true,
          })}
        />
      </button>
      <div
        className={classNames({
          "bg-list-title w-[280px] h-[100%] px-[12px] border-solid border-r-[1px] left-[0px] border-r-header-bottom gap-[21.4px] max-lg:left-[-350px] ":
            true,
          "fixed top-[0] min-h-[100%] max-lg:z-[100] transition-all duration-[200ms] ease-in  overflow-y-auto box-border":
            true,
          "max-lg:left-[0px!important]": !sideOpen,
          "min-[1024px]:w-[25px]": !sideOpen,
        })}
      >
        <Link
          to="/home"
          className={classNames({
            "py-[16px] w-[160px] max-w-[160px] transition-[opacity] duration-[150ms] ease-in table":
              true,
            "min-[1024px]:opacity-0 delay-150": !sideOpen,
          })}
        >
          <img src={playbookLogo} alt="playbookLogo" />
        </Link>

        <nav
          className={classNames({
            "flex flex-col w-[255px] transition-[opacity] duration-[150ms] ease-in":
              true,
            "  delay-[100ms] min-[1024px]:opacity-0 ": !sideOpen,
          })}
        >
          <button
            className={classNames({
              "bg-active-playbook  border-top-engineering rounded-[4px] ":
                playbookItem?.selected,
              "border-transparent": !playbookItem?.selected,
              "flex flex-row items-center justify-between my-[4px] relative border-l-[2px] transition duration-200 ease":
                true,
            })}
          >
            <span
              onClick={() => selectedTopItem(playbookItem, "toggle", "my")}
              className="w-[24px] h-[24px] absolute left-[5px] top-[50%] mt-[-12px] p-[4px]"
            >
              <img
                src={playbookItem?.selected ? arrow_blue : to_arrow}
                alt="arrow"
                className={classNames({
                  "rotate-[90deg]": playbookItem?.open,
                  "transition duration-200 ease": true,
                })}
              />
            </span>

            <span
              onClick={() => selectedTopItem(playbookItem, "selected", "my")}
              className={classNames({
                "text-buttons-bg": playbookItem?.selected,
                "flex flex-row items-center gap-[8px] w-[100%] font-manrope text-[16px] font-semibold leading-[21.86px] px-[8px] py-[11px] pl-[32px] ":
                  true,
                "transition duration-200 ease": true,
              })}
            >
              {t<string>("COMMON.PLAYBOOKS")}
            </span>
            <img
              src={playbookItem?.selected ? plus_blue : plus}
              alt="plus"
              className="w-[16px] h-[16px] absolute right-[8px] top-[50%] mt-[-8px]"
            />
          </button>

          {playbookItem?.open && (
            <ul className="flex flex-col gap-[4px]  w-full">
              {playbooks.map((item: any, index: number) => (
                <li key={item.id} className="w-[100%]">
                  <button
                    onClick={() => {
                      selectedItemMenu(item, "my");
                    }}
                    className={classNames({
                      "sidebar-item flex flex-row px-[8px] py-[6px] gap-[8px] items-center w-[100%] relative hover:pr-[54px] transition duration-200 ease":
                        true,
                      "bg-active-playbook border-l-[2px]  border-top-engineering rounded-[4px] pl-[6px]":
                        item.id === data.id,
                    })}
                  >
                    <img
                      // onClick={(e) => openSubMenu(e, item)}
                      src={item.id === data.id ? arrow_blue : to_arrow}
                      alt="arrow"
                      className={classNames({
                        "rotate-[90deg]": item.open,
                        "transition duration-200 ease": true,
                      })}
                    />
                    <img
                      src={item.privacy === "private" ? red_saas : blue_saas}
                      alt="saas"
                    />
                    <span
                      className={classNames({
                        "text-buttons-bg": item.id === data.id,
                        "text-top-sub-secondary": item.id !== data.id,
                        "font-poppins font-normal  text-[16px] leading-[26px] tracking-[-0.1px] truncate block":
                          true,
                      })}
                    >
                      {item.name}
                    </span>
                    <div
                      className="options flex items-center gap-[2px] absolute right-[8px] top-[50%] mt-[-10px]
                      transition duration-200 ease invisible opacity-0"
                    >
                      <span
                        onClick={(e) => setPriorityItem(e, item)}
                        className={classNames({
                          "hover:bg-active-playbook": item.id === data.id,
                          "hover:bg-option-btn": item.id !== data.id,
                          "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px] cursor-pointer":
                            true,
                        })}
                      >
                        <img
                          src={item.favorited ? star_active : star}
                          alt="add to favorite"
                        />
                      </span>
                      <span
                        onClick={(e) => e.stopPropagation()}
                        className={classNames({
                          "hover:bg-active-playbook": item.id === data.id,
                          "hover:bg-option-btn": item.id !== data.id,
                          "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px] cursor-pointer":
                            true,
                        })}
                      >
                        <img
                          src={item.id === data.id ? plus_blue : plus_gray}
                          alt="add"
                        />
                      </span>
                    </div>
                  </button>

                  {item.pages && item.open && (
                    <>
                      {item.pages.map((page: any, indexChapter: number) => (
                        <button
                          key={page.id}
                          onClick={() => {
                            selectPageMenu(item, page, "my");
                          }}
                          className={classNames({
                            "flex flex-row pr-[8px] py-[8px] pl-[38px] gap-[8px] items-center w-[100%]":
                              true,
                            "text-top-sub-secondary": page.id !== data.page_id,
                            "text-buttons-bg":
                              item.id === data.id && page.id === data.page_id,
                          })}
                        >
                          <p className="truncate text-[16px] leading-[22px] tracking-[-0.1px]">
                            #{indexChapter + 1} {page.title}
                          </p>
                        </button>
                      ))}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <hr className="my-[24px]" />
          <button
            className={classNames({
              "bg-active-playbook  border-top-engineering rounded-[4px] ":
                favoriteItem.selected,
              "border-transparent": !favoriteItem.selected,
              "flex flex-row items-center justify-between my-[4px] relative border-l-[2px]  transition duration-200 ease":
                true,
            })}
          >
            <span
              onClick={() =>
                selectedFavoriteItem(favoriteItem, "toggle", "favorite")
              }
              className="w-[24px] h-[24px] absolute left-[5px] top-[50%] mt-[-12px] p-[4px]"
            >
              <img
                src={favoriteItem.selected ? arrow_blue : to_arrow}
                alt="arrow"
                className={classNames({
                  "rotate-[90deg]": favoriteItem.open,
                  "transition duration-200 ease": true,
                })}
              />
            </span>

            <span
              onClick={() =>
                selectedFavoriteItem(favoriteItem, "selected", "favorite")
              }
              className={classNames({
                "text-buttons-bg": favoriteItem.selected,
                "transition duration-200 ease": true,
                "flex flex-row items-center gap-[8px] w-[100%] font-manrope text-[16px] font-semibold leading-[21.86px] px-[8px] py-[11px] pl-[32px]":
                  true,
              })}
            >
              {t<string>("COMMON.FAVOURITES")}
            </span>
            <img
              src={favoriteItem.selected ? plus_blue : plus}
              alt="plus"
              className="w-[16px] h-[16px] absolute right-[8px] top-[50%] mt-[-8px]"
            />
          </button>
          {favoriteItem.open && (
            <ul className="flex flex-col gap-[4px] ">
              {favorites.map((playbook: any, index: number) => (
                <li key={playbook.id} className="w-[100%]">
                  <button
                    onClick={() => selectedItemMenu(playbook, "favorite")}
                    className={classNames({
                      "sidebar-item flex flex-row px-[8px] py-[6px] gap-[8px] items-center w-[100%] relative hover:pr-[54px] transition duration-200 ease":
                        true,
                      "bg-active-playbook border-l-[2px]  border-top-engineering rounded-[4px] pl-[6px]":
                        playbook.id === data.id,
                    })}
                  >
                    <img
                      onClick={(e) => openSubMenu(e, playbook)}
                      src={playbook.id === data.id ? arrow_blue : to_arrow}
                      alt="arrow"
                      className={classNames({
                        "rotate-[90deg]": playbook.open,
                        "transition duration-200 ease": true,
                      })}
                    />
                    <img src={index > 2 ? red_saas : blue_saas} alt="saas" />
                    <span
                      className={classNames({
                        "text-buttons-bg": playbook.id === data.id,
                        "text-top-sub-secondary": playbook.id !== data.id,
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
                          "hover:bg-active-playbook": playbook.id === data.id,
                          "hover:bg-option-btn": playbook.id !== data.id,
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
                          "hover:bg-active-playbook": playbook.id === data.id,
                          "hover:bg-option-btn": playbook.id !== data.id,
                          "w-[20px] h-[20px] flex items-center p-[2px] rounded-[2px]":
                            true,
                        })}
                      >
                        <img
                          src={playbook.id === data.id ? plus_blue : plus_gray}
                          alt="add"
                        />
                      </span>
                    </div>
                  </button>
                  {playbook.pages && playbook.open && (
                    <>
                      {playbook.pages.map((page: any, indexChapter: number) => (
                        <button
                          key={page.id}
                          onClick={() => {
                            selectPageMenu(playbook, page, "favorite");
                          }}
                          className={classNames({
                            "flex flex-row pr-[8px] py-[8px] pl-[38px] gap-[8px] items-center w-[100%]":
                              true,
                            "text-top-sub-secondary": page.id !== data.page_id,
                            "text-buttons-bg":
                              playbook.id === data.id &&
                              page.id === data.page_id,
                          })}
                        >
                          <p className="truncate text-[16px] leading-[22px] tracking-[-0.1px]">
                            {page.title}
                          </p>
                        </button>
                      ))}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>

      <div
        onClick={() => dispatch(setToggleSidebar(!sideOpen))}
        className={classNames({
          "side-overlay fixed left-[0px] top-[0px] w-[100%] h-[100vh] bg-side-overlay z-[99] min-[1024px]:hidden transition-all duration-[300ms] ease-in":
            true,
          "opacity-0 invisible z-0": sideOpen,
        })}
      ></div>
    </div>
  );
};

export default Sidebar;

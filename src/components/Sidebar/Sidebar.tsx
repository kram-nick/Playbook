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
import plus_blue from "../../assets/photos/main/plus-blue.svg";
import arrow_blue from "../../assets/photos/main/arrow-down-blue.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";
import { useLocation } from "react-router-dom"; 
 


const Sidebar = () => {
  const location = useLocation(); 
  const [showPlaybooks, setShowPlaybooks] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const { data } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handlePlaybooks = () => {
    setShowPlaybooks(!showPlaybooks);
    dispatch(
      setSelectedData({
        id: 0,
        selected: false,
        title: '',
        chapters: [],
        chapter_title:'',
        chapter_id: 0
      })
    )      
  };

  const handleFavourites = () => {
    setShowFavourites(!showFavourites);
  };

  const handleSideBar = () => { 
    setShowSidebar(!showSidebar);
  }; 

  return (
    
    <div  className={classNames({ 
      "min-w-[280px]  min-h-[100%] max-lg:min-w-[0%]":true,
      " ": showSidebar,
    })}>
      <div  
      className={classNames({
        "bg-list-title w-[280px] h-[100%] px-[12px] border-solid border-r-[1px] left-[0px] border-r-header-bottom gap-[21.4px] max-lg:left-[-350px] ":true,
        "fixed top-[0] min-h-[100%] max-lg:z-[100] transition duration-500 ease-in overflow-y-auto":true,
        "max-lg:left-[0px!important]": showSidebar,
      })}
      >
        <img className="py-[16px]" src={playbookLogo} alt="playbookLogo" />
        <nav className="flex flex-col ">
          {location.pathname.slice(1) === "Main" ? (
            <button onClick={handlePlaybooks} 
              className="flex flex-row items-center justify-between my-[4px] px-[8px] py-[11px] 
                bg-active-playbook border-l-[2px] border-top-engineering rounded-[4px] pl-[6px]">  
              <span className="flex flex-row items-center gap-[8px] font-manrope 
                text-[16px] font-semibold leading-[21.86px] text-buttons-bg "> 
                <img src={arrow_blue} alt="arrow" className={classNames({"rotate-[90deg]":
                    showPlaybooks,
                  })} />
                {t<string>("COMMON.PLAYBOOKS")}
              </span>
              <img src={location.pathname.slice(1) === "Main" ? plus_blue : plus} alt="plus" />
            </button>
          ) : (
            <button
              onClick={handlePlaybooks}
              className="flex flex-row items-center justify-between my-[4px] px-[8px] py-[11px] ">
              <span className="flex flex-row items-center gap-[8px] font-manrope text-[16px] font-semibold leading-[21.86px] text-home-title ">
                <img src={showPlaybooks ? active_arrow : to_arrow} alt="arrow" />
                {t<string>("COMMON.PLAYBOOKS")}
              </span>
              <img src={plus} alt="plus" />
            </button>          
          )}
      
          {/* playbooks.length !== 0 */}
          {showPlaybooks && (
            <ul className="flex flex-col gap-[4px]  w-full">
              {playbooks.map((playbook: any, index: number) => (
                <li key={playbook.id} className="w-[100%]"> 
                  <button
                    onClick={() => 
                      dispatch(
                        setSelectedData({
                          id: playbook.id,
                          selected: true,
                          title: playbook.title,
                          chapters: playbook.chapters,
                          chapter_title:'',
                          chapter_id:0
                        })
                      )                   
                    }
                    
                    className={classNames({
                      "flex flex-row px-[8px] py-[6px] gap-[8px] items-center w-[100%]":
                        true,
                      "bg-active-playbook border-l-[2px]   border-top-engineering rounded-[4px] pl-[6px]":
                        playbook.id === data.id,
                    })}>
                    <img src={playbook.id === data.id ? arrow_blue : to_arrow} alt="arrow" className={classNames({"rotate-[90deg]": playbook.id === data.id})} />
                    <img src={index > 2 ? red_saas : blue_saas} alt="saas" />
                    <span
                      className={classNames({
                        "text-buttons-bg": playbook.id === data.id,
                        "text-top-sub-secondary": playbook.id !== data.id,
                        "font-poppins font-normal  text-[16px] leading-[26px] tracking-[-0.1px]":
                          true
                      })}>
                      {playbook.title}
                    </span>
                  </button>
                  
                  {playbook.chapters.length && playbook.id === data.id && (
                    <>
                      {playbook.chapters.map((chapter: any, indexChapter: number) => (
                          <button
                          key={chapter.id}
                          onClick={() =>
                            dispatch(
                              setSelectedData({
                                id: playbook.id,
                                selected: true,
                                title: playbook.title,
                                chapter_title: chapter.title,
                                chapter_id: chapter.id,
                                chapters: playbook.chapters,
                                chapter_text:chapter.text
                              })
                            )
                          }
                          className={classNames({
                            "flex flex-row pr-[8px] py-[8px] pl-[38px] gap-[8px] items-center w-[100%]":
                              true,                             
                            "text-top-sub-secondary": chapter.id !== data.chapter_id,  
                            "text-buttons-bg":
                            playbook.id === data.id && chapter.id === data.chapter_id,
                          })}>
                            <p className="truncate text-[16px] leading-[22px] tracking-[-0.1px]">{chapter.title}</p>
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
            onClick={handleFavourites}
            className="flex flex-row items-center justify-between  px-[8px] py-[11px] ">
            <span className="flex flex-row items-center gap-[8px] font-manrope text-[16px] font-semibold leading-[21.86px] text-home-title ">
              <img src={showFavourites ? active_arrow : to_arrow} alt="arrow" />
              {t<string>("COMMON.FAVOURITES")}
            </span>
            <img src={plus} alt="plus" />
          </button>
          {showFavourites && (
            <ul className="flex flex-col gap-[4px] ">
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

      {showSidebar && (
        <div onClick={handleSideBar} 
          className="side-overlay fixed left-[0px] top-[0px] w-[100%] h-[100vh] bg-side-overlay z-[99] min-[1024px]:hidden"></div>
      )}
    </div>
 
  );
};

export default Sidebar;

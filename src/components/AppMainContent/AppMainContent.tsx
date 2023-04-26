import { useTranslation } from "react-i18next";  
import classNames from "classnames";
import { useState } from "react";

import icon_plus from "../../assets/photos/main/plus.svg";
import icon_empty from "../../assets/photos/main/empty.svg";
import icon_down_gray from "../../assets/photos/main/arrow-down-gray.svg"; 
import icon_grid from "../../assets/photos/main/icon-grid.svg";
import icon_grid_default from "../../assets/photos/main/icon-grid-default.svg";
import icon_row from "../../assets/photos/main/row-vertical.svg";
import icon_row_default from "../../assets/photos/main/row-vertical-default.svg";
import poster from "../../assets/photos/main/image-poster.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";
import dots from "../../assets/photos/main/dots.svg";
import star from "../../assets/photos/main/star.svg";
import star_active from "../../assets/photos/main/star-active.svg";

import { playbooks } from "../../core/constants/sidebar";
 
 

const AppMainContent = () => {
  const { t } = useTranslation();  
  const [listType, handleViewType] = useState(true);
 
  const [items, setPlaybooks] = useState(playbooks);
  const handleView = (type:any) => {
    handleViewType(type);
  };

  const handlePriorityClick = (id: number) => {
    setPlaybooks((prevPlaybooks) =>
      prevPlaybooks.map((playbook) =>
        playbook.id === id ? { ...playbook, priority: !playbook.priority } : playbook
      )
    );
  };

  const handleDeleteClick = (id: number) => {
    setPlaybooks((prevPlaybooks) => prevPlaybooks.filter((playbook) => playbook.id !== id));
  };

  return (
     <div className="px-[24px] py-[24px]">
        <div className="flex items-center justify-between font-poppins w-[100%] pb-[20px]">
          <h1 className="text-[24px] font-semibold text-home-title leading-normal">Playbooks</h1>
          <button
            className="bg-button-submit-footer flex items-center py-[5px] px-[16px] rounded-[5px]
            shadow-free-trial h-[40px] gap-[6px]
          ">
            <span className="text-list-title text-[16px] font-medium">
              {t<string>("MAIN.ADD_BTN")}
            </span>
            <img src={icon_plus} alt="" />
          </button>
        </div>
        <div className="content">

            {items.length === 0 && (
              <div className="empty font-poppins flex items-center justify-center flex-wrap mt-[8vh]">
                <img src={icon_empty} alt="empty page" />
                
                <div className="w-[100%] text-center mt-[20px] mb-[40px]">

                  <p className="text-home-title text-[20px] font-medium leading-[28px] tracking-[-0.1px] mb-[16px]">
                    {t<string>("MAIN.EMPTY_TITLE")}
                  </p>
                  <p className="tracking-[-0.1px] text-[16px] leading-[26px] text-simple-text">
                    {t<string>("MAIN.EMPTY_TEXT")}
                  </p>
                </div>
                <button
                  className="bg-button-submit-footer flex items-center py-[5px] px-[16px] rounded-[5px]
                  shadow-free-trial h-[40px] gap-[6px]
                ">
                  <span className="text-list-title text-[16px] font-medium">
                    {t<string>("MAIN.CREATE_BTN")}
                  </span>
                  <img src={icon_plus} alt="" />
                </button>                
              </div>
            )}

            {items.length !== 0 && (
              <div>
                <div className="flex items-center justify-between font-poppins w-[100%] pb-[20px]">
                  <div className="flex items-center">
                    <span className="mr-[13px] text-[16px] leading-[26px] tracking-[-0.1px] 
                      text-input-paceholder">{t<string>("MAIN.FILTER_TITLE")}</span>
                    <div className="flex items-center">
                       <span className="text-[16px] leading-[20px] font-medium text-simple-text mr-[6px]">All files</span>
                      <img src={icon_down_gray} alt="arrow filter" />
                    </div>
                  </div>

                  <div className="options flex items-center">
                    <div className="flex items-center">
                      <span className="mr-[13px] text-[16px] leading-[26px] tracking-[-0.1px] 
                        text-simple-text">{t<string>("MAIN.SORT_TITLE")}</span>
                      <div className="flex items-center">
                        <span className="text-[16px] leading-[20px] font-medium text-simple-text mr-[6px]">Last viewed</span>
                        <img src={icon_down_gray} alt="arrow filter" />
                      </div>
                    </div>   
                    <div className="flex items-center gap-[12px] ml-[32px]">
                      <button onClick={() => {handleView(true)}} 
                        className="flex items-center justify-center bg-white w-[40px] h-[40px] rounded-[5px]
                          border-solid border-[1px] shadow-free-trial border-header-bottom">
                        <img src={listType ?  icon_grid : icon_grid_default} alt="Type cards" />
                      </button>
                      <button onClick={() => {handleView(false)}} 
                        className="flex items-center justify-center bg-white w-[40px] h-[40px] rounded-[5px]
                          border-solid border-[1px] shadow-free-trial border-header-bottom">
                        <img src={listType ?  icon_row_default : icon_row} alt="Type list" />
                      </button>                     
                    </div>            
                  </div>
                </div>

                <div className={
                  classNames({
                   "flex gap-[20px] flex-wrap":listType,
                   "grid gap-y-[12px]":!listType,
                  })}>

                  {items.map((playbook: any, index: number) => (
                    <div className={classNames({
                      "w-[calc(25%-15px)] ":listType,
                      "pl-[56px] pr-[12px] py-[12px]":!listType,
                      "flex flex-wrap bg-white rounded-[8px] border-[1px] border-solid card-border relative" : true
                    })}>
                      <div className={classNames({
                        "w-[100%] h-[180px] rounded-t-[8px]":listType,
                        "w-[40px] h-[40px] rounded-[4px] bg-card-border" : !listType,
                        "photo relative left-[-1px] top-[-1px] right-[-1px] overflow-hidden" : true
                      })}>
                        {playbook.image && (
                          <img src={poster} alt="" className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]" />
                        )}
                         
                      </div>

                      <div className={classNames({
                        "pl-[8px] pr-[70px] py-[12px] relative":listType,
                        "w-[calc(100%-40px)]":!listType,
                        "item-content flex flex-wrap items-start font-poppins w-[100%]" : true
                      })} >
                        {listType && (
                          <div className="icon w-[28px] h-[28px] flex">
                            <img src={index > 2 ? red_saas : blue_saas} alt="saas" className="w-[28px] h-[28px]" />                          
                          </div>
                        )}

                        <div className={classNames({
                          "w-[calc(100%-28px)]":listType, 
                          "text pl-[12px]" : true
                        })} >
                          <p className="text-[16px] font-medium mb-[4px] leading-[20px] text-home-title">{playbook.title}</p>
                          <p className="text-[12px] leading-normal text-input-paceholder">{playbook.status} • {playbook.edited}</p>
                        </div>    

                        <button onClick={() => handlePriorityClick(playbook.id)}
                          className={classNames({
                            "top-[12px] right-[34px] w-[20px] h-[20px]":listType,
                            "top-[50%] left-[16px] mt-[-12px] w-[24px] h-[24px]":!listType,
                            "absolute" : true
                          })}>
                          <img src={playbook.priority ? star_active : star} alt="" className="w-[100%]" />
                        </button>

                        <button onClick={() => handleDeleteClick(playbook.id)}
                          className={classNames({
                            "top-[12px] right-[8px]":listType,
                            "top-[50%] right-[12px] mt-[-10px]":!listType,
                            "absolute w-[20px] h-[20px]" : true
                          })}>
                          <img src={dots} alt="" />
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
              

              </div>
            )}            
        </div>
     </div>
    
  );
};

export default AppMainContent;

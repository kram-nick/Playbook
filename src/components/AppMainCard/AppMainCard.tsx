import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import poster from "../../assets/photos/main/image-poster.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";
import dots from "../../assets/photos/main/dots.svg";
import star from "../../assets/photos/main/star.svg";
import star_active from "../../assets/photos/main/star-active.svg";
import icon_preview from "../../assets/photos/main/icon-play.svg";  
import icon_share from "../../assets/photos/main/icon-share.svg";  
import icon_settings from "../../assets/photos/main/setting.svg";  
import icon_delete from "../../assets/photos/main/delete.svg";  
import useOutside from "../../core/hooks/useOutside"; 
import Playbook from "../../core/interface/playbook";

 
type CardProps = {
  items:Array<Playbook>,
  item: Playbook,
  index: number,
  typeCard: boolean,
  onChangeList: (id: number) => void,
  onEditItem: (item: Playbook) => void;
}

const AppMainCard = ({items, item, index, typeCard, onChangeList, onEditItem}: CardProps) => { 
  const { t } = useTranslation(); 
  const {ref, isShow, setIsShow} = useOutside(false);
   
  const  [playbook, setPlaybook]  = useState(item);
  let  [priority, setPriority]  = useState(item.priority);
 

  const handlePriorityClick = () => { 
    setPriority(!priority); 
  };

  const handleDeleteClick = (item: Playbook) => { 
    handleChange(item);
  };

  const handleEditClick = (item: Playbook) => { 
    onEditItem(item);
  };  

  const handleChange = (item: any) => {
    onChangeList(item); 
  };
 

  const handleOpen = () => {
    setIsShow(!isShow);
  };  

  return(
    <div className={classNames({
      "w-[calc(25%-15px)] ":typeCard,
      "pl-[56px] pr-[12px] py-[12px]":!typeCard,
      "flex flex-wrap bg-white rounded-[8px] border-[1px] border-solid card-border relative" : true
    })}>
      <div className={classNames({
        "w-[100%] h-[180px] rounded-t-[8px]":typeCard,
        "w-[40px] h-[40px] rounded-[4px] bg-card-border" : !typeCard,
        "photo relative left-[-1px] top-[-1px] right-[-1px] overflow-hidden" : true
      })}>
        {playbook.image && (
          <img src={poster} alt="" className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]" />
        )}
         
      </div>

      <div className={classNames({
        "pl-[8px] pr-[70px] py-[12px] relative":typeCard,
        "w-[calc(100%-40px)]":!typeCard,
        "item-content flex flex-wrap items-start font-poppins w-[100%]" : true
      })} >
        {typeCard && (
          <div className="icon w-[28px] h-[28px] flex">
            <img src={index > 2 ? red_saas : blue_saas} alt="saas" className="w-[28px] h-[28px]" />                          
          </div>
        )}

        <div className={classNames({
          "w-[calc(100%-28px)]":typeCard, 
          "text pl-[12px]" : true
        })} >
          <p className="text-[16px] font-medium mb-[4px] leading-[20px] text-home-title">{playbook.title}</p>
          <p className="text-[12px] leading-normal text-input-paceholder">{playbook.status} • {playbook.edited}</p>
        </div>    

        <button onClick={() => handlePriorityClick()}
          className={classNames({
            "top-[12px] right-[34px] w-[20px] h-[20px]":typeCard,
            "top-[50%] left-[16px] mt-[-12px] w-[24px] h-[24px]":!typeCard,
            "absolute" : true
          })}>
          <img src={priority ? star_active : star} alt="" className="w-[100%]" />
        </button>

        <div className={classNames({
              "top-[12px] right-[8px]":typeCard,
              "top-[50%] right-[12px] mt-[-10px]":!typeCard,
              "absolute w-[20px] h-[20px] dropdown-menu" : true
            })}>
          <button onClick={handleOpen}
            className={classNames({
              "bg-card-border":isShow, 
              "w-[20px] h-[20px] rounded-[2px]" : true
            })}>
            <img src={dots} alt="" />
          </button>   
                     
          {isShow ? (
            <ul className="menu absolute right-[0] top-[calc(100%+9px)] bg-white py-[8px]
              rounded-[5px] border-[1px] border-solid border-header-bottom shadow-dropmenu
              font-poppins min-w-[150px] z-10" ref={ref}>
              <li className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer hover:bg-card-border">
                <img src={icon_preview} alt=""  className="w-[24px] h-[24px]" />
                <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.PREVIEW")}</span>
              </li>
              <li className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer hover:bg-card-border"> 
                <img src={icon_share} alt="" className="w-[24px] h-[24px]" />
                <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.SHARE")}</span>
              </li>   
              <li onClick={() => handleEditClick(item)} 
                className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer hover:bg-card-border"> 
                <img src={icon_settings} alt="" className="w-[24px] h-[24px]" />
                <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.SETTINGS")}</span>
              </li>                           
              <li onClick={() => handleDeleteClick(item)} 
                className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer hover:bg-card-border"> 
                <img src={icon_delete} alt="" className="w-[24px] h-[24px]" />
                <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.DELETE")}</span>
              </li>
            </ul>
          ) : null}
        </div>                        
      </div>
    </div>    
  )
};

export default AppMainCard;

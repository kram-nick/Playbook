import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import poster from "../../assets/photos/main/image-poster.svg";
import red_saas from "../../assets/photos/create/red-saas.svg";
import blue_saas from "../../assets/photos/create/blue-saas.svg";
import dots from "../../assets/photos/main/dots.svg";
import star from "../../assets/photos/main/star.svg";
import star_mobile from "../../assets/photos/main/star-mobile.svg";
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
  onShareItem: (item: Playbook) => void;
  onSocialModal: (item: Playbook) => void;
}

const AppMainCard = ({items, item, index, typeCard, onChangeList, onEditItem, onShareItem, onSocialModal}: CardProps) => { 
  const { t } = useTranslation(); 
  const {ref, isShow, setIsShow} = useOutside(false);
   
  const  [playbook, setPlaybook]  = useState(item);
  let  [priority, setPriority]  = useState(item.priority);
 

  const handlePriorityClick = () => { 
    setPriority(!priority); 
  };

  // const handleChange = (item: any) => {
  //   onChangeList(item); 
  // };
 
  const handleOpen = () => {
    setIsShow(!isShow);
  };  

  const handleDeleteClick = (item: any) => { 
    onChangeList(item);
  };

  const handleEditClick = (item: Playbook) => { 
    onEditItem(item);
  };  
  const handleShareClick = (item: Playbook) => { 
    onShareItem(item);
  };      
  const handleSocialClick = (item: Playbook) => { 
    onSocialModal(item);
  };    

  return(
    <div className={classNames({
      "w-[calc(25%-15px)] max-xl:w-[calc(33.33%-16px)] max-[690px]:w-[100%]":typeCard,
      "pl-[56px] pr-[12px] py-[12px]":!typeCard,
      "flex flex-wrap bg-white rounded-[8px] border-[1px] border-solid card-border relative" : true
    })}>
      <div className={classNames({
        "w-[100%] h-[180px] rounded-t-[8px]":typeCard,
        "w-[40px] h-[40px] rounded-[4px]" : !typeCard,
        "photo relative left-[-1px] top-[-1px] right-[-1px] overflow-hidden bg-card-border" : true
      })}>
        {playbook.image && (
          <img src={poster} alt="" className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]" />
        )}
         
      </div>

      <div className={classNames({
        "pl-[8px] pr-[70px] py-[12px] relative max-lg:pr-[25px]":typeCard,
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
            "top-[12px] right-[34px] w-[20px] h-[20px] max-lg:hidden":typeCard,
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
              "min-[1024px]:bg-card-border":isShow, 
              "w-[20px] h-[20px] rounded-[2px]" : true
            })}>
            <img src={dots} alt="" />
          </button>   
                     
          {isShow && (
            <div className="menu absolute right-[0] min-[1024px]:top-[calc(100%+9px)] bg-white py-[8px]
              min-[1024px]:rounded-[5px] border-[1px] border-solid border-header-bottom shadow-dropmenu
              font-poppins min-w-[150px] z-10 transition-all duration-[300ms] ease-in max-[1024px]:z-[999]
              max-[1024px]:fixed max-[1024px]:left-[0] max-[1024px]:right-[0px] max-[1024px]:bottom-[0px] max-[1024px]:p-[16px]
              max-[1024px]:pb-[32px]" ref={ref}>

              <div className="title min-[1024px]:hidden border-b-[1px] border-solid border-header-bottom mb-[4px] pb-[12px]
                text-[16px] font-medium leading-[20px] text-home-title">{item.title}</div>
              
              <ul>
                <li onClick={() => handleSocialClick(item)}
                className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]">
                  <img src={icon_preview} alt=""  className="w-[24px] h-[24px]" />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.PREVIEW")}</span>
                </li>
                <li onClick={() => handleShareClick(item)} 
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"> 
                  <img src={icon_share} alt="" className="w-[24px] h-[24px]" />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.SHARE")}</span>
                </li>   
                <li onClick={() => handlePriorityClick()}
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border min-[1024px]:hidden 
                  max-[1024px]:px-[0px]"> 
                  <img src={priority ? star_active : star_mobile} alt="" className="w-[24px] h-[24px]" />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.FAVORITE")}</span>
                </li>              
                <li onClick={() => handleEditClick(item)} 
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"> 
                  <img src={icon_settings} alt="" className="w-[24px] h-[24px]" />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.SETTINGS")}</span>
                </li>                           
                <li onClick={() => handleDeleteClick(item)} 
                  className="menu-item flex items-center px-[16px] py-[8px] gap-[8px] cursor-pointer min-[1024px]:hover:bg-card-border max-[1024px]:px-[0px]"> 
                  <img src={icon_delete} alt="" className="w-[24px] h-[24px]" />
                  <span className="text-[16px] font-medium text-simple-text leading-[20px]">{t<string>("MAIN.DELETE")}</span>
                </li>
              </ul>              
            </div>
          )}

          {isShow && (
          <div  className={classNames({
              "side-overlay fixed left-[0px] top-[0px] w-[100%] h-[100vh] bg-side-overlay z-[99] min-[1024px]:hidden transition-all duration-[300ms] ease-in":true,
              "opacity-0 invisible z-0":!isShow
            })}>
          </div>
          )}
        </div>                        
      </div>
    </div>    
  )
};

export default AppMainCard;

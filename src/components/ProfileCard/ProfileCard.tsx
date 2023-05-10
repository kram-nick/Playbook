import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import poster from "../../assets/photos/main/image-poster.svg"; 
import star from "../../assets/photos/profile/star.svg";
import star_active from "../../assets/photos/main/star-active.svg"; 
import useOutside from "../../core/hooks/useOutside"; 
import Playbook from "../../core/interface/playbook";
import { Link } from "react-router-dom";
import ModalSignup from "../Modals/ModalSignUp";
import { useModal } from "../../core/hooks/useModal";

 
type CardProps = {
  items:Array<Playbook>,
  item: Playbook,
  index: number,
  typeCard: boolean,
}

const ProfileCard = ({items, item, index, typeCard}: CardProps) => { 
  const { t } = useTranslation(); 
  const {ref, isShow, setIsShow} = useOutside(false);
   
  const  [playbook, setPlaybook]  = useState(item);
  let { isOpenModal, toggle } = useModal();
  let  [priority, setPriority]  = useState(item.priority);
 

  const handlePriorityClick = () => { 
    setPriority(!priority); 
  };
 
  const handleOpen = () => {
    setIsShow(!isShow);
  };  

 
  return(
    <>
      <div className={classNames({
        "w-[calc(50%-10px)] max-[690px]:w-[100%]":typeCard, 
        "grid bg-white rounded-[8px] border-[1px] border-solid card-border relative p-[18px] gap-y-[16px]" : true
      })}>

        <div className="header">
          <Link to="/playbook" className="text-[24px] font-bold text-home-title leading-normal mb-[4px] max-[690px]:text-[20px]">{playbook.title}</Link>
          <p className="text-[16px] text-input-paceholder leading-[26px] max-[690px]:text-[14px]">Viewed 1235 times</p>
        </div>
  
        <div className="photo relative left-[-1px] top-[-1px] right-[-1px] overflow-hidden bg-card-border 
          w-[100%] h-[240px] rounded-[8px]" >
          {playbook.image && (
            <img src={poster} alt="" className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]" />
          )}
          
        </div>

        <div className="flex items-center gap-[8px]">
          <button onClick={()=> toggle()}  className="w-[calc(100%-56px)] h-[46px] px-[12px] rounded-[6px] border-btn-free border-[1px] border-solid 
            shadow-free-trial bg-blue-light text-buttons-bg text-[16px] font-medium flex items-center text-center justify-center"  >
            {t<string>("PROFILE.GET_FREE")}
          </button>
          <button onClick={() => handlePriorityClick()}
            className="w-[46px] h-[46px] p-[12px] rounded-[6px] border-header-bottom border-[1px] border-solid"  >
            <img src={priority ? star_active : star} alt="" className="w-[100%]" />
          </button>         
        </div>
      </div>  
      
      <ModalSignup  isOpen={isOpenModal} toggle={toggle}></ModalSignup> 
     </>
  )
};

export default ProfileCard;

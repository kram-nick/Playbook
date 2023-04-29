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

import { playbooks } from "../../core/constants/sidebar";
import AppMainCard from "../AppMainCard";
 
import ModalDelete from "../Modals/ModalDelete"; 
import ModalPlaybookDetail from "../Modals/ModalPlaybookDetail";
import {useModal,useModalDetail, useModalShare, useModalSocial} from "../../core/hooks/useModal";
import ModalShare from "../Modals/ModalShare";
import ModalShareSocial from "../Modals/ModalShareSocial";
 
 
const AppMainContent = () => {
  const { t } = useTranslation();  
  const [listType, handleViewType] = useState(true); 
  let { isOpenModal, toggle } = useModal();
  let { isOpenDetailModal, toggleDetail } = useModalDetail(); 
  let { isOpenShareModal, toggleShare } = useModalShare(); 
  let { isOpenSocialModal, toggleSocial } = useModalSocial(); 

  let [items, setPlaybooks] = useState(playbooks);
  let [selectedItem, setItem] = useState(null);
 
  const handleView = (type:any) => {
    handleViewType(type);
  };

  const setSelectedItem = (item:any) => {
    setItem(item);
  };  

  const openDeleteModal = (item: any) => {
    setSelectedItem(item);
    isOpenModal = true;
    toggle(); 
  };

  const deleteItem = (item?: any) => {
    if(item && item.id){
      setPlaybooks((prevPlaybooks) => prevPlaybooks.filter((playbook) => playbook.id !== item.id));
    }
    setItem(null);
    isOpenModal = false;
    toggle();    
  }

  const openDetailModal = (item?: any) => {
    if(item){ 
      setItem(item);
    } else {
      setItem(null);
    }
    isOpenDetailModal = true;
    toggleDetail();    
  }  

  const openEditModal = (item?: any) => {
    openDetailModal(item);
  }  
  const openShareModal = (item?: any) => {
    if(item){ 
      setItem(item);
    } else {
      setItem(null);
    }
    isOpenShareModal = true;
    toggleShare();   
  }   
  const openSocialModal = (item?: any) => {
    if(item){ 
      setItem(item);
    } else {
      setItem(null);
    }
    isOpenSocialModal = true;
    toggleSocial();   
  }  
   
 

  return (
     <div className="px-[24px] py-[24px]">
        <div className="flex items-center justify-between font-poppins w-[100%] pb-[20px]">
          <h1 className="text-[24px] font-semibold text-home-title leading-normal">Playbooks</h1>
          <button
            className="bg-button-submit-footer flex items-center py-[5px] px-[16px] rounded-[5px]
            shadow-free-trial h-[40px] gap-[6px]"
            onClick={() => {setItem(null);openDetailModal()}}>
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
                    <AppMainCard key={playbook.id} items={items} item={playbook} index={index} typeCard={listType}
                    onChangeList={openDeleteModal} onEditItem={openEditModal} onShareItem={openShareModal} onSocialModal={openSocialModal} />
                  ))}
 
                </div>
              </div>
            )}            
        </div> 
        <ModalDelete isOpen={isOpenModal} toggle={toggle} item={selectedItem}>
          <div className="grid grid-cols-2 font-poppins gap-[16px]">
            <button
              className="h-[46px] flex items-center justify-center 
                py-[8px] px-[15px] bg-white rounded-[5px] text-home-title
                text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
                title="Cancel"
                onClick={() => {toggle()}} >
              Cancel 
            </button>
            <button
              className="h-[46px] flex items-center justify-center  
                py-[8px] px-[15px] bg-danger rounded-[5px] text-buttons-color 
                text-[16px] font-medium leading-[20px] shadow-free-trial "
              onClick={() => {deleteItem(selectedItem)}} 
              title="Delete" >
                Yes, delete 
            </button>
          </div>
        </ModalDelete>     
        <ModalPlaybookDetail isOpen={isOpenDetailModal} toggle={toggleDetail} item={selectedItem}>
          <div className="grid grid-cols-2 font-poppins gap-[16px]">
              <button
                className="h-[46px] flex items-center justify-center 
                  py-[8px] px-[15px] bg-white rounded-[5px] text-home-title
                  text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
                  title="Cancel"
                  onClick={toggleDetail} >
                Cancel 
              </button>
              <button
                className="h-[46px] flex items-center justify-center  
                  py-[8px] px-[15px] bg-buttons-bg rounded-[5px] text-buttons-color 
                  text-[16px] font-medium leading-[20px] shadow-free-trial " >
                  {selectedItem ? 'Save': 'Continue'}
              </button>
            </div>          
        </ModalPlaybookDetail>
        <ModalShare  isOpen={isOpenShareModal} toggle={toggleShare} item={selectedItem}></ModalShare>          
        <ModalShareSocial  isOpen={isOpenSocialModal} toggle={toggleSocial} item={selectedItem}></ModalShareSocial>          
     </div>
    
  );
};

export default AppMainContent;

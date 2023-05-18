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
import { Filters } from "../../core/constants";
import { useAppSelector } from "../../core/hooks/useRedux";
import PlaybookService from "../../core/services/playbook.service";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { toast } from "react-toastify";
 
const AppMainContent = () => {
  const { t } = useTranslation();  
  const [listType, handleViewType] = useState(true); 
  const [reloadData, setReloadData] = useState(true); 
  let { isOpenModal, toggle } = useModal();
  let { isOpenDetailModal, toggleDetail } = useModalDetail(); 
  let { isOpenShareModal, toggleShare } = useModalShare(); 
  let { isOpenSocialModal, toggleSocial } = useModalSocial(); 
  const [activeTab, setActiveTab] = useState(Filters[1]);
  const {search} = useAppSelector((state) => state.app);
  let [items, setPlaybooks] = useState([]);
  const [data, setData]:any = useState(null);
 
  let [selectedItem, setItem] = useState(null);
 

  
  useHttpGet<any>(APIRoutes.PLAYBOOKS + '/mine', {
    resolve: (response: any) => { 
       
      if(response){
        setData(response.data);
        setPlaybooks(response.data.playbooks)
      } 
      setReloadData(false);
    }, 
    query: { },
    condition: reloadData,
    dependencies: [data, reloadData],
  });   
 
  const saveCallback = (reload: boolean) => {
    setReloadData(reload); 
  }

  const handleActiveTab = (tab:any) => {
    setActiveTab(tab); 
    console.log(data)
    if(data){
      if( tab.id === 1){
        setPlaybooks(data.playbooks)
      } else if ( tab.id === 2 ){
        setPlaybooks(data.favorites)
      } else if ( tab.id === 3 ){
        setPlaybooks(data.purchases)
      }
    }
  };  

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

  const deleteItem = async (item?: any) => {
    try { 
      const response = await PlaybookService.delete(item.id);
      if(response){
        toast.success(t<string>("MAIN.DELETE_SUCCESS")); 
        setReloadData(true); 
        setItem(null);
        isOpenModal = false;
        toggle();    
      }
    } catch (errors: any) { 
      toast.error(errors?.response?.data?.errors);          
    }    
  }

  const deleteCallback = (reload: boolean) => {
    deleteItem(selectedItem);
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
     <div className="px-[24px] py-[24px] max-lg:px-[32px] max-[690px]:px-[16px] max-[690px]:py-[12px]">
 
        <div className="flex items-center justify-between font-poppins w-[100%] pb-[20px] max-lg:pb-[16px] max-[690px]:hidden">
        {search && (
          <div>
            <h1 className="text-[24px] font-semibold text-home-title leading-normal">Search Results</h1>
            <p className="text-[16px] leading-[20px] font-medium mt-[5px]">
              You searched for "{search}". 20 Reuslts returned
            </p>          
          </div>
        )}
        {!search && (
          <h1 className="text-[24px] font-semibold text-home-title leading-normal">Playbooks</h1>
        )}        
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
                <button onClick={() => {setItem(null); openDetailModal()}}
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
                <div className="flex items-start flex-wrap justify-between font-poppins w-[100%] pb-[24px] max-lg:pb-[32px]
                  max-[690px]:flex-col-reverse max-[690px]:pb-[16px]">
                  <div className="flex items-end gap-[24px] border-b-[1px] border-solid border-header-bottom 
                    max-[690px]:overflow-x-auto max-[690px]:whitespace-nowrap max-[690px]:ml-[-16px] max-[690px]:mr-[-16px]
                    max-[690px]:w-[calc(100%+32px)] max-[690px]:pb-[1px] max-[690px]:px-[15px]">
                      {Filters.map((item: any, index: number) => (
                        <div key={index}  onClick={() => handleActiveTab(item)}
                          className={classNames({
                            "text-buttons-bg": activeTab.id === index + 1,
                            "text-nav-txt-private": activeTab.id !== index + 1,
                            "tracking-[-0.1px] relative transition duration-150 ease-in text-[16px] leading-[24px] cursor-pointer pt-[7px] pb-[11px]" : true
                          })}>
                          {item.title}
                          <div  className={classNames({
                              "w-[100%]": activeTab.id === index + 1,
                              "w-[0%]": activeTab.id !== index + 1,
                              "absolute bottom-[-1px] left-[-1px] h-[2px] transition duration-300 ease-in bg-buttons-bg" : true
                            })}>
                          </div>
                        </div>
                      ))}                    
                  </div>

                  <div className="options flex items-center max-[690px]:w-[100%] max-[690px]:justify-between max-[690px]:pb-[16px]">
                    <div className="flex items-center">
                      <span className="mr-[13px] text-[16px] leading-[26px] tracking-[-0.1px] 
                        text-simple-text max-md:hidden">{t<string>("MAIN.SORT_TITLE")}</span>
                      <div className="flex items-center">
                        <span className="text-[16px] leading-[20px] font-medium text-simple-text mr-[6px]">Last viewed</span>
                        <img src={icon_down_gray} alt="arrow filter" />
                      </div>
                    </div>   
                    <div className="flex items-center gap-[12px] ml-[32px]">
                      <button onClick={() => {handleView(true)}} 
                        className={classNames({
                          "bg-white max-[690px]:hidden":listType,
                          "flex items-center justify-center w-[40px] h-[40px]":true, 
                          "rounded-[5px] border-solid border-[1px] shadow-free-trial border-header-bottom": true
                        })}>
                        <img src={listType ?  icon_grid : icon_grid_default} alt="Type cards" />
                      </button>
                      <button onClick={() => {handleView(false)}} 
                        className={classNames({
                          "bg-white max-[690px]:hidden":!listType,
                          "flex items-center justify-center w-[40px] h-[40px] ":true, 
                          "rounded-[5px] border-solid border-[1px] shadow-free-trial border-header-bottom": true
                        })}>
                        <img src={listType ?  icon_row_default : icon_row} alt="Type list" />
                      </button>   
                                        
                    </div>            
                  </div>
                </div>

                <div className={
                  classNames({
                   "flex gap-[20px] flex-wrap max-xl:gap-[24px] max-[690px]:gap-y-[12px]":listType,
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
        <ModalDelete isOpen={isOpenModal} toggle={toggle} item={selectedItem} onDelete={deleteCallback}></ModalDelete>     
        <ModalPlaybookDetail isOpen={isOpenDetailModal} toggle={toggleDetail} item={selectedItem} onSave={saveCallback}></ModalPlaybookDetail>
        <ModalShare  isOpen={isOpenShareModal} toggle={toggleShare} item={selectedItem}></ModalShare>          
        <ModalShareSocial  isOpen={isOpenSocialModal} toggle={toggleSocial} item={selectedItem}></ModalShareSocial>          
     </div>
    
  );
};

export default AppMainContent;

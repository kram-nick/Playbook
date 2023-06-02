import React, { ReactNode } from "react";
import download from "../../assets/photos/share/download.svg";
import icon_link from "../../assets/photos/share/link-social.svg";
import twitter from "../../assets/photos/share/twitter.svg";
import facebook from "../../assets/photos/share/fb.svg";
import message from "../../assets/photos/share/message.svg";
import icon_close from "../../assets/photos/main/modal-close.svg"; 

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  class?: string;
  item: any;
  toggle: () => void;
}

 
export default function ModalShareSocial(props: ModalType) { 
 
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay bg-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} 
            className="modal-box relative w-[100%] max-w-[470px] px-[24px] py-[24px] shadow-free-trial 
              border-[1px] border-solid border-border-btn bg-white font-poppins">
            <div className="mb-[24px]">
              <p className="text-[20px] font-medium text-home-title leading-[26px] tracking-[-0.1px] mb-[4px]">
                Share {props.item ? props.item.title : ''}</p>
              <button className="absolute top-[16px] right-[16px]">
                <img src={icon_close} alt="" onClick={props.toggle} />
              </button>  

              <p className="text-[16px] leading-normal text-simple-text tracking-[-0.1px]">File Upload description</p>
            </div>    

            <div className="flex items-center gap-[40px] pt-[10px]">
              <button className="flex items-center rounded-[50%] justify-center border-[1px] border-solid border-border-btn 
                w-[50px] h-[50px] mb-[10px] bg-search-input transition duration-150 ease-in hover:bg-card-border">
                  <img src={icon_link} alt="" />
              </button>
              <button className="flex items-center rounded-[50%] justify-center border-[1px] border-solid border-border-btn 
                w-[50px] h-[50px] mb-[10px] bg-search-input transition duration-150 ease-in hover:bg-card-border">
                  <img src={download} alt="" />
              </button>   
              <button className="flex items-center rounded-[50%] justify-center border-[1px] border-solid border-border-btn 
                w-[50px] h-[50px] mb-[10px] bg-search-input transition duration-150 ease-in hover:bg-card-border">
                  <img src={twitter} alt="" />
              </button>   
              <button className="flex items-center rounded-[50%] justify-center border-[1px] border-solid border-border-btn 
                w-[50px] h-[50px] mb-[10px] bg-search-input transition duration-150 ease-in hover:bg-card-border">
                  <img src={facebook} alt="" />
              </button>   
              <button className="flex items-center rounded-[50%] justify-center border-[1px] border-solid border-border-btn 
                w-[50px] h-[50px] mb-[10px] bg-search-input transition duration-150 ease-in hover:bg-card-border">
                  <img src={message} alt="" />
              </button>                                                        
            </div>
 
          </div>
        </div>
      )}
      
    </>
  );
}

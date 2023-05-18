import React, { ReactNode } from "react";
import icon_delete from "../../assets/photos/main/modal-delete.svg";
import icon_close from "../../assets/photos/main/modal-close.svg";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  class?: string;
  item: any;
  onDelete: (reload: boolean) => void
  toggle: () => void;
}

export default function ModalDelete(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay bg-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} 
            className="modal-box relative w-[100%] max-w-[400px] px-[24px] py-[24px] shadow-free-trial rounded-[5px]
              border-[1px] border-solid border-border-btn bg-white font-poppins max-[690px]:w-[calc(100%-32px)]">
            <div className="flex items-center justify-between mb-[24px]">
                <img src={icon_delete} alt=""  />
              <button className="absolute top-[16px] right-[16px]">
                <img src={icon_close} alt="" onClick={props.toggle} />
              </button>  
            </div>    
            <div className="text mb-[24px]">
              <div className="title text-[20px] font-medium mb-[8px] text-home-title leading-normal tracking-[-0.1px]">Delete</div>
              <p className="text-[16px] leading-normal text-simple-text tracking-[-0.1px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sit senectus.</p>
            </div>
            <div className="grid grid-cols-2 font-poppins gap-[16px]">
              <button
                className="h-[46px] flex items-center justify-center 
                  py-[8px] px-[15px] bg-white rounded-[5px] text-home-title
                  text-[16px] font-medium leading-[20px] shadow-free-trial border-solid border-[1px]"
                  title="Cancel"
                  onClick={props.toggle} >
                Cancel 
              </button>
              <button
                className="h-[46px] flex items-center justify-center  
                  py-[8px] px-[15px] bg-danger rounded-[5px] text-buttons-color 
                  text-[16px] font-medium leading-[20px] shadow-free-trial "
                onClick={() => {props.onDelete(true)}} 
                title="Delete" >
                  Yes, delete 
              </button>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}

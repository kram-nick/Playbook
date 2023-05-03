import { useState } from "react";
import { useTranslation } from "react-i18next";
import icon from "../../assets/photos/chapter/arrow-right.svg";
import edit from "../../assets/photos/chapter/edit.svg";
import icon_delete from "../../assets/photos/chapter/delete.svg";

import { Chapters } from "../../core/constants/sidebar";
import classNames from "classnames";

const BookChapters = () => {
  const { t } = useTranslation(); 
  const [items, setChapters] = useState(Chapters);

 

  const deleteItem = (item?: any) => {
    if(item && item.id){
      setChapters(items.filter((el) => el.id !== item.id));
    }
  }  

  const toggleItem = (item?: any) => {
    if(item && item.id){
      items.forEach((el:any) => {
        if(el.id === item.id){
          el.open = true;
        } else {
          el.open = false;
        }
      });
       
    }
    setChapters(items);
    console.log(items)
  }  


  return (
    <div className="relative font-poppins pb-[12px]">
      {items.map((chapter: any, index: number) => ( 
        <div className="rounded-[8px] bg-white mb-[12px] border-[1px] border-solid border-header-bottom" key={index} >
          <div  
            className={classNames({
              "bg-chapter-color border-b-[1px] border-b-solid border-header-bottom":chapter.open, 
              "flex items-center justify-between relative pl-[48px] px-[16px] py-[15px] rounded-t-[8px]" : true
            })}>
            <div onClick={() => toggleItem(chapter)} 
              className="absolute z-[1] left-[0] right-[0] bottom-[0] top-[0]"></div>
            <img className={classNames({
              "origin-center rotate-90":chapter.open, 
              "w-[24px] h-[24px] absolute top-[50%] left-[16px] mt-[-12px]" : true
            })} src={icon} alt="" />
           
            <div className="text-[20px] text-home-title leading-[28px] tracking-[-0.1px] font-medium
              max-w-[calc(100%-210px)]">{chapter.title}</div>

            <div className="border-solid border-[1px] rounded-[5px] flex items-center bg-white relative z-[5]">
              <div className="rounded-l-[5px] h-[38px] border-solid border-r-[1px] flex items-center border-header-bottom
                px-[12px] text-[14px] cursor-pointer leading-[18px] tracking-[-0.1px] font-medium text-simple-text gap-[8px]
                hover:bg-people-bg transition duration-300 linear">
                  <img src={edit} alt="" />
                  {t<string>("BTNS.EDIT")}
              </div>
              <div onClick={() => deleteItem(chapter)} className="rounded-r-[5px] h-[38px]  flex items-center 
                px-[12px] text-[14px] cursor-pointer leading-[18px] tracking-[-0.1px] font-medium text-simple-text gap-[8px]
                hover:bg-people-bg transition duration-300 linear">
                  <img src={icon_delete} alt="" />
                  {t<string>("BTNS.DELETE")}
              </div>
            </div>            
          </div>
          {chapter.open && (
            <div className="p-[16px] pb-[24px]">
              <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]">{chapter.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookChapters;
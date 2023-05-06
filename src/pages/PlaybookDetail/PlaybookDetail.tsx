import { Link } from "react-router-dom";
import AppHeader from "../../components/AppHeader";  
import { Chapters, playbooks } from "../../core/constants/sidebar";
import { useState } from "react";
import BookBanner from "../../components/BookBanner";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import arrow from "../../assets/photos/main/arrow-right.svg"; 
import arrow_bread from "../../assets/photos/profile/right.svg";   
import lock from "../../assets/photos/profile/lock.svg";   
import back from "../../assets/photos/profile/back.svg";  
import star from "../../assets/photos/profile/star.svg";

const PlaybookDetail = () => {
  const { t } = useTranslation();  
  const [showDetail, handleView] = useState(false);   
  const playbook = playbooks[0];
  const chapters = Chapters;
  
  const handleViewDetail = (open: boolean | any) => {
    if(open){
      handleView(!showDetail);
    }
     
  }
 
  
  return (
    <div className="bg-create-bg-main min-h-[100vh]">
      <AppHeader profile={true} /> 

      <div className="max-w-[1230px] px-[15px] mx-[auto] pb-[40px]">
        <ul className="breadcrumb flex items-center flex-wrap font-poppins pt-[24px] pb-[36px]">
          <li className="flex items-center gap-[4px]  mb-[4px]">
            <Link to="/main" className="text-[14px] leading-[20px] tracking-[-0.1px] text-nav-txt-private">
              Main Page
            </Link>
            <img src={arrow_bread} alt="" />
          </li>
          <li className="flex items-center text-[14px] leading-[20px] tracking-[-0.1px] mb-[4px] text-nav-txt-private">
            <Link to="/profile" className="text-[14px] leading-[20px] tracking-[-0.1px] text-nav-txt-private">
              Chris’ Playbooks
            </Link>
            <img src={arrow_bread} alt="" />            
          </li>
          <li className="flex items-center text-[14px] leading-[20px] tracking-[-0.1px] mb-[4px] text-nav-txt-private">
            {playbook.title}
          </li>          
        </ul> 

        <div className="max-w-[790px] mx-[auto]">
          {!showDetail ? (
            <div className="rounded-[8px] bg-white max-[1024px]:rounded-t-[0] shadow-free-trial 
            border-[1px] border-solid border-header-bottom mb-[16px]">
              <BookBanner preview={true} />

              <div className="grid p-[24px] gap-y-[16px] mt-[-50px] max-[1024px]:px-[32px] max-[690px]:px-[16px]">
                <h1 className="text-[32px] font-poppins font-bold text-home-title max-[690px]:text-[26px] max-[690px]:leading-[32px]" >
                  {playbook.title}
                </h1>             
                {chapters?.length ? (
                  <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px] 
                    max-[690px]:text-[16px] max-[690px]:leading-[26px]">
                  {chapters.length ? chapters[0].text : ''}</p>
                ) : ('')}
                {chapters?.length ? (
                  <>
                    {chapters.map((chapter: any, index: number) => (
                      <button key={index} 
                        onClick={() => handleViewDetail(chapter.open)}  
                        className="flex items-center justify-between  rounded-[8px] bg-chapter-color px-[16px] py-[12px] 
                          border-[1px] border-solid border-card-border gap-[30px] max-[690px]:p-[12px]">
                        <span className="font-poppins text-[20px] text-home-title  font-medium leading-[28px] text-left 
                          max-[690px]:text-[16px] max-[690px]:leading-[24px]">
                          {chapter.title}
                        </span>
                        <img src={chapter.open ? arrow : lock} alt="show" />
                      </button>    
                    ))}
                  </>
                ) : ('')}

                {chapters?.length ? (
                  <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px] 
                    max-[690px]:text-[16px] max-[690px]:leading-[26px]">
                  {chapters.length ? chapters[0].text : ''}</p>
                ) : ('')}         
              </div>
            </div>
          ) :( 
            <div className="grid p-[24px] gap-y-[16px] rounded-[8px] bg-white shadow-free-trial border-[1px] 
              border-solid border-header-bottom font-poppins max-[690px]:px-[16px]">
                <button onClick={handleViewDetail}  
                  className="flex items-center text-[16px] leading-[20px] font-medium text-buttons-bg gap-[4px]">
                  <img src={back} alt="" /> {t<string>("BTNS.BACK")}
                </button>
                <h1 className={classNames({ 
                    "text-[24px] leading-normal font-semibold text-home-title max-[690px]:text-[20px]" : true
                  })}>
                  {chapters[0].title}
                </h1>             
    
                <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px] 
                  max-[690px]:text-[16px] max-[690px]:leading-[26px]">
                  {chapters[0].text}
                </p>                  
          
            </div>
          )}
          <div className="flex items-center gap-[8px] max-w-[330px] ml-[auto] mt-[16px]">
            <button className="w-[46px] h-[46px] p-[12px] rounded-[6px] border-header-bottom border-[1px] border-solid bg-white"  >
              <img src={star} alt="" className="w-[100%]" />
            </button>  
            <button  className="w-[calc(100%-56px)] h-[46px] px-[12px] rounded-[6px] border-btn-free border-[1px] 
                border-solid shadow-free-trial bg-buttons-bg text-white text-[16px] font-medium">
              {t<string>("PROFILE.GET_FREE")}
            </button>
          </div>           
        </div>
      </div>
    </div>
  );
};

export default PlaybookDetail;

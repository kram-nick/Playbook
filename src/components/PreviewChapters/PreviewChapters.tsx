import Header from "../AppLayout/PrivateLayout/Header"; 
import plus from "../../assets/photos/chapter/icon-plus.svg"; 
import arrow from "../../assets/photos/main/arrow-right.svg"; 
 
import { useAppSelector } from "../../core/hooks/useRedux";
import BookBanner from "../BookBanner";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import BookChapters from "../BookChapters";
import { Link } from "react-router-dom";

const PreviewChapters = () => {
  const { t } = useTranslation();
  const { data } = useAppSelector((state) => state.app);

  return (
    <div className="w-full">
      <Header previewState={true} />
      <div className="p-[24px] gap-[32px]">
        <div className="rounded-[8px] bg-white">
          <BookBanner preview={true} />

          <div className="grid p-[24px] gap-y-[16px] mt-[-50px]">
            <h1 className={classNames({
                "opacity-50":!data.title, 
                "text-[32px] font-poppins font-bold text-home-title" : true
              })}>
              {data.title ? (data.title) : (t<string>("CREATE.UNTITLED"))}
            </h1>             
            {data.chapters?.length && (
              <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]">
              {data.chapters.length ? data.chapters[0].text : ''}</p>
            )}
            {data.chapters?.length && (
              <>
                {data.chapters.map((chapter: any, index: number) => ( 
                  <Link key={index} to="/preview" 
                    className="flex items-center justify-between  rounded-[8px] bg-chapter-color px-[16px] py-[12px] 
                      border-[1px] border-solid border-card-border gap-[30px]">
                    <span className="font-poppins text-[20px] text-home-title  font-medium leading-[28px]">
                      {chapter.title}
                    </span>
                    <img src={arrow} alt="preview" />
                  </Link>                    
                  // <div className="rounded-[8px] bg-white mb-[12px] border-[1px] border-solid border-header-bottom" key={index} >
                  //   <div  
                  //     className={classNames({
                  //       "bg-chapter-color border-b-[1px] border-b-solid border-header-bottom":chapter.open, 
                  //       "flex items-center justify-between relative pl-[48px] px-[16px] py-[15px] rounded-t-[8px]" : true
                  //     })}>
   
                    
                  //     <div className="text-[20px] text-home-title leading-[28px] tracking-[-0.1px] font-medium
                  //       max-w-[calc(100%-210px)]">{chapter.title}</div>

                  //   </div>
 
                  // </div>
                ))}
              </>
            )}

            {data.chapters?.length && (
              <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]">
              {data.chapters.length ? data.chapters[0].text : ''}</p>
            )}            
          </div>
        </div>
 

 
      </div>
    </div>
  );
};

export default PreviewChapters;

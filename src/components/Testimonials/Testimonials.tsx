import { useTranslation } from "react-i18next";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import classNames from "classnames";

import quote from "../../assets/photos/home/quote.svg";

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white min-[1024px]:pt-[80px] min-[1024px]:pb-[140px] max-[1024px]:pt-[110px] max-[1024px]:pb-[110px]
    max-[650px]:pt-[70px] max-[650px]:pb-[80px] overflow-hidden">

      <div className="w-[100%] max-w-[1264px] px-[32px] mx-[auto] font-poppins max-[650px]:px-[16px]">
        <h2 className="text-center font-bold text-[40px] leading-[52px] text-home-title tracking-[-0.1px] max-w-[670px] mx-[auto]
            max-lg:text-[28px] max-lg:leading-[36.4px] mb-[24px]">
            {t<string>("HOME.WHAT_SAY_TITLE")}
        </h2>
        <p className="text-center text-[16px] leading-[26px] text-simple-text max-w-[594px] mx-[auto] mb-[100px] 
          max-[1024px]:mb-[54px] max-[650px]:mb-[40px]">
          {t<string>("HOME.WHAT_SAY_TEXT")}
        </p>

 
        <Swiper
          // install Swiper modules
          className="overflow-visible testimonial-swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={24}
          slidesPerView={"auto"}
          pagination={{ clickable: true }} 
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {[1,2,3,4].map((index: number) => (
          <SwiperSlide key={index}
            className="bg-tools-bg p-[50px] min-[1024px]:w-[520px!important] rounded-[20px] border-[1px] border-header-bottom
            max-[1024px]:w-[414px!important] max-[1024px]:p-[30px] max-[650px]:px-[20px] max-[650px]:py-[30px] 
            max-[650px]:w-[calc(100vw-32px)!important]">
            <div className="bg-white p-[40px] rounded-[20px] shadow-review border-[1px] border-header-bottom rotate-[-3deg] 
            max-[1024px]:p-[30px] max-[650px]:rotate-[-1.5deg]" >
              <div className="quote mb-[40px] rounded-[50%] w-[40px] h-[40px] bg-banner-bg flex p-[8px] items-center justify-center
                max-[1024px]:mb-[30px]">
                  <img
                    src={quote}
                    alt="quote"
                    className="max-w-[16px] w-[100%]"/>                  
                </div>

                <h4 className="text-[20px] leading-[28px] text-home-title tracking-[-0.1px] mb-[2px]">James Tribbitt</h4>
                <p className="text-[12px] leading-[16px] text-simple-text tracking-[-0.1px] mb-[16px]">Financial Coach</p>
 
                <p className="text-[16px] leading-[26px] text-home-title tracking-[-0.1px]">
                  They helped me model my multi-phase retirement plan with multiple sources of income. 
                  The level of detail possible with ProjectionLab is unmatched by other tools. 
                  I'm more confident in my plan because of Playbook!</p>
            </div>
          </SwiperSlide> 
          ))}
        </Swiper>
      </div>       
    </section>  
  );
};

export default Testimonials;

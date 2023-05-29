import person from "../../assets/photos/review/person.svg";
import person_tab from "../../assets/photos/review/person-tab.svg";
import person_mob from "../../assets/photos/review/person-mob.svg";
import quote from "../../assets/photos/review/quote.svg";
import { useTranslation } from "react-i18next";

import twitter from "../../assets/photos/review/twitter.svg";
import envelope from "../../assets/photos/review/envelope.svg";
import linkenin from "../../assets/photos/review/linkenin.svg";
import discord from "../../assets/photos/review/discord.svg";
import icon_envelope from "../../assets/photos/review/icon-envelope.svg";
import sparkles from "../../assets/photos/review/sparkles.svg";
import rocket from "../../assets/photos/review/rocket.svg";
import { Link } from "react-router-dom";

const Review = () => {
  const { t } = useTranslation();

  return (
    <section
      className="px-[7vw] py-[100px] bg-review-main
    max-lg:px-[32px]
    max-lg:py-[60px]
    max-[650px]:px-[16px]
    max-[650px]:py-[80px]
    "
    >
      <div
        className="mx-auto max-w-[1880px] flex flex-row gap-[80px] rounded-[20px] shadow-review-card p-[50px]
        max-[1024px]:p-[30px] max-[1024px]:gap-[30px] max-[650px]:flex-wrap max-[650px]:px-[16px]
      "
      >
        <div
          className="w-[320px] gap-[20px] grid flex-wrap max-[1024px]:w-[233px] max-[650px]:w-[100%] max-[650px]:text-center
          max-[650px]:flex max-[650px]:justify-center"
        >
          {/* <img
            src={quote}
            alt="person"
            className="hidden max-sm:block max-sm:w-[49px]"
          /> */}
          <img
            src={person}
            alt="person"
            className="block max-[1024px]:hidden max-[650px]:inline-block"
          />

          <img
            src={person_tab}
            alt="person"
            className="hidden object-fill 
            max-[650px]:hidden
            max-[1024px]:block
            "
          />
          <div className="flex flex-col gap-[6px] text-center max-[650px]:w-[100%]">
            <p className="leading-normal text-[20px] font-poppins font-semibold text-review-name">
              Chris Ragobeer
            </p>
            <span className="leading-[26px] text-[16px] font-poppins font-normal tracking-[-0.1px] text-top-sub-secondary">
              {t<string>("HOME.FOUNDER")}
            </span>
          </div>

          <div className="flex items-center justify-center gap-[16px]">
            <Link to="" className="w-[36px] flex">
              <img src={twitter} alt="" />
            </Link>
            <Link to="" className="w-[36px] flex">
              <img src={envelope} alt="" />
            </Link>
            <Link to="" className="w-[36px] flex">
              <img src={linkenin} alt="" />
            </Link>
            {/* <Link to="" className="w-[36px] flex">
                <img src={discord} alt="" />
              </Link>                                             */}
          </div>
        </div>

        <div className="flex flex-col items-start flex-1  max-lg:gap-[25px]">
          <img
            src={quote}
            alt="quote"
            className="max-[1024px]:hidden mb-[36px]"
          />
          <div className="flex flex-col">
            <h6
              className="text-[20px] self-stretch font-bold leading-[28px] text-review-name mb-[24px]
              max-[1024px]:text-[16px] max-[1024px]:leading-[21px] max-[1024px]:font-medium"
            >
              {t<string>("HOME.IMPROVEMENT")}
            </h6>

            <div className="gap-[12px] grid">
              <p className="leading-[26px] text-[16px] font-poppins font-normal tracking-[-0.1px] text-simple-text">
                <img
                  src={icon_envelope}
                  alt=""
                  className="inline-block mr-[10px]"
                />
                {t<string>("HOME.TEXT_1")}
              </p>
              <p className="leading-[26px] text-[16px] font-poppins font-normal tracking-[-0.1px] text-simple-text">
                <img src={sparkles} alt="" className="inline-block mr-[10px]" />
                {t<string>("HOME.TEXT_2")}
              </p>
              <p className="leading-[26px] text-[16px] font-poppins font-normal tracking-[-0.1px] text-simple-text">
                <img src={rocket} alt="" className="inline-block mr-[10px]" />
                {t<string>("HOME.TEXT_3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;

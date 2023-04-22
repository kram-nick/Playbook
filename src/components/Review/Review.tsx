import person from "../../assets/photos/review/person.svg";
import person_tab from "../../assets/photos/review/person-tab.svg";
import person_mob from "../../assets/photos/review/person-mob.svg";
import quote from "../../assets/photos/review/quote.svg";
import { useTranslation } from "react-i18next";

const Review = () => {
  const { t } = useTranslation();

  return (
    <section
      className="px-[7vw] py-[125px] bg-review-main
    max-lg:px-[32px]
    max-lg:py-[90px]
    ">
      <div
        className="mx-auto max-w-[1880px] flex flex-row gap-[80px] rounded-[20px] shadow-review-card p-[50px]
    max-sm:items-center
    max-sm:flex-col
    max-sm:p-[30px]
    max-sm:gap-[30px]
    max-lg:p-[35px]
    max-lg:gap-[40px]
      ">
        <img
          src={quote}
          alt="person"
          className="hidden max-sm:block max-sm:w-[49px]"
        />
        <img src={person} alt="person" className="block max-lg:hidden" />
        <img
          src={person_mob}
          alt="person"
          className="hidden max-lg:hidden max-sm:block"
        />
        <img
          src={person_tab}
          alt="person"
          className="hidden object-fill 
          max-sm:hidden
          max-lg:block
          "
        />
        <div
          className="flex flex-col gap-[56px] items-start
        max-lg:gap-[25px]
        ">
          <img
            src={quote}
            alt="quote"
            className="
            max-sm:hidden
          max-lg:max-w-[49px]
          "
          />
          <div className="flex flex-col gap-[35px]">
            <h6
              className="text-[29px] self-stretch font-bold leading-[44px] text-review-name
            max-lg:text-[24px]
            max-lg:leading-[36px]
            ">
              {t<string>("HOME.IMPROVEMENT")}
            </h6>
            <div className="flex flex-col gap-[6px]">
              <p className="leading-[30px] text-[20px] font-poppins font-semibold text-review-name">
                Chris Ragobeer
              </p>
              <span className="leading-[26px] text-[16px] font-poppins font-normal tracking-[-0.1px] text-top-sub-secondary">
                {t<string>("HOME.FOUNDER")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;

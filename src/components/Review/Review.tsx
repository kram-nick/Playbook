import person from "../../assets/photos/review/person.svg";
import quote from "../../assets/photos/review/quote.svg";
const Review = () => {
  return (
    <section className="px-[7vw] py-[125px] bg-review-main">
      <div className="mx-auto max-w-[1880px] flex flex-row gap-[80px] rounded-[20px] shadow-review-card p-[50px]">
        <img src={person} alt="person" />
        <div className="flex flex-col gap-[56px] items-start">
          <img src={quote} alt="quote" />
          <div className="flex flex-col gap-[35px]">
            <h6 className="text-[29px] self-stretch font-bold leading-[44px] text-review-name">
              1% continuous improvement puts you ahead of the curve. Don’t left
              behind!
            </h6>
            <div className="flex flex-col gap-[6px]">
              <p className="leading-[30px] text-[20px] font-poppins font-semibold text-review-name">
                Chris Ragobeer
              </p>
              <span className="leading-[26px] text-[16px] font-poppins font-normal tracking-[-0.1px] text-top-sub-secondary">
                Founder and CEO of Playbook
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;

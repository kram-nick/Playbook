import figures from "../../assets/photos/top-playbook/figures.svg";
import arrow_to_side from "../../assets/photos/top-playbook/arrow-to-side.svg";

const TopFeatures = () => {
  return (
    <section className="px-[7vw] flex flex-col gap-[80px] mb-[140px] mx-auto max-w-[1880px]">
      <div className="flex flex-col gap-[24px] items-center justify-center pl-[228px] pr-[230px]">
        <h2 className="text-top-playbook-title font-inter font-bold leading-[52px] text-center text-[40px]">
          Top 3 playbooks
        </h2>
        <p className="text-top-subtitle-playbook font-poppins font-normal text-center leading-[26px] text-[16px]">
          Using these proven design tools, we make sure our clients receive the
          result they expect within the set timeframe.
        </p>
      </div>
      <div className="flex flex-row gap-[40px] justify-between items-center">
        <ul className="flex flex-col gap-[61px]">
          <div className="flex-1 max-w-[344px]">
            <span className="mb-1 py-[8px] px-[16px] text-[12px] font-poppins text-top-sub-accent capitalize text-center leading-[19px] tracking-[0.03em] font-semibold rounded-[100px] bg-top-engineering">
              Engineering Management
            </span>
            <div className="text-top-playbook-title text-[24px] font-semibold normal-case leading-[36px] mb-[8px] mt-[16px] ">
              <a href="">How to Hire 10x Engineers</a>
            </div>
            <p className="font-poppins text-[16px] leading-[26px] text-top-sub-secondary font-normal not-italic">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor
            </p>
          </div>
          <div className="flex-1 max-w-[344px]">
            <span className="mb-1 py-[8px] px-[16px] text-[12px] font-poppins text-top-sub-accent capitalize text-center leading-[19px] tracking-[0.03em] font-semibold rounded-[100px] bg-top-entrepreneur">
              Entrepreneur
            </span>
            <div className="text-top-playbook-title text-[24px] font-semibold normal-case leading-[36px] mb-[8px] mt-[16px] ">
              <a href="">The Startup Playbook</a>
            </div>
            <p className="font-poppins text-[16px] leading-[26px] text-top-sub-secondary font-normal not-italic">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor
            </p>
          </div>
          <div className="flex-1 max-w-[344px]">
            <span className="mb-1 py-[8px] px-[16px] text-[12px] font-poppins text-top-sub-accent capitalize text-center leading-[19px] tracking-[0.03em] font-semibold rounded-[100px] bg-top-ceo">
              CEO & Founders
            </span>
            <div className="text-top-playbook-title text-[24px] font-semibold normal-case leading-[36px] mb-[8px] mt-[16px] ">
              <a href="">The Culture Playbook</a>
            </div>
            <p className="font-poppins text-[16px] leading-[26px] text-top-sub-secondary font-normal not-italic">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor
            </p>
          </div>
        </ul>
        <div className="bg-top-playbook pt-[80px] pr-[107px] pb-[83px] pl-[109px] rounded-[30px] relative">
          <img src={figures} alt="figures" />
          <img
            className="absolute left-[36px] bottom-[230px]"
            src={arrow_to_side}
            alt="arrow_to_side"
          />
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;

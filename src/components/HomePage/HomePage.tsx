import Footer from "../Footer";
import Header from "../Header/Header";

import groupOne from "../../assets/photos/home/group1.svg";
import navArrows from "../../assets/photos/home/arrows-right.svg";
import facebook from "../../assets/photos/home/facebook.svg";
import youtube from "../../assets/photos/home/youtube.svg";
import twitter from "../../assets/photos/home/twitter.svg";
import people from "../../assets/photos/home/people.svg";
import sales from "../../assets/photos/home/sales.svg";
import product from "../../assets/photos/home/products.svg";
import engineering from "../../assets/photos/home/engineering.svg";
import culture from "../../assets/photos/home/culture.svg";
import marketing from "../../assets/photos/home/marketing.svg";
import ToolsBlock from "../ToolsBlock/ToolsBlock";
import Banner from "../Banner/Banner";
import TopFeatures from "../TopFeatures/TopFeatures";
import Review from "../Review/Review";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="flex mx-auto max-w-[1880px] justify-between gap-[40px] my-[58px] pl-[7vw] pr-[50px]">
        <div className="mt-[46px]">
          <h1 className="max-w-[511px] font-poppins  text-[56px] leading-[60px] font-bold text-home-title">
            Everyone needs a Playbook.
          </h1>
          <div className="flex flex-col gap-[16px] mt-[24px]">
            <p className="text-[16px] font-poppins text-simple-text max-w-[474px] leading-[26px] tracking-[-0.1px]">
              Too many errors in your processes leading to increased costs,
              wasted time and missed revenue opportunities?
            </p>
            <p className="text-[16px] font-poppins text-simple-text max-w-[511px] leading-[26px] tracking-[-0.1px]">
              Use Playbooks to create and define standard ways to execute and
              achieve successful outcomes for you and your business.
            </p>
          </div>
          <div className="flex items-center gap-[32px] mt-[48px]">
            <button className="font-semibold leading-[21px] py-[17px] px-[20px] bg-buttons-bg rounded-[6px] text-buttons-color">
              Get Started for Free
            </button>
            <div className="flex items-center">
              <p className="text-buttons-bg text-[16px] font-semibold leading-[21px] min-w-[90px]">
                Learn More
              </p>
              <img
                className="max-w-[32px]"
                src={navArrows}
                alt="navigate arrows"
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] mt-[80px] bg-people-bg p-[16px] rounded-[8px]">
            <div>
              <img src={people} alt="people" />
            </div>
            <p className="text-simple-text max-w-[256px] leading-[23px] tracking-[-0.1px] text-[16px] font-poppins font-normal">
              Join <span className="font-semibold">900+</span> entrepreneurs,
              startups & creators
            </p>
          </div>
          <div className="flex gap-[85.5px]  mt-[15px]">
            <a href="" className="flex items-center gap-[12px]">
              <img src={facebook} alt="facebook" />
              <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
                Facebook
              </span>
            </a>
            <a href="" className="flex items-center gap-[12px]">
              <img src={youtube} alt="youtube" />
              <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
                Youtube
              </span>
            </a>
            <a
              href="https://twitter.com/playbookwork"
              target="blank"
              className="flex items-center gap-[12px]"
            >
              <img src={twitter} alt="twitter" />
              <span className="font-poppins not-italic text-[14px] uppercase leading-[26px] font-medium tracking-[2px]">
                Twitter
              </span>
            </a>
          </div>
        </div>
        <div>
          <img src={groupOne} alt="group" />
        </div>
      </div>
      <div className="bg-tools-bg  mt-[104px]">
        <div className="flex flex-col mx-auto max-w-[1880px] items-center px-[7vw] pt-[140px] pb-[270px]">
          <h1 className="text-center max-w-[885px] font-bold text-[40px] leading-[52px] text-home-title font-poppins tracking-[-0.1px]">
            Design playbooks to grow revenue, reduce costs and maximize
            efficiency
          </h1>
          <p className="font-poppins text-center mt-[24px] max-w-[620px] text-[16px] leading-[26px] text-simple-text">
            Using these proven design tools, we mae sure our clients receive the
            result they expect within the set timeframe.
          </p>
          <div className="flex w-full justify-between mt-[108px]">
            <div className="flex flex-col justify-between items-center h-[150px]">
              <img src={sales} alt="sales" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                Sales
              </span>
            </div>
            <div className="flex flex-col justify-between items-center h-[150px]">
              <img src={product} alt="product" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                Product
              </span>
            </div>
            <div className="flex flex-col justify-between items-center h-[150px]">
              <img src={engineering} alt="engineering" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                Engineering
              </span>
            </div>
            <div className="flex flex-col justify-between items-center h-[150px]">
              <img src={culture} alt="culture" />
              <span className="text-[24px] font-poppins leading-[36px] font-semibold">
                Culture
              </span>
            </div>
            <div className="flex flex-col justify-between items-center h-[150px]">
              <img src={marketing} alt="marketing" />
              <span className="font-poppins text-[24px] leading-[36px] font-semibold">
                Marketing
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative top-[-130px]">
        <ToolsBlock />
      </div>
      <TopFeatures />
      <Review />
      <Banner />
      <Footer />
    </>
  );
};

export default HomePage;

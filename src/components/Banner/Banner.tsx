const Banner = () => {
  return (
    <div
      className="px-[7vw]
      max-sm:px-[16px]
    max-lg:px-[32px]
    ">
      <div className="mx-auto max-w-[1880px] bg-banner-back bg-no-repeat bg-cover my-[100px] rounded-[20px]">
        <div
          className=" flex flex-col items-center py-[66px] 
        max-sm:px-[24px]
        max-sm:py-[104px]
        max-lg:px-[80px]
        ">
          <h1
            className="text-banner-txt text-[40px] leading-[52px] font-bold font-poppins
          max-sm:text-center
          max-lg:text-[32px]
          max-lg:leading-[41.6px]
          ">
            The best playbooks help you win.
          </h1>
          <p
            className="mt-[23px] text-[20px] leading-[30px] text-banner-txt font-poppins text-center font-normal
          max-lg:mt-[18px]
          max-sm:leading-[26px]
          max-sm:tracking-[-0.1px]
          max-sm:text-[16px]
          ">
            Tell us about your problem and we get the best solution from our
            team
          </p>
          <button
            className="mt-[50px] bg-banner-btn font-bold py-[17px] px-[32px] text-buttons-color rounded-[8px] font-poppins
          max-sm:text-[16px]
          max-sm:font-semibold
          lg:font-bold
          max-lg:mt-[40px]
          ">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

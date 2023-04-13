const Banner = () => {
  return (
    <div className="px-[7vw]">
      <div className="mx-auto max-w-[1880px] bg-banner-back bg-no-repeat bg-cover my-[100px] rounded-[20px]">
        <div className=" flex flex-col items-center py-[69px]">
          <h1 className="text-banner-txt text-[40px] leading-[52px] font-bold">
            The best playbooks help you win.
          </h1>
          <p className="mt-[23px] text-[20px] leading-[30px] text-banner-txt">
            Tell us about your problem and we get the best solution from our
            team
          </p>
          <button className="mt-[50px] bg-banner-btn font-bold py-[17px] px-[32px] text-buttons-color rounded-[8px]">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

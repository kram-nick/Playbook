import ToolsBlock from "../ToolsBlock/ToolsBlock";

const Squeeze = () => {
  return (
    <main>
      <div className="min-h-[50vh] bg-squeeze-transparent bg-no-repeat bg-center bg-contain"></div>
      <div className="mx-auto max-w-[1880px] px-[7vw] flex flex-col items-center mb-[80px]">
        <h1 className="text-center max-w-[885px] font-bold text-[40px] leading-[52px] text-home-title font-poppins tracking-[-0.1px]">
          Design playbooks to grow revenue, reduce costs and maximize efficiency
        </h1>
        <p className="font-poppins text-center mt-[24px] max-w-[620px] text-[16px] leading-[26px] text-simple-text">
          Using these proven design tools, we mae sure our clients receive the
          result they expect within the set timeframe.
        </p>
      </div>
      <ToolsBlock />
    </main>
  );
};

export default Squeeze;

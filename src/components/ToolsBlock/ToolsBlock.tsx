import design from "../../assets/photos/common/design.svg";
import build from "../../assets/photos/common/build.svg";
import execute from "../../assets/photos/common/execute.svg";

const ToolsBlock = () => {
  return (
    <div className="flex gap-[36px] mx-auto max-w-[1880px] px-[7vw]">
      <div className="bg-tools-block shadow-3xl rounded-[10px]">
        <div className="flex flex-col pl-[40px] pr-[78.33px]  py-[60px]">
          <img className="max-w-[50px]" src={design} alt="design" />
          <p className="mt-[55px] font-poppins font-semibold text-home-title text-[24px] leading-[36px]">
            Design
          </p>
          <span className="mt-[12px] font-poppins font-normal text-[16px] leading-[26px] text-simple-text">
            Create a unique mobile app or a polished website that will work like
            a charm across all platforms and keep the users coming back.
          </span>
        </div>
      </div>
      <div className="bg-tools-block shadow-3xl rounded-[10px]">
        <div className="flex flex-col pl-[40px] pr-[78.33px]  py-[60px]">
          <img className="max-w-[53px]" src={build} alt="build" />
          <p className="mt-[55px] font-poppins font-semibold text-home-title text-[24px] leading-[36px]">
            Build
          </p>
          <span className="mt-[12px] font-poppins font-normal text-[16px] leading-[26px] text-simple-text">
            Create a unique mobile app or a polished website that will work like
            a charm across all platforms and keep the users coming back.
          </span>
        </div>
      </div>
      <div className="bg-tools-block shadow-3xl rounded-[10px]">
        <div className="flex flex-col pl-[40px] pr-[78.33px]  py-[60px]">
          <img className="max-w-[49px]" src={execute} alt="execute" />
          <p className="mt-[55px] font-poppins font-semibold text-home-title text-[24px] leading-[36px]">
            Execute
          </p>
          <span className="mt-[12px] font-poppins font-normal text-[16px] leading-[26px] text-simple-text">
            Create a unique mobile app or a polished website that will work like
            a charm across all platforms and keep the users coming back.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToolsBlock;

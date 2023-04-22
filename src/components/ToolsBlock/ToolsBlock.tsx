import design from "../../assets/photos/common/design.svg";
import build from "../../assets/photos/common/build.svg";
import execute from "../../assets/photos/common/execute.svg";
import { useTranslation } from "react-i18next";

const ToolsBlock = () => {
  const { t } = useTranslation();

  const block = [
    {
      title: "DESIGN_TITLE",
      desc: "TOP_BLOCK_DESC",
      img: design,
    },
    {
      title: "BUILD",
      desc: "TOP_BLOCK_DESC",
      img: build,
    },
    {
      title: "EXECUTE",
      desc: "TOP_BLOCK_DESC",
      img: execute,
    },
  ];

  return (
    <div
      className="flex gap-[36px] mx-auto max-w-[1880px] 
    min-[325px]:flex-col
    min-[325px]:pr-[18px]
    min-[325px]:pl-[17px]
    min-[325px]:gap-[24px]
    md:px-[32px]
    lg:flex-row
    lg:px-[7vw]
    ">
      {block.map((item: any) => (
        <div
          key={item.title}
          className="bg-tools-block shadow-3xl rounded-[10px]">
          <div
            className="flex flex-col pl-[40px]   
        min-[325px]:flex-col
        min-[325px]:gap-[28px]
        min-[325px]:pr-[40px]
        min-[325px]:py-[40px]
        min-[325px]:items-start
        md:py-[28px]
        md:flex-row
        lg:pr-[78.33px]
        lg:py-[60px]
        lg:flex-col
        ">
            <img
              className="w-[60px] h-[60px]"
              src={item.img}
              alt={item.title}
            />
            <div
              className="
            min-[325px]:flex
            min-[325px]:flex-col
            min-[325px]:gap-[12px]
            lg:hidden
            ">
              <p className="font-poppins font-semibold text-home-title text-[24px] leading-[36px]">
                {t<string>(`HOME.${item.title}`)}
              </p>
              <span
                className="font-poppins font-normal text-[16px] leading-[26px] text-simple-text tracking-[-0.1px]
              min-[325px]:font-light
              ">
                {t<string>(`HOME.${item.desc}`)}
              </span>
            </div>
            <p
              className="font-poppins mt-[50px]  font-semibold text-home-title text-[24px] leading-[36px]
            min-[325px]:hidden
            lg:block
            ">
              {t<string>(`HOME.${item.title}`)}
            </p>
            <span
              className="font-poppins mt-[12px] text-[16px] leading-[26px] text-simple-text tracking-[-0.1px]
            min-[325px]:hidden           
            lg:block
            ">
              {t<string>(`HOME.${item.desc}`)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsBlock;

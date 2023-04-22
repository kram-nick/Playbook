import Header from "../AppLayout/PrivateLayout/Header";
import to_arrow from "../../assets/photos/create/right.svg";
import home from "../../assets/photos/create/home.svg";
import Editor from "../Editor/Editor";
import { useAppSelector } from "../../core/hooks/useRedux";
const NewDraft = () => {
  const { title } = useAppSelector((state) => state.app.data);

  return (
    <div className="w-full">
      <Header />
      <div className="p-[24px] flex flex-col gap-[32px]">
        <div className="w-full flex flex-row justify-start items-center gap-[4px]">
          <div className="flex flex-row items-center gap-[4px]">
            <img src={home} alt="home" />
            <img src={to_arrow} alt="to_arrow" />
          </div>
          <div className="flex flex-row items-center ">
            <span className="font-poppins text-[14px] leading-[20px] tracking-[-0.1px] font-normal text-nav-txt-private ">
              {title}
            </span>
            <img src={to_arrow} alt="to-arrow" />
          </div>
          <span className="font-poppins text-[14px] leading-[20px] tracking-[-0.1px] font-normal text-nav-txt-private ">
            New Chapter
          </span>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default NewDraft;

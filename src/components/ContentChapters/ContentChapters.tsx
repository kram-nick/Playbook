import Header from "../AppLayout/PrivateLayout/Header"; 
import plus from "../../assets/photos/chapter/icon-plus.svg"; 
import { useAppSelector } from "../../core/hooks/useRedux";
import BookBanner from "../BookBanner";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import BookChapters from "../BookChapters";

const ContentChapters = () => {
  const { t } = useTranslation();
  const { title } = useAppSelector((state) => state.app.data);

  return (
    <div className="w-full flex-1">
      <Header  />
      <div className="p-[24px] gap-[32px]">
        <BookBanner preview={false} />
        <h1 className={classNames({
            "opacity-50":!title, 
            "text-[32px] font-poppins font-bold text-home-title mb-[24px]" : true
          })}>
          {title ? (title) : (t<string>("CREATE.UNTITLED"))}
        </h1>

        <BookChapters />  

        <button className="flex items-center gap-[4px] text-[16px] font-poppins font-medium text-buttons-bg">
          <img src={plus} alt="" /> 
          {(t<string>("BTNS.ADD_SECTION"))}
        </button> 
      </div>
    </div>
  );
};

export default ContentChapters;

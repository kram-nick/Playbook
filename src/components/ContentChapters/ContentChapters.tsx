import Header from "../AppLayout/PrivateLayout/Header"; 
import plus from "../../assets/photos/chapter/icon-plus.svg"; 
import { useState } from "react";
import { useAppSelector } from "../../core/hooks/useRedux";
import BookBanner from "../BookBanner";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import BookChapters from "../BookChapters";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { useLocation } from "react-router-dom";

const ContentChapters = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { title } = useAppSelector((state) => state.app.data);
  const [data, setData]:any = useState(null);
  console.log(location)

  return (
    <div className="w-full flex-1">
      <Header />
      <div className="p-[24px] gap-[32px]">
        <BookBanner preview={false} data={location.state ? location.state : null} />
        <h1 className={classNames({
            "opacity-50":!title, 
            "text-[32px] font-poppins font-bold text-home-title mb-[24px]" : true
          })}>
          {title ? (title) : (t<string>("CREATE.UNTITLED"))}
        </h1>

        <BookChapters data={location.state.name ? location.state.name : null} />  

        <button className="flex items-center gap-[4px] text-[16px] font-poppins font-medium text-buttons-bg">
          <img src={plus} alt="" /> 
          {(t<string>("BTNS.ADD_SECTION"))}
        </button> 
      </div>
    </div>
  );
};

export default ContentChapters;

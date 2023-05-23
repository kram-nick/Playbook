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
import { useLocation, useParams } from "react-router-dom";

const ContentChapters = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { title } = useAppSelector((state) => state.app.data);
  const [data, setData]: any = useState(null);
  const [reloadData, setReloadData] = useState(true);

  const { id } = useParams();

  const { fetchedData: playbook } = useHttpGet<any>(
    `${APIRoutes.PLAYBOOKS}/${id}`,
    {
      dependencies: [id],
    }
  );

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${id}/pages`, {
    resolve: (response: any) => {
      if (response) {
        setData(response?.data);
      }
      setReloadData(false);
    },
    dependencies: [id],
  });

  return (
    <div className="w-full flex-1">
      <Header />
      <div className="p-[24px] gap-[32px]">
        <BookBanner
          preview={false}
          data={playbook?.data ? playbook?.data : null}
        />
        <h1
          className={classNames({
            "opacity-50": !playbook?.data?.name,
            "text-[32px] font-poppins font-bold text-home-title mb-[24px]":
              true,
          })}>
          {playbook?.data?.name
            ? playbook?.data?.name
            : t<string>("CREATE.UNTITLED")}
        </h1>
        {data?.map((chapter: any, index: number) => (
          <BookChapters
            data={chapter ? chapter : null}
            index={index}
            key={chapter?.id}
          />
        ))}

        <button className="flex items-center gap-[4px] text-[16px] font-poppins font-medium text-buttons-bg">
          <img src={plus} alt="" />
          {t<string>("BTNS.ADD_SECTION")}
        </button>
      </div>
    </div>
  );
};

export default ContentChapters;

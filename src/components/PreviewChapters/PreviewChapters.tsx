import Header from "../AppLayout/PrivateLayout/Header";
import arrow from "../../assets/photos/main/arrow-right.svg";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import BookBanner from "../BookBanner";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { setSelectedData } from "../../core/store/reducers/app/appDataSlice";
import { APIRoutes } from "../../core/http";
import useHttpGet from "../../core/hooks/useHttpGet";

const PreviewChapters = () => {
  const { t } = useTranslation();
  const [data, setData]: any = useState(null);
  const { playbook_id } = useParams();
  const dispatch = useAppDispatch();

  const openChapter = (data: any, chapter: any) => {
    dispatch(
      setSelectedData({
        id: data.id,
        selected: true,
        title: data.title,
        chapters: data.chapters,
        page_title: chapter.title,
        page_id: chapter.id,
      })
    );
  };

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${playbook_id}`, {
    resolve: (response: any) => {
      if (response && !data) {
        setData(response?.data);
        dispatch(setSelectedData(response?.data));
        localStorage.setItem("selected_page", JSON.stringify(response?.data));
      }
    },
    dependencies: [playbook_id],
  });

  const { fetchedData: pages } = useHttpGet<any>(
    `${APIRoutes.PLAYBOOKS}/${playbook_id}/pages`,
    {
      dependencies: [playbook_id],
    }
  );

  return (
    <div className="w-full flex-1">
      <Header previewState={true} />
      <div
        className="p-[24px] gap-[32px] max-[1024px]:pt-[12px] max-[1024px]:px-[32px] max-[690px]:py-[0]
        max-[690px]:px-[0]"
      >
        <div
          className="rounded-[8px] bg-white max-[1024px]:rounded-t-[0] shadow-free-trial 
        border-[1px] border-solid border-header-bottom"
        >
          <BookBanner preview={true} data={data} />

          <div className="grid p-[24px] gap-y-[16px] mt-[-50px] max-[1024px]:px-[32px] max-[690px]:px-[16px]">
            <h1
              className={classNames({
                "opacity-50": !data?.name,
                "text-[32px] font-poppins font-bold text-home-title": true,
              })}
            >
              {data?.name ? data?.name : t<string>("CREATE.UNTITLED")}
            </h1>
            {data && data?.content ? (
              <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]">
                {data?.content}
              </p>
            ) : (
              ""
            )}
            {pages && pages?.data?.length ? (
              <>
                {pages?.data?.map((page: any, index: number) => (
                  <Link
                    key={index}
                    onClick={() => openChapter(data, page)}
                    to="/preview-chapter"
                    className="flex items-center justify-between  rounded-[8px] bg-chapter-color px-[16px] py-[12px] 
                      border-[1px] border-solid border-card-border gap-[30px] max-[690px]:p-[12px]"
                  >
                    <span className="font-poppins text-[20px] text-home-title  font-medium leading-[28px]">
                      {page?.title}
                    </span>
                    <img src={arrow} alt="preview" />
                  </Link>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewChapters;

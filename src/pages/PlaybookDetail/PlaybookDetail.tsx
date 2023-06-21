import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import BookBanner from "../../components/BookBanner";

import { useAppSelector } from "../../core/hooks/useRedux";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { Data } from "../../core/models";

import arrow from "../../assets/photos/main/arrow-right.svg";
import arrow_bread from "../../assets/photos/profile/right.svg";
import lock from "../../assets/photos/profile/lock.svg";
import back from "../../assets/photos/profile/back.svg";
import star from "../../assets/photos/profile/star.svg";
import Header from "../../components/AppLayout/PrivateLayout/Header";
import SkeletonPageItem from "../../components/Skeleton/SkeletonPageItem/SkeletonPageItem";

const PlaybookDetail = () => {
  const { t } = useTranslation();
  const [showDetail, handleView] = useState(false);
  const [playbook, setPlaybook] = useState<Data.Playbook>();
  const [pages, setPages] = useState<Data.Page[]>([]);
  const [pageId, setPageId] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { sharedId, reloadChecker } = useAppSelector((state) => state.helpers);

  const storage_playbook_id = JSON.parse(
    localStorage.getItem("playbook_id") || "{}"
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleViewDetail = (open: boolean | any) => {
    if (open) {
      handleView(!showDetail);
    }
  };

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${storage_playbook_id}`, {
    dependencies: [storage_playbook_id],
    resolve: (response) => {
      setPlaybook(response?.data);
    },
  });

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${storage_playbook_id}/pages`, {
    resolve: (response: any) => {
      setPages(response?.data);
    },
    dependencies: [storage_playbook_id, reloadChecker],
  });

  useEffect(() => {
    setLoading(true);
    if (pages) {
      setTimeout(() => setLoading(false), 850);
    }
  }, [pages]);

  return (
    <div className="bg-create-bg-main min-h-[100vh] w-full">
      <Header />
      <div className="max-w-[1230px] px-[15px] mx-[auto] pb-[40px]">
        <ul className="breadcrumb flex items-center flex-wrap font-poppins pt-[24px] pb-[36px]">
          <li className="flex items-center gap-[4px]  mb-[4px]">
            <Link
              to="/main"
              className="text-[14px] leading-[20px] tracking-[-0.1px] text-nav-txt-private"
            >
              {t<string>("PROFILE.MAIN_PAGE")}
            </Link>
            <img src={arrow_bread} alt="" />
          </li>
          <li className="flex items-center text-[14px] leading-[20px] tracking-[-0.1px] mb-[4px] text-nav-txt-private">
            <Link
              to="/profile"
              className="text-[14px] leading-[20px] tracking-[-0.1px] text-nav-txt-private"
            >
              {`${
                user?.first_name[user?.first_name.length] === "s"
                  ? user?.first_name
                  : `${user?.first_name}s`
              }’ ${t<string>("PROFILE.PLAYBOOKS")}`}
            </Link>
            <img src={arrow_bread} alt="" />
          </li>
          <li className="flex items-center text-[14px] leading-[20px] tracking-[-0.1px] mb-[4px] text-nav-txt-private">
            {playbook?.name}
          </li>
        </ul>

        <div className="max-w-[790px] mx-[auto]">
          {!showDetail ? (
            <div
              className="rounded-[8px] bg-white max-[1024px]:rounded-t-[0] shadow-free-trial 
            border-[1px] border-solid border-header-bottom mb-[16px]"
            >
              <BookBanner data={playbook} preview={true} />
              <div className="grid p-[24px] gap-y-[16px] mt-[-50px] max-[1024px]:px-[32px] max-[690px]:px-[16px]">
                <h1 className="text-[32px] font-poppins font-bold text-home-title max-[690px]:text-[26px] max-[690px]:leading-[32px]">
                  {playbook?.name}
                </h1>
                <div className="flex flex-row gap-[12px] items-center">
                  {playbook?.profile_image ? (
                    <img
                      className="w-[40px] h-[40px] rounded-[50px] object-cover"
                      src={playbook?.profile_image}
                      alt={`${playbook?.profile_first_name} ${playbook?.profile_last_name}`}
                    />
                  ) : (
                    <div className="flex justify-center items-center h-[40px] w-[40px] rounded-[50px] bg-top-entrepreneur">
                      <span className="text-banner-txt font-poppins text-[17px]">
                        {playbook?.profile_first_name.slice(0, 1).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <p className="text-[20px] font-poppins leading-[32px] text-top-playbook-title">
                    {`${playbook?.profile_first_name} ${playbook?.profile_last_name}`}
                  </p>
                </div>
                <p className="font-poppins normal font-normal text-[20px] leading-[32px] text-top-subtitle-playbook tracking-[-0.1px]">
                  {playbook?.content}
                </p>
                {pages.map((chapter: Data.Page, index: number) =>
                  loading ? (
                    <SkeletonPageItem key={chapter.id} />
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        handleViewDetail(
                          chapter.privacy === "public" ||
                            chapter.privacy === "private"
                        );
                        setPageId(chapter?.id);
                      }}
                      className="flex items-center justify-between  rounded-[8px] bg-chapter-color px-[16px] py-[12px] 
                          border-[1px] border-solid border-card-border gap-[30px] max-[690px]:p-[12px]"
                    >
                      <span
                        className="font-poppins text-[20px] text-home-title  font-medium leading-[28px] text-left 
                          max-[690px]:text-[16px] max-[690px]:leading-[24px]"
                      >
                        {chapter.title}
                      </span>
                      <img
                        src={
                          chapter.privacy === "public" ||
                          chapter.privacy === "private"
                            ? arrow
                            : lock
                        }
                        alt="show"
                      />
                      {/* <div
                      dangerouslySetInnerHTML={{ __html: chapter?.content }}
                      className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px] 
                    max-[690px]:text-[16px] max-[690px]:leading-[26px]"
                    /> */}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            pages
              .filter((page: Data.Page) => page.id === pageId)
              .map((page: Data.Page) => (
                <div
                  key={page.id}
                  className="grid p-[24px] gap-y-[16px] rounded-[8px] bg-white shadow-free-trial border-[1px] 
              border-solid border-header-bottom font-poppins max-[690px]:px-[16px]"
                >
                  <button
                    onClick={handleViewDetail}
                    className="flex items-center text-[16px] leading-[20px] font-medium text-buttons-bg hover:text-buttons-bg-hover active:text-buttons-bg-active gap-[4px]"
                  >
                    <img src={back} alt="" /> {t<string>("BTNS.BACK")}
                  </button>
                  <h1
                    className={classNames({
                      "text-[24px] leading-normal font-semibold text-home-title max-[690px]:text-[20px]":
                        true,
                    })}
                  >
                    {page?.title}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: page?.editor_content?.element,
                    }}
                    className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px] 
                  max-[690px]:text-[16px] max-[690px]:leading-[26px]"
                  />
                </div>
              ))
          )}
          <div className="flex items-center gap-[8px] max-w-[330px] ml-[auto] mt-[16px]">
            <button className="w-[46px] h-[46px] p-[12px] rounded-[6px] border-header-bottom border-[1px] border-solid bg-white">
              <img src={star} alt="" className="w-[100%]" />
            </button>
            <button
              className="w-[calc(100%-56px)] h-[46px] px-[12px] rounded-[6px] border-btn-free border-[1px] 
                border-solid shadow-free-trial bg-buttons-bg hover:bg-buttons-bg-hover active:bg-buttons-bg-active text-white text-[16px] font-medium"
            >
              {t<string>("PROFILE.GET_FREE")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookDetail;

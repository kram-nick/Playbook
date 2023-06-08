import Header from "../AppLayout/PrivateLayout/Header";
import plus from "../../assets/photos/chapter/icon-plus.svg";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import BookBanner from "../BookBanner";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import BookChapters from "../BookChapters";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateUIRoutes } from "../../core/router";

const ContentChapters = () => {
  const { t } = useTranslation();
  const [data, setData]: any = useState(null);

  const { playbook_id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { reloadChecker } = useAppSelector((state) => state.helpers);
  const { fetchedData: playbook } = useHttpGet<any>(
    `${APIRoutes.PLAYBOOKS}/${playbook_id}`,
    {
      dependencies: [playbook_id],
    }
  );

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${playbook_id}/pages`, {
    resolve: (response: any) => {
      if (response) {
        setData(response?.data);
      }
    },
    dependencies: [playbook_id, reloadChecker],
  });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const list: any = document.querySelector(".list");
    const draggingItem = document.querySelector(".dragging");

    const siblings = [...list?.querySelectorAll(".item:not(.dragging)")];

    const nextSibling = siblings.find((sibling) => {
      return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    list.insertBefore(draggingItem, nextSibling);
  };

  console.log(playbook);

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
          })}
        >
          {playbook?.data?.name
            ? playbook?.data?.name
            : t<string>("CREATE.UNTITLED")}
        </h1>
        <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]  max-[690px]:text-[16px] max-[690px]:leading-[26px] mb-[16px]">
          {playbook?.data?.content}
        </p>
        <div
          onDragOver={handleDragOver}
          onDragEnter={(e) => e.preventDefault()}
          className="list"
        >
          {data?.map((chapter: any, index: number) => (
            <BookChapters
              dataContent={chapter ? chapter : null}
              index={index}
              key={chapter?.id}
            />
          ))}
        </div>

        <button
          className="flex items-center gap-[4px] text-[16px] font-poppins font-medium text-buttons-bg"
          onClick={() => {
            navigate(`/${PrivateUIRoutes.Create}/${playbook_id}`);
          }}
        >
          <img src={plus} alt="" />
          {t<string>("BTNS.ADD_PAGE")}
        </button>
      </div>
    </div>
  );
};

export default ContentChapters;

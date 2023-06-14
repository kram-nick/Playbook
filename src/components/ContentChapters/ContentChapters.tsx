import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Reorder } from "framer-motion";

import Header from "../AppLayout/PrivateLayout/Header";
import BookBanner from "../BookBanner";
import BookChapters from "../BookChapters";

import { useAppSelector } from "../../core/hooks/useRedux";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { PrivateUIRoutes } from "../../core/router";

import plus from "../../assets/photos/chapter/icon-plus.svg";

const ContentChapters = () => {
  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { playbook_id } = useParams();

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
        <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]  max-[690px]:text-[16px] max-[690px]:leading-[26px] mb-[16px]">
          {playbook?.data?.content}
        </p>
        <div className="flex flex-col mb-[12px]">
          <Reorder.Group axis="y" onReorder={setData} values={data || []}>
            {data?.map((chapter: any, index: number) => (
              <BookChapters
                dataContent={chapter ? chapter : null}
                index={index}
                key={chapter?.id}
                pages={data}
              />
            ))}
          </Reorder.Group>
        </div>
        <button
          className="flex items-center gap-[4px] text-[16px] font-poppins font-medium text-buttons-bg"
          onClick={() => {
            navigate(`/${PrivateUIRoutes.Create}/${playbook_id}`);
          }}>
          <img src={plus} alt="" />
          {t<string>("BTNS.ADD_PAGE")}
        </button>
      </div>
    </div>
  );
};

export default ContentChapters;

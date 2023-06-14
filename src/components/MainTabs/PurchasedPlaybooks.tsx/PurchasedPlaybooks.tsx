import { useState, useEffect } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AppMainCard from "../../AppMainCard/AppMainCard";
import SkeletonPlaybook from "../../SkeletonPlaybook/SkeletonPlaybook";

import useHttpGet from "../../../core/hooks/useHttpGet";
import { APIRoutes } from "../../../core/http";
import { useAppSelector } from "../../../core/hooks/useRedux";
import { UIRoutes } from "../../../core/router";

import icon_empty from "../../../assets/photos/main/empty.svg";
import { SkeletonTypes } from "../../../core/models/enums";

const PurchasedPlaybooks = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { listType } = useAppSelector((state) => state.app);
  const { reloadChecker } = useAppSelector((state) => state.helpers);

  const { fetchedData } = useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/mine`, {
    query: {},
    dependencies: [reloadChecker],
  });

  useEffect(() => {
    setLoading(true);
    if (fetchedData?.data?.purchases) {
      setTimeout(() => setLoading(false), 850);
    }
  }, [fetchedData?.data?.purchases]);

  return (
    <div>
      {fetchedData?.data?.purchases?.length !== 0 ? (
        <div className="content">
          <div
            className={classNames({
              "flex gap-[20px] flex-wrap max-xl:gap-[24px] max-[690px]:gap-y-[12px]":
                listType,
              "grid gap-y-[12px]": !listType,
            })}>
            {fetchedData?.data?.purchases.map((playbook: any, index: number) =>
              loading ? (
                <SkeletonPlaybook
                  type={SkeletonTypes.PUBLIC}
                  key={playbook.id}
                />
              ) : (
                <AppMainCard
                  key={playbook.id}
                  items={fetchedData?.data?.purchases}
                  playbook={playbook}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="empty font-poppins flex items-center justify-center flex-wrap mt-[8vh]">
          <img src={icon_empty} alt="empty page" />

          <div className="w-[100%] text-center mt-[20px] mb-[40px]">
            <p className="text-home-title text-[20px] font-medium leading-[28px] tracking-[-0.1px] mb-[16px]">
              {t<string>("MAIN.EMPTY_PURCHASE_TITLE")}
            </p>
            <p className="tracking-[-0.1px] text-[16px] leading-[26px] text-simple-text">
              {t<string>("MAIN.EMPTY_PURCHASE_TEXT")}
            </p>
          </div>
          <button
            onClick={() => {
              navigate(`/${UIRoutes.DISCOVER}`);
            }}
            className="bg-button-submit-footer flex items-center py-[5px] px-[92px] rounded-[5px]
                  shadow-free-trial h-[40px] gap-[6px]
                ">
            <span className="text-list-title text-[16px] font-medium">
              {t<string>("MAIN.DISCOVER")}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PurchasedPlaybooks;

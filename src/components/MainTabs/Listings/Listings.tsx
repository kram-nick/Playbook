import { useTranslation } from "react-i18next";
import classNames from "classnames";

import AppMainCard from "../../AppMainCard/AppMainCard";

import { useAppDispatch, useAppSelector } from "../../../core/hooks/useRedux";
import useHttpGet from "../../../core/hooks/useHttpGet";
import { APIRoutes } from "../../../core/http";
import useModal from "../../../core/hooks/useModal";
import { MainTabs, Modal } from "../../../core/models/enums";
import { setPlaybookType } from "../../../core/store/reducers/helpers/helpersDataSlice";

import icon_empty from "../../../assets/photos/main/empty.svg";
import icon_plus from "../../../assets/photos/main/plus.svg";

const Listings = () => {
  const { t } = useTranslation();
  const { listType } = useAppSelector((state) => state.app);

  const { reloadChecker } = useAppSelector((state) => state.helpers);
  const { openModal } = useModal();

  const dispatch = useAppDispatch();

  const { fetchedData } = useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/mine`, {
    query: {},
    dependencies: [reloadChecker],
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleNew = () => {
    openModal(Modal.PLAYBOOK_DETAILS);
    dispatch(setPlaybookType("create"));
  };

  return (
    <div>
      {fetchedData?.data?.listings?.length !== 0 ? (
        <div className="content">
          <div
            className={classNames({
              "flex gap-[20px] flex-wrap max-xl:gap-[24px] max-[690px]:gap-y-[12px]":
                listType,
              "grid gap-y-[12px]": !listType,
            })}
          >
            {fetchedData?.data?.listings.map((playbook: any, index: number) => (
              <AppMainCard
                key={playbook.id}
                items={fetchedData?.data?.listings}
                playbook={playbook}
                index={index}
                tabType={MainTabs.Listings}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty font-poppins flex items-center justify-center flex-wrap mt-[8vh]">
          <img src={icon_empty} alt="empty page" />

          <div className="w-[100%] text-center mt-[20px] mb-[40px]">
            <p className="text-home-title text-[20px] font-medium leading-[28px] tracking-[-0.1px] mb-[16px]">
              {t<string>("MAIN.EMPTY_TITLE")}
            </p>
            <p className="tracking-[-0.1px] text-[16px] leading-[26px] text-simple-text">
              {`${t<string>("MAIN.EMPTY_TEXT_1")} ${
                user.first_name
              }! ${t<string>("MAIN.EMPTY_TEXT_2")}`}
            </p>
          </div>
          <button
            onClick={handleNew}
            className="bg-button-submit-footer flex items-center py-[5px] px-[16px] rounded-[5px]
                  shadow-free-trial h-[40px] gap-[6px]
                "
          >
            <span className="text-list-title text-[16px] font-medium">
              {t<string>("MAIN.CREATE_BTN")}
            </span>
            <img src={icon_plus} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;

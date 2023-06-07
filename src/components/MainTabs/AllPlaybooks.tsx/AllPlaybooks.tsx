import classNames from "classnames";
import useHttpGet from "../../../core/hooks/useHttpGet";
import { APIRoutes } from "../../../core/http";

import icon_empty from "../../../assets/photos/main/empty.svg";
import icon_plus from "../../../assets/photos/main/plus.svg";
import { useTranslation } from "react-i18next";
import AppMainCard from "../../AppMainCard/AppMainCard";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/useRedux";
import useModal from "../../../core/hooks/useModal";
import { MainTabs, Modal } from "../../../core/models/enums";
import { setPlaybookType } from "../../../core/store/reducers/helpers/helpersDataSlice";

const AllPlaybooks = () => {
  const { t } = useTranslation();

  const { listType, selectedTab } = useAppSelector((state) => state.app);
  const { reloadChecker } = useAppSelector((state) => state.helpers);
  const { user } = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const { fetchedData } = useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/mine`, {
    query: {},
    dependencies: [reloadChecker],
  });

  const handleNewPlaybook = () => {
    dispatch(setPlaybookType("create"));
    openModal(Modal.PLAYBOOK_DETAILS);
  };

  const SelectTabType = (playbook: any) => {
    let type = null;

    switch (playbook) {
      case playbook.favorited:
        type = MainTabs.Favorite;
        break;
      case playbook.user_id === user.id:
        type = MainTabs.My;
        break;
      case playbook.user_id !== user.id:
        type = MainTabs.Purchased;
        break;
      default:
        type = MainTabs.My;
        break;
    }

    return type;
  };

  return (
    <div>
      {fetchedData?.data?.playbooks?.length !== 0 ? (
        <div className="content">
          <div
            className={classNames({
              "flex gap-[20px] flex-wrap max-xl:gap-[24px] max-[690px]:gap-y-[12px]":
                listType,
              "grid gap-y-[12px]": !listType,
            })}
          >
            {fetchedData?.data?.playbooks.map(
              (playbook: any, index: number) => (
                <AppMainCard
                  key={playbook.id}
                  items={fetchedData?.data?.playbooks}
                  playbook={playbook}
                  index={index}
                  tabType={SelectTabType(playbook)}
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
              {t<string>("MAIN.EMPTY_TITLE")}
            </p>
            <p className="tracking-[-0.1px] text-[16px] leading-[26px] text-simple-text">
              {t<string>("MAIN.EMPTY_TEXT")}
            </p>
          </div>
          <button
            onClick={handleNewPlaybook}
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

export default AllPlaybooks;

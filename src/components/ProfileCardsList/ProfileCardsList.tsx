import classNames from "classnames";
import { useState } from "react";
import icon_grid from "../../assets/photos/main/icon-grid.svg";
import icon_grid_default from "../../assets/photos/main/icon-grid-default.svg";
import icon_row from "../../assets/photos/main/row-vertical.svg";
import icon_row_default from "../../assets/photos/main/row-vertical-default.svg";

import { playbooks } from "../../core/constants/sidebar";
import ProfileCard from "../ProfileCard/ProfileCard";
import { useTranslation } from "react-i18next";

type Props = {
  profile: any;
};

const AppMainContent: React.FC<Props> = ({ profile }) => {
  const [listType, handleViewType] = useState(true);
  const { t } = useTranslation();

  const handleView = (type: any) => {
    handleViewType(type);
  };

  console.log(profile?.data?.playbooks);

  return (
    <div className="py-[24px]">
      <div className="flex items-center justify-between font-poppins w-[100%] pb-[20px] ">
        <h1 className="text-[24px] font-semibold text-home-title leading-normal">
          {t<string>("PROFILE.PLAYBOOKS")}
        </h1>
        <div className="flex items-center gap-[12px] ml-[32px] max-[690px]:hidden">
          <button
            onClick={() => {
              handleView(true);
            }}
            className={classNames({
              "bg-white max-[690px]:hidden": listType,
              "flex items-center justify-center w-[40px] h-[40px]": true,
              "rounded-[5px] border-solid border-[1px] shadow-free-trial border-header-bottom":
                true,
            })}
          >
            <img
              src={listType ? icon_grid : icon_grid_default}
              alt="Type cards"
            />
          </button>
          <button
            onClick={() => {
              handleView(false);
            }}
            className={classNames({
              "bg-white max-[690px]:hidden": !listType,
              "flex items-center justify-center w-[40px] h-[40px] ": true,
              "rounded-[5px] border-solid border-[1px] shadow-free-trial border-header-bottom":
                true,
            })}
          >
            <img src={listType ? icon_row_default : icon_row} alt="Type list" />
          </button>
        </div>
      </div>
      <div className="content">
        <div
          className={classNames({
            "flex gap-[20px] flex-wrap": listType,
            "grid gap-y-[12px]": !listType,
          })}
        >
          {profile?.data?.playbooks.map((playbook: any, index: number) => (
            <ProfileCard
              key={playbook.id}
              items={playbooks}
              item={playbook}
              index={index}
              typeCard={listType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppMainContent;

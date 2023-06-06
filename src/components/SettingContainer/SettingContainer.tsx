import classNames from "classnames";
import { SettingsTabs } from "../../core/constants";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Account from "./Account/Account";
import Password from "./Password/Password";

const MainContent = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(SettingsTabs[0]);

  return (
    <>
      <h1 className="font-poppins text-[24px] leading-normal font-semibold text-home-title mb-[24px]">
        {t<string>("SETTINGS.TITLE")}
      </h1>

      <div
        className="flex items-end gap-[24px] border-b-[1px] border-solid border-header-bottom mb-[32px]
        max-[690px]:overflow-x-auto max-[690px]:whitespace-nowrap max-[690px]:ml-[-16px] max-[690px]:mr-[-16px]
        max-[690px]:w-[calc(100%+32px)] max-[690px]:pb-[1px] max-[690px]:px-[15px]"
      >
        {SettingsTabs.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => setActiveTab(item)}
            className={classNames({
              "text-buttons-bg font-medium": activeTab.id === index + 1,
              "text-nav-txt-private": activeTab.id !== index + 1,
              "tracking-[-0.1px] relative transition duration-150 ease-in text-[16px] leading-[24px] cursor-pointer pt-[7px] pb-[11px]":
                true,
            })}
          >
            {t<string>(`${item.title}`)}
            <div
              className={classNames({
                "w-[100%]": activeTab.id === index + 1,
                "w-[0%]": activeTab.id !== index + 1,
                "absolute bottom-[-1px] left-[-1px] h-[2px] transition duration-300 ease-in bg-buttons-bg":
                  true,
              })}
            ></div>
          </div>
        ))}
      </div>

      {activeTab === SettingsTabs[0] && <Account />}
      {activeTab === SettingsTabs[1] && <Password />}
    </>
  );
};

export default MainContent;

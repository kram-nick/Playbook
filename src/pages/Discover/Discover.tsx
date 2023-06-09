import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

import tab_active from "../../assets/photos/discover/tab-active.svg";
import { DiscoverTabs } from "../../core/constants";
import ProfileCard from "../../components/ProfileCard";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";

const Discover = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(1);
  const [items, setItems] = useState([]);

  useHttpGet<any>(`${APIRoutes.DISCOVER}`, {
    resolve: (response: any) => {
      if (response) {
        setItems(response?.data);
      }
    },
    dependencies: [],
  });

  return (
    <>
      <div
        className="min-[1024px]:pt-[70px] pb-[200px] max-[1024px]:pb-[150px] max-[1024px]:pt-[46px] 
        max-[650px]:pt-[28px]"
      >
        <div className="w-[100%] max-w-[1264px] px-[32px] mx-[auto] font-poppins max-[650px]:px-[16px]">
          <h1
            className="text-center font-bold text-[32px] leading-[42px] text-home-title 
              max-[650px]:text-[24px] max-[650px]:leading-[36px] mb-[60px] max-[650px]:mb-[40px]"
          >
            {t<string>("MAIN.DISCOVER_TITLE")}
          </h1>

          <div
            className="overflow-auto mb-[70px] max-[1024px]:px-[40px] max-[1024px]:mx-[-40px] max-[650px]:mx-[-16px]
            max-[650px]:px-[16px] max-[650px]:mb-[40px]"
          >
            <div className="inline-flex justify-between items-end gap-[10px] mb-[30px] min-w-[100%]">
              {DiscoverTabs.map((item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setActiveTab(item?.id)}
                  className={classNames({
                    "border-transparent text-[20px] font-medium px-[0px]":
                      activeTab === item?.id,
                    "text-home-title border-card-border px-[20px]":
                      activeTab !== item?.id,
                    "tracking-[-0.1px] relative transition duration-150 ease-in text-[16px] leading-[26px] cursor-pointer":
                      true,
                    "py-[6px]  border-[1px] rounded-[50px] text-center flex-nowrap transition-all duration-[200ms]":
                      true,
                  })}
                >
                  <span className="truncate block">{item?.title}</span>

                  <img
                    src={tab_active}
                    alt=""
                    className={classNames({
                      "opacity-1": activeTab === item?.id,
                      "opacity-0": activeTab !== item?.id,
                      "absolute bottom-[-15px] left-[50%] translate-x-[-50%]  transition-all duration-[200ms] ease-in ":
                        true,
                    })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-[1024px]:grid-cols-3 gap-[28px] max-[1023px]:grid-cols-2 max-[650px]:grid-cols-1">
            {items.map((playbook: any, index: number) => (
              <ProfileCard
                key={playbook.id + String(index)}
                item={playbook}
                index={index}
                typeCard={true}
                discover={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;

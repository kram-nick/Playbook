import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import poster from "../../assets/photos/main/image-poster.svg";
import star from "../../assets/photos/profile/star.svg";
import star_active from "../../assets/photos/main/star-active.svg";
import useOutside from "../../core/hooks/useOutside";
import Playbook from "../../core/interface/playbook";
import { Link } from "react-router-dom";

import useModal from "../../core/hooks/useModal";
import useAuth from "../../core/hooks/useAuth";
import PlaybookService from "../../core/services/playbook.service";

import { Modal } from "../../core/models/enums";

type CardProps = {
  items?: Array<any>;
  item?: any;
  index?: number;
  typeCard?: boolean;
  discover?: boolean;
};

const ProfileCard = ({ item, typeCard, discover }: CardProps) => {
  let [priority, setPriority] = useState(item.priority);
  const [playbook]: any = useState(item);

  const { t } = useTranslation();

  const { openModal } = useModal();

  const { isAuth } = useAuth();

  const handlePriorityClick = () => {
    setPriority(!priority);
  };

  const handleSignUp = () => {
    openModal(Modal.SIGN_UP);
  };

  const createOrder = async (id: string) => {
    try {
      await PlaybookService.CreateOrder({ listing_id: id });
    } catch (errors: any) {
      console.log(errors);
    }
  };

  return (
    <div
      className={classNames({
        "w-[calc(50%-10px)] max-[690px]:w-[100%]": typeCard && !discover,
        "grid bg-white rounded-[8px] border-[1px] border-solid card-border relative p-[18px] gap-y-[16px]":
          true,
      })}>
      <div className="header">
        <Link
          to="/playbook"
          className="text-[24px] font-bold text-home-title leading-normal mb-[4px] max-[690px]:text-[20px]">
          {playbook.name}
        </Link>
        {!discover && (
          <p className="text-[16px] text-input-paceholder leading-[26px] max-[690px]:text-[14px]">
            Viewed 1235 times
          </p>
        )}

        {discover && (
          <Link
            to={`/profile`}
            className="flex items-center gap-[10px] mt-[8px]">
            <div className="icon w-[24px] h-[24px] overflow-hidden relative rounded-[50%]">
              {playbook.profile_image && (
                <img
                  src={playbook.profile_image}
                  alt="Profile avatar"
                  className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
                />
              )}
            </div>
            <span className="text-input-paceholder text-[16px] tracking-[-0.1px] max-w-[calc(100%-34px)]">
              {playbook?.profile_first_name} {playbook?.profile_last_name}
            </span>
          </Link>
        )}
      </div>

      <div
        className="photo relative left-[-1px] top-[-1px] right-[-1px] overflow-hidden bg-card-border 
          w-[100%] h-[240px] rounded-[8px]">
        {playbook.header_url && (
          <img
            src={playbook.header_url}
            alt=""
            className="absolute object-cover object-center left-[0] top-[0] w-[100%] h-[100%]"
          />
        )}
      </div>

      <div className="flex items-center gap-[8px]">
        <button
          onClick={() =>
            !isAuth ? handleSignUp() : createOrder(playbook.listing_id)
          }
          className="w-[calc(100%-56px)] h-[46px] px-[12px] rounded-[6px] border-btn-free border-[1px] 
            border-solid shadow-free-trial bg-blue-light text-buttons-bg text-[16px] font-medium flex items-center 
            text-center justify-center">
          {isAuth
            ? t<string>("PROFILE.GET_FREE")
            : t<string>("PROFILE.GET_FREE")}
        </button>
        <button
          onClick={() => handlePriorityClick()}
          className="w-[46px] h-[46px] p-[12px] rounded-[6px] border-header-bottom border-[1px] border-solid">
          <img
            src={playbook.favorited ? star_active : star}
            alt=""
            className="w-[100%]"
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

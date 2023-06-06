import { useTranslation } from "react-i18next";

import icon_close from "../../../assets/photos/main/modal-close.svg";
import small_banner from "../../../assets/photos/purchase/card.svg";

import useModal from "../../../core/hooks/useModal";
import { Data } from "../../../core/models/index";
import { useAppSelector } from "../../../core/hooks/useRedux";
import useHttpGet from "../../../core/hooks/useHttpGet";
import { useState } from "react";
import { APIRoutes } from "../../../core/http";
import PlaybookService from "../../../core/services/playbook.service";
import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

const ModalPurchase = () => {
  const [playbook, setPlaybook] = useState<Data.Playbook>();
  const [listingItem, setListingItem] = useState<Data.Listing>();

  const { closeModal } = useModal();

  const { t } = useTranslation();

  const user: Data.UserAccount = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const { sharedId } = useAppSelector((state) => state.helpers);

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${sharedId}`, {
    dependencies: [],
    resolve: (response) => {
      setPlaybook(response?.data);
    },
  });

  useHttpGet<any>(`${APIRoutes.LISTINGS}/${sharedId}`, {
    dependencies: [],
    resolve: (response) => {
      setListingItem(response?.data);
    },
  });

  const CreateOrder = async () => {
    try {
      const response = await PlaybookService.CreateOrder({
        listing_id: String(sharedId),
      });
      console.log(response);
    } catch (errors: any) {
      toast.error(t<string>("ERRORS.SOMETHING_WRONG"));
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-box relative w-[100%] max-w-[839px] p-[24px] shadow-free-trial rounded-[5px]
          border-[1px] border-solid border-border-btn bg-white font-poppins 
        flex flex-col items-center
          max-md:m-[12px]
          "
    >
      <div
        className="w-full flex justify-between items-center mb-[20px]
        max-md:mb-[15px]
        "
      >
        <span className="leading-[28px] tracking-[-0.1px] text-[20px] font-normal font-poppins text-footer-main">
          {t<string>("PURCHASE.TITLE")}
        </span>
        <button onClick={closeModal}>
          <img src={icon_close} alt="close" />
        </button>
      </div>
      <div
        className="mb-[24px] flex flex-row items-start gap-[32px] justify-between w-full
          max-md:flex-col
          max-md:mb-[19px]
        "
      >
        <div
          className="rounded-[5px] border-[0.718421px] border-solid border-header-bottom flex flex-col gap-[11.49px]
          items-start p-[12.93px] min-w-[273px]
          max-md:w-full
          "
        >
          <div className="flex flex-col items-start gap-[2.87px] w-full">
            <h4 className="text-[24px] font-semibold normal leading-[36px] text-footer-main font-poppins">
              {`${playbook?.name.slice(0, 15)}...`}
            </h4>
            <div className="flex flex-row items-center gap-[7.18px]">
              <img
                src={user?.profile_image}
                alt="avatar"
                className="w-[17.34px] h-[17.34px] object-cover rounded-[50px]"
              />
              <span className="text-[16px] normal font-poppins font-normal leading-[26px] tracking-[-0.1px] text-simple-text">
                {user?.first_name} {user?.last_name}
              </span>
            </div>
          </div>
          <img
            src={playbook?.header_url}
            alt="banner"
            className="max-md:w-full max-h-[172px]"
          />
        </div>
        <div className="flex flex-col gap-[24px] justify-between min-w-[486px] w-full">
          <div className="flex flex-col gap-[12px]">
            <span className="text-[16px] text-footer-main font-semibold leading-[21px] normal">
              {t<string>("PURCHASE.AUTHOR")}
            </span>
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-row gap-[12px] items-center ">
                <img
                  src={user?.profile_image}
                  alt="big-ava"
                  className="w-[30px] h-[30px] object-cover rounded-[50px]"
                />
                <span className="text-[16px] normal font-poppins font-medium text-footer-main leading-[21px]">
                  {user?.first_name} {user?.last_name}
                </span>
              </div>
              <span
                className="text-[16px] leading-[26px] font-normal font-poppins 
                text-footer-main normal tracking-[-0.1px]"
              >
                {user?.bio}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <span className="text-[16px] normal font-poppins font-semibold text-footer-main leading-[21px]">
              {t<string>("PURCHASE.DESC")}
            </span>
            <p className="text-[16px] normal font-poppins font-normal text-footer-main leading-[26px] tracking-[-0.1px]">
              {playbook?.content}
            </p>
          </div>
          <div className="flex flex-col gap-[16px] w-full">
            <span className="text-[16px] normal font-poppins font-semibold text-footer-main leading-[21px]">
              {t<string>("PURCHASE.PRICE")}
            </span>
            <div className="flex flex-col">
              <div className="flex justify-between flex-row pt-[10px] pb-[11px]">
                <span className="text-[14px] normal font-poppins font-normal text-footer-main leading-[20px] tracking-[-0.1px]">
                  {t<string>("PURCHASE.RETAIL")}
                </span>
                <span className="text-[16px] normal font-poppins font-medium text-footer-main leading-[21px]">
                  {`$${listingItem?.retail_price}0`}
                </span>
              </div>
              <div className="flex justify-between flex-row pt-[10px] pb-[11px]">
                <span className="text-[14px] normal font-poppins font-normal text-footer-main leading-[20px] tracking-[-0.1px]">
                  {t<string>("PURCHASE.TAX")}
                </span>
                <span className="text-[16px] normal font-poppins font-medium text-footer-main leading-[21px]">
                  $12.00
                </span>
              </div>
              <div className="flex justify-between flex-row pt-[10px] pb-[11px]">
                <span className="text-[14px] normal font-poppins font-normal text-footer-main leading-[20px] tracking-[-0.1px]">
                  {t<string>("PURCHASE.DISCOUNT")}
                </span>
                <span className="text-[16px] normal font-poppins font-medium text-footer-main leading-[21px]">
                  {listingItem?.discount_price.slice(
                    0,
                    listingItem?.discount_price.indexOf(".")
                  )}
                  %
                </span>
              </div>
              <div className="flex justify-between flex-row pt-[10px] pb-[11px] border-t-[1px] border-solid border-header-bottom">
                <span className="text-[14px] normal font-poppins font-normal text-footer-main leading-[20px] tracking-[-0.1px]">
                  {t<string>("PURCHASE.TOTAL")}
                </span>
                <span className="text-[16px] normal font-poppins font-medium text-footer-main leading-[21px]">
                  {`$${listingItem?.sale_price}0`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-[16px]">
        <button
          onClick={closeModal}
          className="text-[16px] text-top-playbook-title font-poppins font-medium leading-[21px] 
          px-[41px] py-[12px] rounded-[6px] shadow-purchase_btn border-[1px] border-header-bottom"
        >
          {t<string>("PURCHASE.CANCEL")}
        </button>
        <button
          onClick={CreateOrder}
          className="text-[16px] text-buttons-color bg-buttons-bg font-poppins font-medium leading-[21px]
          px-[70.5px] py-[12px] rounded-[6px] shadow-purchase_btn"
        >
          {t<string>("PURCHASE.BUY")}
        </button>
      </div>
    </div>
  );
};

export default ModalPurchase;

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import arrow from "../../assets/photos/chapter/arrow-right.svg";
import edit from "../../assets/photos/chapter/edit.svg";
import icon_delete from "../../assets/photos/chapter/delete.svg";

import { Chapters } from "../../core/constants/sidebar";
import classNames from "classnames";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PlaybookService from "../../core/services/playbook.service";
import ModalDelete from "../Modals/ModalDelete";
import { useModal } from "../../core/hooks/useModal";
import {
  setOpenedPages,
  setSelectedData,
} from "../../core/store/reducers/app/appDataSlice";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import { Data } from "../../core/models/data";

type pagesProps = {
  preview?: boolean;
  dataContent?: any;
  index: number;
  onDelete: (item: any) => void;
};

const BookChapters: React.FC<pagesProps> = ({
  preview,
  dataContent,
  index,
  onDelete,
}) => {
  const { t } = useTranslation();
  let { isOpenModal, toggle } = useModal();
  const { data, openedPages } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteItem = async () => {
    try {
      await PlaybookService.deletePage(dataContent.id).then((resp) => {
        onDelete(dataContent.id);
        toggle();
        isOpenModal = false;
        toast.success(t<string>("MAIN.DELETE_PAGE_SUCCESS"));
      });
    } catch (errors: any) {
      toast.error(errors?.response?.data?.errors);
    }
  };

  // const toggleItem = (item?: any) => {
  //   if (item && item?.id) {
  //     items.forEach((el: any) => {
  //       if (el?.id === item?.id) {
  //         el.open = true;
  //       } else {
  //         el.open = false;
  //       }
  //     });
  //   }
  //   setItems(items);
  // };

  const toggleSection = (clickedPage: Data.Page) => {
    if (openedPages.includes(clickedPage.id)) {
      const newopenedPages = openedPages.filter(
        (id: string) => clickedPage.id !== id
      );
      dispatch(setOpenedPages(newopenedPages));
    } else {
      dispatch(setOpenedPages([...openedPages, clickedPage.id]));
    }
  };

  return (
    <div className="relative font-poppins pb-[12px]">
      <div
        className="rounded-[8px] bg-white mb-[12px] border-[1px] border-solid border-header-bottom"
        key={index}>
        <div
          className={classNames({
            "bg-chapter-color border-b-[1px] border-b-solid border-header-bottom":
              dataContent?.open,
            "flex items-center justify-between relative pl-[48px] px-[16px] py-[15px] rounded-t-[8px] cursor-pointer":
              true,
          })}>
          <div
            onClick={() => toggleSection(dataContent)}
            className="absolute z-[1] left-[0] right-[0] bottom-[0] top-[0]"></div>
          <img
            className={classNames({
              "origin-center rotate-90": openedPages.includes(dataContent.id),
              "w-[24px] h-[24px] absolute top-[50%] left-[16px] mt-[-12px]":
                true,
            })}
            src={arrow}
            alt=""
          />

          <div
            className="text-[20px] text-home-title leading-[28px] tracking-[-0.1px] font-medium
              max-w-[calc(100%-210px)]">
            {dataContent?.title}
          </div>

          <div className="border-solid border-[1px] rounded-[5px] flex items-center bg-white relative z-[5]">
            <button
              type="button"
              onClick={() => {
                dispatch(
                  setSelectedData({
                    ...data,
                    chapter_title: dataContent.title,
                  })
                );
                navigate(
                  `/editor/${dataContent?.playbook_id}/${dataContent?.id}`
                );
              }}
              className="rounded-l-[5px] h-[38px] border-solid border-r-[1px] flex items-center border-header-bottom
                px-[12px] text-[14px] cursor-pointer leading-[18px] tracking-[-0.1px] font-medium text-simple-text gap-[8px]
                hover:bg-people-bg transition duration-300 linear">
              <img src={edit} alt="" />
              {t<string>("BTNS.EDIT")}
            </button>
            <div
              onClick={() => toggle()}
              className="rounded-r-[5px] h-[38px]  flex items-center 
                px-[12px] text-[14px] cursor-pointer leading-[18px] tracking-[-0.1px] font-medium text-simple-text gap-[8px]
                hover:bg-people-bg transition duration-300 linear">
              <img src={icon_delete} alt="" />
              {t<string>("BTNS.DELETE")}
            </div>
          </div>
        </div>
        {openedPages.includes(dataContent.id) && (
          <div className="p-[16px] pb-[24px]">
            <div
              dangerouslySetInnerHTML={{ __html: dataContent?.content }}
              className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]"
            />
          </div>
        )}
      </div>
      <ModalDelete
        isOpen={isOpenModal}
        toggle={toggle}
        item={dataContent}
        onDelete={deleteItem}
        text="Do you really want to delete the page?"></ModalDelete>
    </div>
  );
};

export default BookChapters;

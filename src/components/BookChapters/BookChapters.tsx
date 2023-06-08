import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import ModalDeletePage from "../Modals/WindowTypes/ModalDeletePage";

import PlaybookService from "../../core/services/playbook.service";

import {
  setOpenedPages,
  setSelectedData,
} from "../../core/store/reducers/app/appDataSlice";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import { Data } from "../../core/models/data";
import { Modal } from "../../core/models/enums";
import useModal from "../../core/hooks/useModal";

import arrow from "../../assets/photos/chapter/arrow-right.svg";
import edit from "../../assets/photos/chapter/edit.svg";
import icon_delete from "../../assets/photos/chapter/delete.svg";
import { setSharedId } from "../../core/store/reducers/helpers/helpersDataSlice";

type pagesProps = {
  dataContent?: any;
  index: number;
};

const BookChapters: React.FC<pagesProps> = ({ dataContent, index }) => {
  const [dragging, setDragging] = useState(false);

  const { playbook_id } = useParams();

  const { t } = useTranslation();
  const { openModal } = useModal();
  const { data, openedPages } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const dragStart = () => {
    setDragging(true);
  };

  const dragEnd = () => {
    setDragging(false);

    let arr: any = [];

    document.querySelectorAll(".item").forEach((elem: any) => {
      arr.push(elem.id);
    });

    handleOrder(arr);
  };

  const handleOrder = async (arr: string[]) => {
    try {
      await PlaybookService.UpdatePlaybookOrder(String(playbook_id), arr);
    } catch (error) {}
  };

  return (
    <div
      className={classNames({
        "relative font-poppins pb-[12px] item": true,
        "dragging opacity-90": dragging,
      })}
      id={dataContent.id}
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}>
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
            <span> #{index + 1}</span> {dataContent?.title}
          </div>
          <div className="border-solid border-[1px] rounded-[5px] flex items-center bg-white relative z-[5]">
            <button
              type="button"
              onClick={() => {
                const setData = {
                  ...data,
                  page_id: dataContent.id,
                  page_title: dataContent.title,
                  open: data?.open ? data?.open : true,
                  type: data?.type ? data?.type : "my",
                  status: dataContent?.status,
                };
                dispatch(setSelectedData(setData));
                localStorage.setItem("selected_page", JSON.stringify(setData));
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
              onClick={() => {
                dispatch(setSharedId(dataContent.id));
                openModal(Modal.PAGE_DELETE);
              }}
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
    </div>
  );
};

export default BookChapters;

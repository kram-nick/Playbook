import { useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import useModal from "../../core/hooks/useModal";

import { Data } from "../../core/models";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";

import dots from "../../assets/photos/active/more.svg";
import flag from "../../assets/photos/active/flag.svg";
import icon_edit from "../../assets/photos/active/edit.svg";
import icon_delete from "../../assets/photos/main/delete.svg";
import { Modal } from "../../core/models/enums";
import { setSharedId } from "../../core/store/reducers/helpers/helpersDataSlice";
import { APIRoutes } from "../../core/http";
import useHttpGet from "../../core/hooks/useHttpGet";

type TaskCardProps = {
  task: Data.TaskCard;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const [tags, setTags] = useState<any>();
  const [playbook, setPlaybook] = useState<Data.Playbook>();
  const [isShowMore, setIsShowMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { openModal } = useModal();

  const { listType } = useAppSelector((state) => state.app);

  document.addEventListener("click", () => {
    setIsEdit(false);
    setIsShowMore(false);
  });

  useHttpGet<any>(`${APIRoutes.PLAYS_TAGS}`, {
    dependencies: [],
    resolve: (response) => {
      setTags(
        response?.data.filter((tag: any) =>
          task?.tags?.find((tg: any) => tg === tag.id)
        )
      );
    },
  });

  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${task.playbook_id}`, {
    dependencies: [],
    resolve: (response) => {
      setPlaybook(response?.data);
    },
  });

  return (
    <div
      className={classNames({
        "bg-list-title p-[24px] rounded-[8px] border-[1px] border-solid border-card-border flex flex-col  gap-[16px] justify-between hover:shadow-card":
          true,
        "max-2xl:w-[357px] max-xl:w-[340px] max-sm:w-[343px] max-[2056px]:w-[calc(25%-16px)] h-[343px]":
          listType,
        "max-w-full": !listType,
        "h-min mb-[-120px] z-10": listType && isShowMore,
      })}>
      <div className="relative flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px] min-h-[153px] justify-between">
          <div className="flex justify-between flex-row gap-[16px] items-start ">
            <h5 className="font-poppins font-medium text-[16px] leading-[21px] text-footer-main normal">
              {task.name}
            </h5>
            <button
              className="hover:bg-card-border "
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(!isEdit);
              }}>
              <img
                className="min-w-[20px] min-h-[20px]"
                src={dots}
                alt="dots"
              />
            </button>
            {isEdit && (
              <ul
                className="absolute z-20 top-[30px] right-[0px] min-w-[106px]
              py-[8px] flex flex-col bg-list-title shadow-dropmenu rounded-[5px] border-solid border-header-bottom border-[1px]">
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setSharedId(task.id));
                    openModal(Modal.EDIT_ACTIVE_PLAY);
                  }}
                  className="flex flex-row gap-[6px] items-center justify-start w-full px-[12px] py-[10px] hover:bg-secondary-hover active:bg-secondary-active">
                  <img src={icon_edit} alt="icon_edit" />
                  <span className="font-poppins text-[16px] font-medium leading-[21px] text-simple-text">
                    {t<string>("BTNS.EDIT")}
                  </span>
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setSharedId(task.id));
                    openModal(Modal.DELETE_PLAY);
                  }}
                  className="flex flex-row gap-[6px] items-center justify-start w-full px-[12px] py-[10px] hover:bg-secondary-hover active:bg-secondary-active">
                  <img src={icon_delete} alt="icon_delete" />
                  <span className="font-poppins text-[16px] font-medium leading-[21px] text-simple-text">
                    {t<string>("BTNS.DELETE")}
                  </span>
                </li>
              </ul>
            )}
          </div>
          <p
            className={classNames({
              "max-h-[150px] transition-max-height duration-300 transform origin-top ease-in overflow-hidden font-poppins text-[14px] font-normal leading-[18px] tracking-[-0.1px] text-simple-text":
                true,
              "max-h-[200px] scale-y-2": listType && isShowMore,
            })}>
            {listType && task.description.length > 115
              ? isShowMore
                ? task.description
                : `${task.description.slice(0, 115)}...`
              : task.description}{" "}
            {listType && task.description.length > 115 && (
              <button
                className="font-medium  text-footer-main"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowMore(!isShowMore);
                }}>
                {isShowMore ? "Less" : "More"}
              </button>
            )}
          </p>
          <div className="tags-scroll flex gap-[4px] flex-row items-center w-full overflow-x-scroll">
            {tags?.map((tag: any) => (
              <div
                key={tag.id}
                className={classNames({
                  "px-[10px] py-[4px] flex justify-center items-center bg-tag-bg border-[1px] border-solid border-tag-bg rounded-[8px] max-w-max":
                    true,
                })}>
                <span
                  className={classNames({
                    "text-chart-color font-poppins text-[12px] leading-[16px] font-normal normal tracking-[-0.1px] whitespace-nowrap":
                      true,
                  })}>
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {playbook && (
          <div
            className={classNames({
              "flex flex-row gap-[12px] items-center p-[12px] rounded-[8px] border-[1px] border-solid border-card-border h-[64px]":
                true,
            })}>
            <img
              className="w-[40px] h-[40px] rounded-[4px] object-center object-cover"
              src={playbook?.header_url}
              alt={playbook?.name}
            />
            <div className="flex flex-col gap-[4px] items-start">
              <span className="font-poppins font-medium text-[14px] leading-[18px] tracking-[-0.1px] normal text-footer-main">
                {playbook?.name}
              </span>
              <span className="leading-[18px] text-[12px] font-poppins font-normal text-input-placeholder normal">
                {playbook?.profile_first_name} {playbook?.profile_last_name}{" "}
                &#x2022; Page 4
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between">
        <div
          className={classNames({
            "rounded-[100px] px-[12px] py-[8px] flex justify-center items-center":
              true,
            "bg-success-status": task.status === "success",
            "bg-card-border": task.status === "not_started",
            "bg-active-playbook": task.status === "open",
            "bg-failed-status": task.status === "failed",
          })}>
          <span
            className={classNames({
              "font-poppins text-[12px] font-semibold leading-[19px] normal tracking-[0.03em] capitalize ":
                true,
              "text-bg-squeeze-engineering": task.status === "success",
              "text-footer-main": task.status === "not_started",
              "text-buttons-bg": task.status === "open",
              "text-danger": task.status === "failed",
            })}>
            {t<string>(`MODALS.${task.status.toUpperCase()}`)}
          </span>
        </div>
        <div className="flex flex-row gap-[4px] items-center">
          <img className="" src={flag} alt="flag" />
          <span className="font-poppins text-[14px] font-normal normal leading-[20px] text-nav-txt-private tracking-[-0.1px]">
            {task.due_date?.substring(0, 10)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

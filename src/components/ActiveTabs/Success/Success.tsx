import classNames from "classnames";

import Empty from "../Empty/Empty";
import TaskCard from "../../TaskCard/TaskCard";

import { useAppSelector } from "../../../core/hooks/useRedux";
import { taskcards } from "../../../core/constants/taskCards";
import { Data } from "../../../core/models";

const Success = () => {
  const { listType } = useAppSelector((state) => state.app);

  return (
    <div
      className={classNames({
        flex: true,
        "flex-row flex-wrap gap-[20px]": listType,
        "flex-col gap-[12px]": !listType,
      })}>
      {taskcards.filter((task: Data.TaskCard) => task.status === "Success")
        .length ? (
        taskcards
          .filter((task: Data.TaskCard) => task.status === "Success")
          .map((task: Data.TaskCard) => <TaskCard key={task.id} task={task} />)
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Success;

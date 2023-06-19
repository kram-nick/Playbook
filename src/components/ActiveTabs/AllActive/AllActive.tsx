import { useState } from "react";
import classNames from "classnames";

import Empty from "../Empty/Empty";
import TaskCard from "../../TaskCard/TaskCard";

import useHttpGet from "../../../core/hooks/useHttpGet";
import { APIRoutes } from "../../../core/http";
import { useAppSelector } from "../../../core/hooks/useRedux";
import { taskcards } from "../../../core/constants/taskCards";
import { Data } from "../../../core/models";

const AllActive = () => {
  const [allPlays, setAllPlays] = useState<any>();

  const { listType } = useAppSelector((state) => state.app);

  useHttpGet<any>(`${APIRoutes.PLAYS}`, {
    dependencies: [],
    resolve: (response: any) => {
      // console.log(response?.data);
    },
  });

  return (
    <div
      className={classNames({
        flex: true,
        "flex-row flex-wrap gap-x-[20px] gap-y-[20px]": listType,
        "flex-col gap-[12px]": !listType,
      })}
    >
      {taskcards.length ? (
        taskcards.map((task: Data.TaskCard) => (
          <TaskCard key={task.id} task={task} />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default AllActive;

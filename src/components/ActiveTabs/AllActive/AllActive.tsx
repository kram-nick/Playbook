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
  const [allPlays, setAllPlays] = useState<Data.TaskCard[]>();

  const { listType } = useAppSelector((state) => state.app);
  const { reloadChecker } = useAppSelector((state) => state.helpers);

  useHttpGet<any>(`${APIRoutes.PLAYS}`, {
    dependencies: [reloadChecker],
    resolve: (response: any) => {
      setAllPlays(response?.data);
    },
  });

  return (
    <div
      className={classNames({
        flex: true,
        "flex-row flex-wrap gap-x-[20px] gap-y-[20px]": listType,
        "flex-col gap-[12px]": !listType,
      })}>
      {allPlays?.length ? (
        allPlays?.map((task: Data.TaskCard) => (
          <TaskCard key={task.id} task={task} />
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default AllActive;

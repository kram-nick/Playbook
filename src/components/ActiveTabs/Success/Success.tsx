import classNames from "classnames";

import Empty from "../Empty/Empty";
import TaskCard from "../../TaskCard/TaskCard";

import { useAppSelector } from "../../../core/hooks/useRedux";
import { Data } from "../../../core/models";
import { useState } from "react";
import { APIRoutes } from "../../../core/http";
import useHttpGet from "../../../core/hooks/useHttpGet";

const Success = () => {
  const [plays, setPlays] = useState<Data.TaskCard[]>([]);

  const { listType } = useAppSelector((state) => state.app);

  const { reloadChecker } = useAppSelector((state) => state.helpers);

  useHttpGet<any>(`${APIRoutes.PLAYS}`, {
    dependencies: [reloadChecker],

    resolve: (response: any) => {
      setPlays(
        response?.data?.filter(
          (task: Data.TaskCard) => task.status === "success"
        )
      );
    },
  });

  return (
    <div
      className={classNames({
        flex: true,
        "flex-row flex-wrap gap-[20px]": listType,
        "flex-col gap-[12px]": !listType,
      })}>
      {plays?.filter((task: Data.TaskCard) => task.status === "success")
        .length ? (
        plays
          .filter((task: Data.TaskCard) => task.status === "success")
          .map((task: Data.TaskCard) => <TaskCard key={task.id} task={task} />)
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Success;

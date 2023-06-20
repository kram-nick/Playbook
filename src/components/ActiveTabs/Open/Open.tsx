import { useState } from "react";
import classNames from "classnames";

import TaskCard from "../../TaskCard/TaskCard";
import Empty from "../Empty/Empty";

import { useAppSelector } from "../../../core/hooks/useRedux";
import { Data } from "../../../core/models";
import useHttpGet from "../../../core/hooks/useHttpGet";
import { APIRoutes } from "../../../core/http";

const Open = () => {
  const [plays, setPlays] = useState<Data.TaskCard[]>([]);

  const { activeTab, listType } = useAppSelector((state) => state.app);

  const { reloadChecker } = useAppSelector((state) => state.helpers);

  useHttpGet<any>(`${APIRoutes.PLAYS}`, {
    dependencies: [reloadChecker],
    resolve: (response: any) => {
      setPlays(response?.data);
    },
  });

  return (
    <div
      className={classNames({
        flex: true,
        "flex-row flex-wrap gap-[20px]": listType,
        "flex-col gap-[12px]": !listType,
      })}>
      {plays?.filter((task: Data.TaskCard) => task.status === "open").length ? (
        plays
          .filter((task: Data.TaskCard) => task.status === "open")
          .map((task: Data.TaskCard) => <TaskCard key={task.id} task={task} />)
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Open;

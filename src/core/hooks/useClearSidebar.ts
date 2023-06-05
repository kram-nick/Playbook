import { useEffect } from "react";
import {
  setPages,
  setSelectedPlaybook,
  setSelectedTab,
  setSidebarTabs,
} from "../store/reducers/app/appDataSlice";
import { useAppDispatch } from "./useRedux";

const useClearSidebar = () => {
  const dispatch = useAppDispatch();

  if (
    !window.location.pathname.split("/").includes("creating") &&
    !window.location.pathname.split("/").includes("editor")
  ) {
    localStorage.removeItem("selected_tabs");
    localStorage.removeItem("saved_playbook");
    localStorage.removeItem("selected_page");
    dispatch(setSelectedTab(null));
    dispatch(setSidebarTabs([]));
    dispatch(setSelectedPlaybook(null));
    dispatch(setPages([]));
  }
};

export default useClearSidebar;

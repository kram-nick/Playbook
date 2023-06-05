import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDataTypes } from "./appDataTypes";
import { MainTabs } from "../../../models/enums";
import { number } from "yup";

const initialState: AppDataTypes = {
  language: "en",
  sideOpen: true,
  searchData: {
    search: "",
    data: null,
  },
  data: {
    selected: false,
    open: false,
    id: null,
    type: "",
    title: "",
    page_title: "",
    page_id: 0,
    chapters: [],
    status: "",
  },
  sidebarTabs: [],
  selectedTab: null,
  selectedPage: null,
  openedPlaybooks: [],
  openedPages: [],
  listType: true,
  modalType: "",
  isModalOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToggleSidebar(state, action: PayloadAction<boolean>) {
      state.sideOpen = action.payload;
    },
    setSearch(state, action: PayloadAction<any>) {
      state.searchData = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setSelectedData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    setOpenedPages(state, action: PayloadAction<string[]>) {
      state.openedPages = action.payload;
    },
    setListType(state, action: PayloadAction<boolean>) {
      state.listType = action.payload;
    },
    setModalType(state, action: PayloadAction<string>) {
      state.modalType = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setSidebarTabs(state, action: PayloadAction<number[]>) {
      state.sidebarTabs = action.payload;
    },
    setSelectedTab(state, action: PayloadAction<number>) {
      state.selectedTab = action.payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setToggleSidebar,
  setLanguage,
  setSelectedData,
  setSearch,
  setOpenedPages,
  setListType,
  setIsModalOpen,
  setModalType,
  setSidebarTabs,
  setSelectedTab,
} = appSlice.actions;

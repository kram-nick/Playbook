import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HelpersDataTypes } from "./helpersDataTypes";
import { PlaybookStatus } from "../../../models/enums";

const initialState: HelpersDataTypes = {
  reloadChecker: false,
  sharedId: null,
  playbookType: "",
  playbookStatus: PlaybookStatus.UNACTIVE,
};

const helpersSlice = createSlice({
  name: "helpers",
  initialState,
  reducers: {
    setReloadChecker(state, action: PayloadAction<boolean>) {
      state.reloadChecker = action.payload;
    },
    setSharedId(state, action: PayloadAction<number | string | null>) {
      state.sharedId = action.payload;
    },
    setPlaybookType(state, action: PayloadAction<string>) {
      state.playbookType = action.payload;
    },
    setPlaybookStatus(state, action: PayloadAction<string>) {
      state.playbookStatus = action.payload;
    },
  },
});

export const {
  setReloadChecker,
  setSharedId,
  setPlaybookType,
  setPlaybookStatus,
} = helpersSlice.actions;

export default helpersSlice.reducer;

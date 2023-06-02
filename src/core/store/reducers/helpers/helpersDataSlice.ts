import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HelpersDataTypes } from "./helpersDataTypes";

const initialState: HelpersDataTypes = {
  reloadChecker: false,
  sharedId: null,
  sharedData: null,
  playbookType: "",
};

const helpersSlice = createSlice({
  name: "helpers",
  initialState,
  reducers: {
    setReloadChecker(state, action: PayloadAction<boolean>) {
      state.reloadChecker = action.payload;
    },
    setSharedId(state, action: PayloadAction<number | null>) {
      state.sharedId = action.payload;
    },
    setSharedData(state, action: PayloadAction<any>) {
      state.sharedData = action.payload;
    },
    setPlaybookType(state, action: PayloadAction<string>) {
      state.playbookType = action.payload;
    },
  },
});

export const { setReloadChecker, setSharedId, setSharedData, setPlaybookType } =
  helpersSlice.actions;

export default helpersSlice.reducer;

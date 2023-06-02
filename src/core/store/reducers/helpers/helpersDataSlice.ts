import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HelpersDataTypes } from "./helpersDataTypes";

const initialState: HelpersDataTypes = {
  reloadChecker: false,
  sharedId: null,
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
  },
});

export const { setReloadChecker, setSharedId } = helpersSlice.actions;

export default helpersSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HelpersDataTypes } from "./helpersDataTypes";

const initialState: HelpersDataTypes = {
  reloadChecker: false,
};

const helpersSlice = createSlice({
  name: "helpers",
  initialState,
  reducers: {
    setReloadChecker(state, action: PayloadAction<boolean>) {
      state.reloadChecker = action.payload;
    },
  },
});

export default helpersSlice.reducer;
export const { setReloadChecker } = helpersSlice.actions;

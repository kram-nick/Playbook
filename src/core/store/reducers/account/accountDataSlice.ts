import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AccountDataTypes } from "./accountDataTypes";
import { Data } from "../../../models/data";

const initialState: AccountDataTypes = {
  user: {},
};

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Data.UserAccount>) {
      state.user = action.payload;
    },
  },
});

export default AccountSlice.reducer;
export const { setUser } = AccountSlice.actions;

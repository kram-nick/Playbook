import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDataTypes } from "./appDataTypes";

const initialState: AppDataTypes = {
  language: "en",
  data: {
    selected: false,
    id: null,
    title: "",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setSelectedData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setLanguage, setSelectedData } = appSlice.actions;

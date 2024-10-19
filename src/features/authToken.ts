import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorageAuthToken } from "../utils/utils";

export type AuthTokenState = {
  value: null | string;
};

const initialState: AuthTokenState = {
  value: getLocalStorageAuthToken(),
};

export const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    logOut: (state) => {
      state.value = null;
    },
  },
});

export const { logIn, logOut } = authTokenSlice.actions;

export default authTokenSlice.reducer;

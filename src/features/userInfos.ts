import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userInfosState = {
  value: null | {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
  };
};

const initialState: userInfosState = {
  value: null,
};

export const userInfosSlice = createSlice({
  name: "userInfos",
  initialState,
  reducers: {
    setUserInfos: (
      state,
      action: PayloadAction<{
        email: string;
        firstName: string;
        lastName: string;
        id: string;
      }>
    ) => {
      state.value = action.payload;
    },
    resetUserInfos: (state) => {
      state.value = null;
    },
  },
});

export const { setUserInfos, resetUserInfos } = userInfosSlice.actions;

export default userInfosSlice.reducer;

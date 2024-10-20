import { configureStore } from "@reduxjs/toolkit";

import authTokenReducer from "../features/authToken";
import userInfosReducer from "../features/userInfos";

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    userInfos: userInfosReducer,
  },
});

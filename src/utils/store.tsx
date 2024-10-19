import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import authTokenReducer from "../features/authToken";
import userInfosReducer, { setUserInfos } from "../features/userInfos";
import {
  selectAuthToken,
  useAppDispatch,
  useAppSelector,
} from "./hooks/selectors";
import { useEffect } from "react";
import { useRetrieveProfile } from "./hooks/api/user";

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    userInfos: userInfosReducer,
  },
});

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector(selectAuthToken);

  const { postData: retrieveProfile } = useRetrieveProfile();

  useEffect(() => {
    async function handleRetrieveProfile() {
      const profile = await retrieveProfile();

      if (profile) {
        const { email, firstName, lastName, id } = profile;
        dispatch(setUserInfos({ email, firstName, lastName, id }));
      }
    }
    if (authToken) {
      handleRetrieveProfile();
    }
  }, [authToken, dispatch, retrieveProfile]);

  return <Provider store={store}>{children}</Provider>;
}

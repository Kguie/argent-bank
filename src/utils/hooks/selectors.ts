import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const selectAuthToken = (state: RootState) => state.authToken.value;

export const selectUserInfos = (state: RootState) => state.userInfos.value;

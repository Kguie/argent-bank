import axios from "axios";

import {
  selectAuthToken,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../selectors";
import { logOut } from "../../../features/authToken";
import { useNavigate } from "react-router-dom";
import { resetUserInfos } from "../../../features/userInfos";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAppSelector(selectAuthToken);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);
    const user = useAppSelector(selectUserInfos);
    const navigate = useNavigate();

    if (
      error.response?.data?.message?.includes("Error in tokenValidation.js")
    ) {
      if (token) dispatch(logOut());
      if (user) dispatch(resetUserInfos());
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

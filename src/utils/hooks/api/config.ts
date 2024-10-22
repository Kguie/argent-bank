import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  selectAuthToken,
  selectUserInfos,
  useAppDispatch,
  useAppSelector,
} from "../selectors";
import { logOut } from "../../../features/authToken";
import { resetUserInfos } from "../../../features/userInfos";

function useAxiosInstance(): AxiosInstance {
  const token = useAppSelector(selectAuthToken);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfos);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/v1",
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (
          error.message.includes("Error in tokenValidation.js") ||
          error.status === 401
        ) {
          console.error(error);
          if (token) dispatch(logOut());
          if (user) dispatch(resetUserInfos());
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  return axiosInstance;
}

export default useAxiosInstance;

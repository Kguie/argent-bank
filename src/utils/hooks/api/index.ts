import { useState } from "react";

import useAxiosInstance from "./config";

export function usePost<P, T>(url: string) {
  const axiosInstance = useAxiosInstance();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function postData(payload?: P): Promise<T | undefined> {
    try {
      if (!url) return;
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.post(`${url}`, payload);
      return response.data.body;
    } catch (error: any) {
      setError(error.message);

      return;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, postData };
}

export function usePut<P, T>(url: string) {
  const axiosInstance = useAxiosInstance();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function putData(payload: P): Promise<T | undefined> {
    try {
      if (!url || !payload) return;
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.put(`${url}`, payload);
      return response.data.body;
    } catch (error: any) {
      setError(error.message);

      return;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, putData };
}

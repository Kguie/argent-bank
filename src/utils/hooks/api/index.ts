import { useEffect, useState } from "react";

import axiosInstance from "./config";

export function useGet<T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!url) return;
        setIsLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/${url}`);
        if (!response.data.data) throw new Error("Data not found");
        setData(response.data?.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export function usePost<P, T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function postData(payload?: P): Promise<T | undefined> {
    try {
      if (!url) return;
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.post(`/${url}`, payload);
      return response.data?.data;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function putData(payload: P): Promise<T | undefined> {
    try {
      if (!url || !payload) return;
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.put(`/${url}`, payload);
      return response.data?.data;
    } catch (error: any) {
      setError(error.message);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, putData };
}

export function useDelete<T>(url: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteData(id: string): Promise<T | undefined> {
    try {
      if (!url) return;
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.delete(`/${url}`);
      return response.data?.data;
    } catch (error: any) {
      setError(error.message);
      return;
    } finally {
      setIsLoading(false);
    }
  }

  return { deleteData, isLoading, error };
}

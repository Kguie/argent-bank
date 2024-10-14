import axios from "axios";
import { useEffect, useState } from "react";

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

        const response = await axios.get(`http://localhost:3000/${url}`);
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

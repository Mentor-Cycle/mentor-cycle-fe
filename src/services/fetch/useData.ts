import { useEffect, useState } from "react";

export const useData = <T>(url: string | null) => {
  const [data, setData] = useState<T[] | null>(null);

  useEffect(() => {
    if (url !== null && url !== "null") {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
};

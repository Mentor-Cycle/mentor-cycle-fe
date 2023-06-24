import React from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

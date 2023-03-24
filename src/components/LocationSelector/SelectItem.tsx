import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { forwardRef } from "react";
import { BsCheck } from "react-icons/bs";

// eslint-disable-next-line react/display-name
export const SelectItem = forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          "text-[13px] leading-none text-gray-04 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-primary-03 data-[highlighted]:text-neutral-01 hover:cursor-pointer",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <BsCheck />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

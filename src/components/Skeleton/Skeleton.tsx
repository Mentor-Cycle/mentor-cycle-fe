import React from "react";
import { cn } from "../../utils/cn";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md  bg-gray-02/20", className)}
      {...props}
    />
  );
};

export default Skeleton;

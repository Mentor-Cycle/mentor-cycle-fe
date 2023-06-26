import React, { HTMLAttributes } from "react";

interface MultipleInputsContainerProps extends HTMLAttributes<HTMLDivElement> {
  grow?: number;
  children: React.ReactNode;
}

export function MultipleInputsContainer(props: MultipleInputsContainerProps) {
  const _cn = props.className ? ` ${props.className}` : "";

  return (
    <div className={"flex flex-col sm:flex-row gap-2" + _cn}>
      {props.children}
    </div>
  );
}

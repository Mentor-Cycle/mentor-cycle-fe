import React from "react";

interface ICenteredContainer extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function CenteredContainer({
  children,
  className = "",
  ...rest
}: ICenteredContainer) {
  return (
    <div className={"max-w-7xl w-full mx-auto" + " " + className} {...rest}>
      {children}
    </div>
  );
}

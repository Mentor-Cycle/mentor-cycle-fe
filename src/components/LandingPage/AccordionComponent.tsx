import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  children: React.ReactNode;
};

const AccordionWrapper: React.FC<AccordionProps> = ({
  type = "single",
  collapsible = true,
  children,
}) => {
  return (
    <Accordion.Root
      type={type}
      collapsible={collapsible}
      className="w-full space-y-4"
    >
      {children}
    </Accordion.Root>
  );
};

type AccordionItemProps = {
  value: string;
  expandedText: string;
  children: React.ReactNode;
};

const AccordionItemWrapper: React.FC<AccordionItemProps> = ({
  value,
  expandedText,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((value) => !value);

  return (
    <Accordion.Item
      value={value}
      className={`mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b  border-2 border-gray-02 rounded-lg
        }`}
    >
      <Accordion.Trigger
        onClick={handleToggle}
        className="text-neutral-01 hover:opacity-80 hover:cursor-pointer hover:bg-secondary-01 group flex flex-1 items-center justify-between text-sm sm:text-2xl font-semibold leading-none outline-none w-full h-[80px] px-2 sm:px-8 relative transition-transform"
      >
        {expandedText}
        <ChevronDownIcon
          width={22}
          height={22}
          className={`text-neutral-01 transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 transition-transform`}
          aria-hidden
        />
      </Accordion.Trigger>
      <Accordion.Content className="text-neutral-01 bg-secondary-03 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
        <div className="py-[15px] px-5">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export { AccordionWrapper, AccordionItemWrapper };

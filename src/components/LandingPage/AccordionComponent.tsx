import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";

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
  const [expanded, setExpanded] = React.useState(false);

  const handleToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <Accordion.Item
      value={value}
      className={`mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b  border rounded-lg
        }`}
    >
      <Accordion.Trigger
        className="text-secondary-01 dark:text-neutral-01 hover:opacity-80 hover:cursor-pointer dark:hover:bg-secondary-01 group flex flex-1 items-center justify-between text-2xl font-semibold leading-none outline-none w-full h-[80px] px-8 relative transition-transform"
        onClick={handleToggle}
      >
        {expandedText}
        <ChevronDownIcon
          width={22}
          height={22}
          className={`dark:text-neutral-01 transform ${
            expanded ? "rotate-180" : "rotate-0"
          } absolute top-1/2 right-8 -translate-y-1/2 text-secondary-03 transition-transform`}
          aria-hidden
        />
      </Accordion.Trigger>
      {expanded && (
        <Accordion.Content className="text-secondary-05 dark:text-neutral-01 bg-neutral-03 dark:bg-secondary-03 overflow-hidden text-[15px] max-w-[100ch] text-start">
          <div className="py-[15px] px-5">{children}</div>
        </Accordion.Content>
      )}
    </Accordion.Item>
  );
};

export { AccordionWrapper, AccordionItemWrapper };

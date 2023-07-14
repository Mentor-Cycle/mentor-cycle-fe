import React from "react";
import { ModalTextAllOptionsSelected } from "./ModalTextAllOptionsSelected";
import { ModalOption } from "./ModalOption";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";

interface SelectModalContentProps {
  showingOptions: string[] | null;
  textAllOptionsSelected?: string;
  handleChooseOption: (option: string) => () => void;
}

export default function SelectModalContent(props: SelectModalContentProps) {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  const loadedOptions = props.showingOptions;
  const userSelectAllOptions = props.showingOptions?.length === 0;

  if (!loadedOptions) {
    return (
      <ModalTextAllOptionsSelected
        className="pr-2 pl-4 italic text-sm"
        style={{ color: isLightTheme ? "var(--gray-03)" : "var(--neutral-01)" }}
      >
        Carregando...
      </ModalTextAllOptionsSelected>
    );
  }

  if (userSelectAllOptions) {
    return (
      <ModalTextAllOptionsSelected
        className="pr-2 pl-4 italic text-sm"
        style={{ color: isLightTheme ? "var(--gray-03)" : "var(--neutral-01)" }}
      >
        {props.textAllOptionsSelected ?? "Todas opções foram selecionadas."}
      </ModalTextAllOptionsSelected>
    );
  }

  return (
    <>
      {loadedOptions.map((option) => (
        <ModalOption
          key={option}
          onClick={props.handleChooseOption(option)}
          className={twMerge(
            "py-2 px-4 rounded-lg text-secondary-05",
            "hover:bg-primary-01 hover:text-neutral-03",
            "dark:text-neutral-03"
          )}
        >
          <span className="select-none">{option}</span>
        </ModalOption>
      ))}
    </>
  );
}

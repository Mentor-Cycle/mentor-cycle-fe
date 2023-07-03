import React from "react";
import { ModalTextAllOptionsSelected } from "./ModalTextAllOptionsSelected";
import { ModalOption } from "./ModalOption";

interface SelectModalContentProps {
  showingOptions: string[] | null;
  textAllOptionsSelected?: string;
  handleChooseOption: (option: string) => () => void;
}

export default function SelectModalContent(props: SelectModalContentProps) {
  const loadedOptions = props.showingOptions;
  const userSelectAllOptions = props.showingOptions?.length === 0;

  if (!loadedOptions) {
    return (
      <ModalTextAllOptionsSelected
        className="pr-2 pl-4 italic text-sm"
        style={{ color: "#CECECE" }} // gray-01
      >
        Carregando...
      </ModalTextAllOptionsSelected>
    );
  }

  if (userSelectAllOptions) {
    return (
      <ModalTextAllOptionsSelected
        className="pr-2 pl-4 italic text-sm"
        style={{ color: "#CECECE" }} // gray-01
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
          className="py-2 px-4 hover:bg-secondary-02 rounded-lg"
        >
          <span className="select-none">{option}</span>
        </ModalOption>
      ))}
    </>
  );
}

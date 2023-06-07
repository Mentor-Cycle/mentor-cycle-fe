import React, { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { XIcon as IconX } from "../icons/XIcon";
import { TrashIcon as IconTrash } from "../icons/TrashIcon";
import { ModalSelectOptions } from "@components/Select/ModalSelectOptions";
import { ModalTextAllOptionsSelected } from "@components/Select/ModalTextAllOptionsSelected";
import { ModalOption } from "@components/Select/ModalOption";
import { ButtonClearAllOptions } from "@components/Select/ButtonClearAllOptions";
import { SelectedOption } from "@components/Select/SelectedOption";
import { ButtonRemoveSelectedOption } from "@components/Select/ButtonRemoveSelectedOption";
import { SelectInput } from "@components/Select/SelectInput";
import clsx from "clsx";
import { TextPlaceholderSelect } from "@components/Select/TextPlaceholderSelect";

interface ISelect extends HTMLAttributes<HTMLDivElement> {
  options: string[];
  state: [string[], Dispatch<SetStateAction<string[]>>];
  textAllOptionsSelected?: string | undefined;
  clearAllOptionButton?: boolean | undefined;
}

export const Select = React.forwardRef<HTMLDivElement, ISelect>(
  function SelectComponent(
    {
      options,
      state: stateTuple,
      textAllOptionsSelected,
      clearAllOptionButton,
      className,
      ...rest
    },
    ref
  ) {
    const [state, setState] = stateTuple;
    const [isShowingOptionsModal, setIsShowingOptionsModal] =
      React.useState(false);
    const SelectRef = React.useRef<HTMLDivElement>(null);
    const showingOptions = options.filter((opt) => !state.includes(opt));

    const handleClickSelect = () =>
      setIsShowingOptionsModal((isOpen) => !isOpen);

    const handleChooseOption = (option: string) => () => {
      state.includes(option)
        ? setState((prev) => prev.filter((tag) => tag !== option))
        : setState((prev) => [...prev, option]);
    };

    const handleRemoveTag = (tag: string) => () => {
      setState((prev) => prev.filter((option) => option !== tag));
      setIsShowingOptionsModal((isOpen) => !isOpen);
    };

    const handleClearAllOptions = () => {
      setState([]);
      if (!isShowingOptionsModal) setIsShowingOptionsModal((isOpen) => !isOpen);
    };

    useClickOutside(SelectRef, () => setIsShowingOptionsModal(false));

    return (
      <div className="relative font-normal" ref={SelectRef} tabIndex={0}>
        <SelectInput
          className={clsx(
            "my-2 py-4 px-6 border border-neutral-01 bg-secondary-03",
            className
          )}
          onClick={handleClickSelect}
          ref={ref}
          {...rest}
        >
          {state.length ? (
            state.map((selectedOption) => (
              <SelectedOption
                key={selectedOption}
                className="py-1 px-4 bg-secondary-01"
              >
                <span className="select-none">{selectedOption}</span>
                <ButtonRemoveSelectedOption
                  onClick={handleRemoveTag(selectedOption)}
                  className="hover:bg-primary-02"
                >
                  <IconX size={12} className="text-neutral-01" />
                </ButtonRemoveSelectedOption>
              </SelectedOption>
            ))
          ) : (
            <TextPlaceholderSelect className="py-1">
              Selecione uma especialização
            </TextPlaceholderSelect>
          )}
          <ButtonClearAllOptions
            onClick={handleClearAllOptions}
            className="hover:bg-primary-02"
          >
            <IconTrash size={18} className="text-neutral-01" />
          </ButtonClearAllOptions>
        </SelectInput>
        {isShowingOptionsModal ? (
          <ModalSelectOptions className="p-4 bg-secondary-01">
            {showingOptions.length === 0 ? (
              <ModalTextAllOptionsSelected className="px-2 text-neutral-01">
                {textAllOptionsSelected ?? "Todas opções foram selecionadas."}
              </ModalTextAllOptionsSelected>
            ) : (
              showingOptions.map((option) => (
                <ModalOption
                  key={option}
                  onClick={handleChooseOption(option)}
                  className="py-2 px-4 hover:bg-primary-02 rounded-lg"
                >
                  <span className="select-none">{option}</span>
                </ModalOption>
              ))
            )}
          </ModalSelectOptions>
        ) : null}
      </div>
    );
  }
);

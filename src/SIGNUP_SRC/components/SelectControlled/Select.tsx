import React, { HTMLAttributes } from "react";
import { useClickOutside } from "./hooks/useClickOutside";
import { IconX } from "./icons/IconX";
import { IconTrash } from "./icons/IconTrash";
import { ModalSelectOptions } from "./ModalSelectOptions";
import { ModalTextAllOptionsSelected } from "./ModalTextAllOptionsSelected";
import { ModalOption } from "./ModalOption";
import { ButtonClearAllOptions } from "./ButtonClearAllOptions";
import { SelectedOption } from "./SelectedOption";
import { ButtonRemoveSelectedOption } from "./ButtonRemoveSelectedOption";
import { SelectInput } from "./SelectInput";
import { TextPlaceholderSelect } from "./TextPlaceholderSelect";
import { ControllerRenderProps } from "react-hook-form";

interface ISelect
  extends Omit<HTMLAttributes<HTMLDivElement>, "onBlur" | "onChange" | "ref">,
    ControllerRenderProps {
  options?: string[] | null;
  textAllOptionsSelected?: string;
  clearAllOptionButton?: boolean;
  value: string[];
}

export const Select = React.forwardRef<HTMLDivElement, ISelect>(function SelectComponent(
  {
    options,
    textAllOptionsSelected,
    clearAllOptionButton,
    name,
    ref: fieldRef,
    onBlur,
    onChange,
    value,
    className,
    ...rest
  },
  ref
) {
  const _cn = className ? ` ${className}` : "";

  const [isShowingOptionsModal, setIsShowingOptionsModal] = React.useState(false);
  const SelectRef = React.useRef<HTMLDivElement>(null);
  const showingOptions = options?.filter((opt) => !value.includes(opt)) ?? null;
  const hasSelectedAll = showingOptions?.length === 0;

  const handleClickSelect = () => {
    if (!hasSelectedAll) setIsShowingOptionsModal((isOpen) => !isOpen);
  };

  const handleChooseOption = (option: string) => () => {
    value.includes(option)
      ? onChange(value.filter((tag) => tag !== option))
      : onChange([...value, option]);
  };

  const handleRemoveTag = (tag: string) => () => {
    onChange(value.filter((option) => option !== tag));
    setIsShowingOptionsModal((isOpen) => !isOpen);
  };

  const handleClearAllOptions = () => {
    onChange([]);
    if (!isShowingOptionsModal) setIsShowingOptionsModal((isOpen) => !isOpen);
  };

  useClickOutside(SelectRef, () => setIsShowingOptionsModal(false));

  return (
    <div
      className="relative font-normal text-neutral-02 focus:outline-red-500 my-1"
      ref={SelectRef}
    >
      <input type="hidden" ref={fieldRef} />
      <SelectInput
        className={
          "px-3 py-[11px] min-h-[3.125rem] bg-secondary-04 border border-gray-05" + _cn
        }
        onClick={handleClickSelect}
        ref={ref}
        {...rest}
      >
        {value.length ? (
          value.map((selectedOption) => (
            <SelectedOption
              key={selectedOption}
              className="py-[5px] px-4 bg-secondary-02 text-xs"
            >
              <span className="select-none">{selectedOption}</span>
              <ButtonRemoveSelectedOption
                onClick={handleRemoveTag(selectedOption)}
                className="hover:bg-gray-05"
              >
                <IconX size={12} className="text-neutral-02" />
              </ButtonRemoveSelectedOption>
            </SelectedOption>
          ))
        ) : (
          <TextPlaceholderSelect className="text-neutral-400 leading-none">
            Selecione uma especialização
          </TextPlaceholderSelect>
        )}
        <ButtonClearAllOptions
          onClick={handleClearAllOptions}
          className="hover:bg-secondary-02"
        >
          <IconTrash size={18} className="text-neutral-02" />
        </ButtonClearAllOptions>
      </SelectInput>
      {isShowingOptionsModal ? (
        <ModalSelectOptions className="p-4 bg-secondary-04 border border-gray-05 border-t-0 z-10">
          {!showingOptions ? (
            <ModalTextAllOptionsSelected
              className="pr-2 pl-4 italic text-sm"
              style={{ color: "#CECECE" }} // gray-01
            >
              Carregando...
            </ModalTextAllOptionsSelected>
          ) : showingOptions.length === 0 ? (
            <ModalTextAllOptionsSelected
              className="pr-2 pl-4 italic text-sm"
              style={{ color: "#CECECE" }} // gray-01
            >
              {textAllOptionsSelected ?? "Todas opções foram selecionadas."}
            </ModalTextAllOptionsSelected>
          ) : (
            showingOptions.map((option) => (
              <ModalOption
                key={option}
                onClick={handleChooseOption(option)}
                className="py-2 px-4 hover:bg-secondary-02 rounded-lg"
              >
                <span className="select-none">{option}</span>
              </ModalOption>
            ))
          )}
        </ModalSelectOptions>
      ) : null}
    </div>
  );
});

import React, { HTMLAttributes } from "react";
import { useClickOutside } from "./hooks/useClickOutside";
import { IconX } from "./icons/IconX";
import { IconTrash } from "./icons/IconTrash";
import { ModalSelectOptions } from "./ModalSelectOptions";
import { ButtonClearAllOptions } from "./ButtonClearAllOptions";
import { SelectedOption } from "./SelectedOption";
import { ButtonRemoveSelectedOption } from "./ButtonRemoveSelectedOption";
import { SelectInput } from "./SelectInput";
import { TextPlaceholderSelect } from "./TextPlaceholderSelect";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "SIGNUP_SRC/components/Input";
import { OverrideConflict } from "types/overrideConflictTypes";
import SelectModalContent from "SIGNUP_SRC/components/SelectControlled/SelectModalContent";
import { twMerge } from "tailwind-merge";
import { stSignBase, stSignGround } from "styles/input-sign";
import { useTheme } from "next-themes";

interface ISelect
  extends OverrideConflict<HTMLAttributes<HTMLDivElement>, ControllerRenderProps> {
  options?: string[] | null;
  textAllOptionsSelected?: string;
  clearAllOptionButton?: boolean;
  value: string[];
  isLoading?: boolean;
}

export const Select = React.forwardRef<HTMLDivElement, ISelect>(function SelectComponent(
  {
    isLoading,
    options,
    textAllOptionsSelected,
    clearAllOptionButton,
    name,
    ref: fieldRef,
    onBlur,
    onChange,
    value,
    tabIndex = 20,
    ...rest
  },
  ref
) {
  const [isShowingOptionsModal, setIsShowingOptionsModal] = React.useState(false);
  const SelectRef = React.useRef<HTMLDivElement>(null);
  const showingOptions = options?.filter((opt) => !value.includes(opt)) ?? null;
  const hasSelectedAll = showingOptions?.length === 0;

  const { theme } = useTheme();
  const isLightMode = theme === "light";

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

  if (isLoading) {
    return <Input.Skeleton />;
  }

  return (
    <div
      className="relative font-normal text-secondary-03 focus:outline-red-500"
      onBlur={onBlur}
      ref={SelectRef}
    >
      <input type="hidden" ref={fieldRef} />
      <SelectInput
        className={twMerge("", rest.className)}
        onClick={handleClickSelect}
        ref={ref}
        tabIndex={tabIndex}
        {...rest}
      >
        {value.length ? (
          value.map((selectedOption) => (
            <SelectedOption
              key={selectedOption}
              className="py-[5px] px-4 bg-gray-01 text-xs"
            >
              <span className="select-none">{selectedOption}</span>
              <ButtonRemoveSelectedOption
                onClick={handleRemoveTag(selectedOption)}
                className="hover:bg-gray-02"
              >
                <IconX size={12} className="text-secondary-03" />
              </ButtonRemoveSelectedOption>
            </SelectedOption>
          ))
        ) : (
          <TextPlaceholderSelect
            className="leading-none"
            style={{
              color: isLightMode ? "#7C7C7C" : "#7C7C7C", // gray-03
            }}
          >
            Selecione uma especialização
          </TextPlaceholderSelect>
        )}
        <ButtonClearAllOptions
          onClick={handleClearAllOptions}
          className="hover:bg-gray-01"
          tabIndex={tabIndex + 1}
        >
          <IconTrash size={18} className="text-secondary-03" />
        </ButtonClearAllOptions>
      </SelectInput>
      {isShowingOptionsModal ? (
        <ModalSelectOptions className="p-4 bg-neutral-05 border border-gray-02 border-t-0 z-10">
          <div className="max-h-[11rem] overflow-y-auto flex flex-col">
            <SelectModalContent
              handleChooseOption={handleChooseOption}
              showingOptions={showingOptions}
              textAllOptionsSelected={textAllOptionsSelected}
            />
          </div>
        </ModalSelectOptions>
      ) : null}
    </div>
  );
});

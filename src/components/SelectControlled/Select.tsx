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
import { Input } from "@components/InputForm";
import { OverrideConflict } from "types/overrideConflictTypes";
import SelectModalContent from "@components/SelectControlled/SelectModalContent";
import { twMerge } from "tailwind-merge";
import { stSignBase, stSignGround, stSignInput } from "styles/input-sign";
import { useTheme } from "next-themes";
import st from "./Select.module.css";

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
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

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

  if (isLoading) {
    return <Input.Skeleton />;
  }

  return (
    <div
      className={twMerge("relative font-normal", st.wrapper)}
      onBlur={onBlur}
      ref={SelectRef}
    >
      <input type="hidden" ref={fieldRef} />
      <SelectInput
        {...rest}
        className={twMerge(
          stSignInput,
          isLightTheme ? st.container : st.dark_container,
          "pr-16",
          rest.className
        )}
        onClick={handleClickSelect}
        ref={ref}
        tabIndex={tabIndex}
      >
        {value.length ? (
          value.map((selectedOption) => (
            <SelectedOption
              key={selectedOption}
              className="py-[5px] px-4 bg-gray-01 dark:bg-gray-04 text-xs"
            >
              <span className="select-none">{selectedOption}</span>
              <ButtonRemoveSelectedOption
                onClick={handleRemoveTag(selectedOption)}
                className="hover:bg-gray-02"
              >
                <IconX size={12} className="text-gray-05 dark:text-neutral-01" />
              </ButtonRemoveSelectedOption>
            </SelectedOption>
          ))
        ) : (
          <TextPlaceholderSelect
            className="leading-none"
            style={{ color: "var(--gray-03)" }}
          >
            Selecione uma especialização
          </TextPlaceholderSelect>
        )}
        <ButtonClearAllOptions
          onClick={handleClearAllOptions}
          className="hover:bg-gray-01 dark:hover:bg-gray-04"
          tabIndex={tabIndex + 1}
        >
          <IconTrash size={18} className="text-secondary-05 dark:text-neutral-01" />
        </ButtonClearAllOptions>
      </SelectInput>
      {isShowingOptionsModal ? (
        <ModalSelectOptions
          className={twMerge(
            "p-4 bg-neutral-03 border border-gray-03 border-t-0 z-10",
            "dark:bg-secondary-03",
            isLightTheme ? st.container : st.dark_container
          )}
        >
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

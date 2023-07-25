import React from "react";
import { twMerge } from "tailwind-merge";
import { TextToggle } from "@components/Form/TextToggle";
import { RootProps } from "@components/Form/TextToggle/Root";

interface ChooseMentorSwitchProps extends RootProps {}

/**
 * ESSE COMPONENTE VAI SER REFATORADO EM UMA FUTURA PR
 * ESSE COMPONENTE VAI SER REFATORADO EM UMA FUTURA PR
 * ESSE COMPONENTE VAI SER REFATORADO EM UMA FUTURA PR
 */

export const ChooseMentorSwitch = React.forwardRef<
  HTMLDivElement,
  ChooseMentorSwitchProps
>(function ChooseMentorSwitchComponent({ ...props }, ref) {
  return (
    <TextToggle.Root {...props} className={twMerge("", props.className)} ref={ref}>
      <TextToggle.Label
        className={twMerge(
          "bg-back-ground text-fore-subtle border border-ring-base whitespace-nowrap"
          // "dark:bg-gray-03 dark:text-gray-01 dark:border-gray-03"
        )}
        text="Deseja participar como"
      />
      <TextToggle.OptionsContainer
        className={twMerge(
          "bg-back-ground border border-ring-base flex-col xs:flex-row rounded-xl xs:rounded-full"
          // "dark:border-gray-02 dark:text-secondary-01"
        )}
        optionsColor="var(--fore-accent)"
        optionsHoverBackgroundColor="var(--back-shadow)"
        optionSelected="var(--middle-ground)"
      >
        <TextToggle.Option
          // @ts-expect-error
          {...field}
          name="mentor"
          option="Mentor"
          // @ts-expect-error
          onClick={handleIsMentorToggle(field.onChange)}
          // @ts-expect-error
          optionSelected={isMentorDatatype}
          className="xs:rounded-full rounded-[10px]"
        />
        <TextToggle.Option
          // @ts-expect-error
          {...field}
          name="mentorado"
          option="Mentorado"
          // @ts-expect-error
          onClick={handleIsMentorToggle(field.onChange)}
          // @ts-expect-error
          optionSelected={isMentorDatatype}
          className="xs:rounded-full rounded-[10px]"
        />
      </TextToggle.OptionsContainer>
    </TextToggle.Root>
  );
});

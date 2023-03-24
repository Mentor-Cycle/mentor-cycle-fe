import * as Select from "@radix-ui/react-select";
import { ReactNode } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { StateProps, StatePropsConect } from "./SelectLocation.types";
import { useData } from "services/fetch";
import { SelectItem } from "./SelectItem";
import { Label } from "@radix-ui/react-label";

const SelectState = ({
  handleSelectedState,
  selectedCountry,
}: StatePropsConect) => {
  const url = selectedCountry
    ? "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    : null;

  const states: StateProps[] | null = useData(url);

  const isDisabled = Boolean(selectedCountry === "Brasil");

  const listStates = states?.map(({ nome, sigla }) => (
    <SelectItem key={nome} value={sigla}>
      {nome}
    </SelectItem>
  ));

  const renderStates = (): ReactNode => {
    return !states ? (
      <SelectItem value="loading">Carregando...</SelectItem>
    ) : selectedCountry === "Brasil" ? (
      listStates
    ) : null;
  };
  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="state" className="text-base text-secondary-04 font-bold">
        Estado
      </Label>
      <Select.Root
        disabled={!isDisabled}
        onValueChange={(value) => handleSelectedState(value)}
        name="state"
      >
        <Select.Trigger
          id="state"
          name="state"
          className="flex w-full h-full px-6 py-4 my-2 border border-gray-03 items-center justify-between rounded-lg leading-none  bg-neutral-03 text-gray-04 hover:bg-neutral-01 focus:shadow-[0_0_0_2px] focus:shadow-gray-03 data-[placeholder]:text-gray-03 outline-none disabled:opacity-40 disabled:cursor-not-allowed data-[placeholder]:text-base"
          aria-label="states"
        >
          <Select.Value placeholder="Estado - XX" />
          <Select.Icon className="text-violet11">
            <HiChevronDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-neutral-01 rounded-md shadow-2xl">
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-neutral-03 text-gray-03 cursor-default">
              <HiChevronUp />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <Select.Label className="px-[25px] text-sm leading-[25px] text-secondary-02">
                  Selecione um Estado
                </Select.Label>
                {renderStates()}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              <HiChevronDown />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SelectState;

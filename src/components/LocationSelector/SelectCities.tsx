import { ReactNode, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { CitiesProps } from "./SelectLocation.types";
import { useData } from "services/fetch";
import { SelectItem } from "./SelectItem";
import { Label } from "@radix-ui/react-label";

const SelectCities = ({ selectedState, selectedCountry }: CitiesProps) => {
  const [selectedCities, setSelectedCities] = useState<string | null>(null);

  const cities: CitiesProps[] | null = useData(
    !!selectedState
      ? `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
      : null
  );

  const listCities = cities
    ? cities.map(({ nome }) => (
        <SelectItem key={nome} value={nome ? nome : ""}>
          {nome}
        </SelectItem>
      ))
    : null;
  const isDisabled = Boolean(!selectedState);

  const renderCities = (): ReactNode => {
    return selectedCountry === "Brasil" && isDisabled ? null : listCities;
  };

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="city" className="text-base text-secondary-04 font-bold">
        Cidade
      </Label>
      <Select.Root
        disabled={isDisabled}
        onValueChange={(value) => setSelectedCities(value)}
        name="city"
      >
        <Select.Trigger
          id="city"
          name="city"
          className="flex w-full h-full disabled:opacity-40 disabled:cursor-not-allowed px-6 py-4 my-2 border border-gray-03 items-center justify-between rounded-lg leading-none  bg-neutral-03 text-gray-04 hover:bg-neutral-01 disabled:hover:bg-neutral-03 focus:shadow-[0_0_0_2px] focus:shadow-gray-03 data-[placeholder]:text-gray-03 outline-none data-[placeholder]:text-base"
          aria-label="cities"
        >
          <Select.Value placeholder="Cidade do Brasil" />
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
                  Selecione uma cidade
                </Select.Label>
                {renderCities()}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-secondary-05 cursor-default">
              <HiChevronDown />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SelectCities;

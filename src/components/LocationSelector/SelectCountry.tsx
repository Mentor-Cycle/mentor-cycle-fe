/* eslint-disable react-hooks/exhaustive-deps */
import * as Select from "@radix-ui/react-select";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Country, CountryProps } from "./SelectLocation.types";
import { useFetch } from "@hooks/useFetch";
import { SelectItem } from "./SelectItem";
import { Label } from "@radix-ui/react-label";
import { ReactNode, useEffect, useState } from "react";

const SelectCountry = ({ handleSelectedCountry }: CountryProps) => {
  const [countries, setCountries] = useState<Country[]>();
  const { getCountries, getCities, getStates } = useFetch();

  useEffect(() => {
    getCountries({ orderBy: "nome" }).then((res) => {
      return setCountries(res);
    });
  }, []);

  const renderCountries = (): ReactNode => {
    return countries ? (
      countries.map(({ nome: name, id: { M49: _id } }: Country) => (
        <SelectItem key={_id} value={name}>
          {name}
        </SelectItem>
      ))
    ) : (
      <SelectItem value="loading">Carregando...</SelectItem>
    );
  };
  return (
    <div className="flex flex-col w-full">
      <Label
        htmlFor="country"
        className="text-base text-secondary-04 font-bold"
      >
        País
        <span title="Obrigatório" className="text-danger-01 mx-1">
          *
        </span>
      </Label>
      <Select.Root
        required
        onValueChange={handleSelectedCountry}
        name="country"
      >
        <Select.Trigger
          id="country"
          name="country"
          className="flex w-full px-6 py-4 my-2 border border-gray-03 items-center justify-between rounded-lg leading-none  bg-neutral-03 text-gray-04 hover:bg-neutral-01 focus:shadow-[0_0_0_2px] focus:shadow-gray-03 data-[placeholder]:text-gray-03 outline-none data-[placeholder]:text-base h-full"
          aria-label="country"
        >
          <Select.Value placeholder="País" />
          <Select.Icon className="text-violet11">
            <HiChevronDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-neutral-01 rounded-md shadow-2xl z-9999">
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-neutral-03 text-gray-03 cursor-default">
              <HiChevronUp />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <Select.Label className="px-[25px] text-sm leading-[25px] text-secondary-02">
                  Selecione um País
                </Select.Label>
                {renderCountries()}
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

export default SelectCountry;

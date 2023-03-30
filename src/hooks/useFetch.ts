import { IBGE_PLACES_API_URL } from "./../config/constants";
import { useEffect, useState } from "react";
import { Country } from "@components/LocationSelector/SelectLocation.types";

export const useFetch = () => {
  type CountryParams = {
    orderBy?: "nome" | "sigla" | "area" | "populacao";
  };

  type CityParams = {
    state: string;
  };

  const GET_PROPS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getCountries = async (params?: CountryParams): Promise<Country[]> => {
    const queryParams = new URLSearchParams();
    if (params?.orderBy) {
      queryParams.append("orderBy", params.orderBy);
    }

    const res = await fetch(
      `${IBGE_PLACES_API_URL}/paises` + queryParams.toString(),
      GET_PROPS
    );
    return res.json() as unknown as Country[];
  };

  const getCities = async (params: CityParams) => {
    const res = await fetch(
      `${IBGE_PLACES_API_URL}/estados/${params.state}/municipios`,
      GET_PROPS
    );
    return res.json();
  };

  const getStates = async () => {
    const res = await fetch(`${IBGE_PLACES_API_URL}/estados`, GET_PROPS);
    return res.json();
  };

  return {
    getCountries,
    getCities,
    getStates,
  };
};

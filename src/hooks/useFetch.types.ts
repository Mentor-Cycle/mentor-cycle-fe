export interface Country {
  value: number;
  label: string;
}

export interface State {
  sigla: string;
  nome: string;
}

export interface City {
  value: number;
  label: string;
}

export interface GetCountriesParams {
  orderBy?: "nome" | "sigla" | "area" | "populacao";
}

export interface GetCitiesParams {
  state: string;
}

export interface IUseFetch {
  getCountries: (params?: GetCountriesParams) => Promise<Country[]>;
  getCities: (state: string) => Promise<City[]>;
  getStates: () => Promise<State[]>;
}

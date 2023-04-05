export interface Country {
  id: number;
  nome: string;
}

export interface State {
  sigla: string;
  nome: string;
}

export interface City {
  id: number;
  nome: string;
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

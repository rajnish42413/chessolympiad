export interface ICountry {
    id: number;
    name: string;
    phonecode: string;
    emoji: string;
  }

  export interface ICState {
    id: number;
    name: string;
    country_id: number;
  }


  export interface ICity {
      id: number;
      name: string;
      state_id: number;
      state_code?: string;
      country_id?: number;
      country_code?: string;
  }
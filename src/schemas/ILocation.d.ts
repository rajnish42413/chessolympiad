export interface IIState {
  id: number;
  state_name: string;
}

export interface ICity {
  id: number;
  city_name: string;
  state_id: number;
}


export interface ILocation {
  city_name?: string;
  district_name?: string;
  state_name?: string;
}
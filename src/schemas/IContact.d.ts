export interface IPlayers {
  status: string;
  keyword?: any;
  data: IContact[];
}

export interface IContact {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  mother_tounge: string;
  relationship: string;
  son_daughter_of: string;
  player_type: string;
  address: string;
  city: string;
  district: string;
  state: string;
  mobile: string;
  gender: string;
  poi: number;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  resource_url: string;
  order_status?: number;
  fide_id?:string;
}

export interface IPlayerDetail {
  player: Player;
  photo?: IPhoto;
  birth_certificate?: Photo;
}

export interface IPhoto {
  id: number;
  entity_id: number;
  entity: string;
  thumb?: any;
  small?: any;
  medium?: any;
  large: string;
  original: string;
  default: number;
  status: number;
  created_at: string;
}

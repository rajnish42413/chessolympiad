export interface IPlayerData {
  status: string;
  keyword?: any;
  data: Datum[];
}

export interface IPlayer {
  id: number;
  first_name: string;
  middle_name?: any;
  last_name: string;
  city: number;
  state: number;
  gender: string;
  order_status?: any;
  membership_expired: boolean;
  membership_expire_at?: any;
  city_name?: string;
  district_name?: string;
  state_name?: string;
}

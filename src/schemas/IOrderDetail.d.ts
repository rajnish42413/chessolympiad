export interface IOrderDetail {
  order: Order;
  status?: Status;
}

interface Status {
    status: string;
  currency: string;
  receipt: string;
  amount: number;
}

interface Order {
  id: number;
  order_id: string;
  contact_id: number;
  amount: string;
  status: number;
  payment_response_id: string;
  payment_at: string;
  channel: string;
  other: Other;
  created_at: string;
  updated_at: string;
  resource_url: string;
  user: User;
}

interface User {
  id: number;
  first_name: string;
  middle_name: string;
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
  poi?: any;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  fide_id: string;
  resource_url: string;
}

interface Other {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id?: any;
  status: string;
  attempts: number;
  notes: any[];
  created_at: number;
}
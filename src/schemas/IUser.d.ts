export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface ILoginUser {
  message: string;
  access_token: string;
  token:string;
  token_type: string;
  user: IUser;
}

export interface ITeamPlayer {
  id: number;
  federation_id: number;
  team_id: number;
  name: string;
  fide_id: string;
  gender: string;
  rating: string;
  rank: string;
  meta?: any;
  created_at?: any;
  updated_at?: any;
  type_id: number;
  resource_url: string;
}

export interface ITeam {
  id: number;
  federation_id: number;
  players_str: string;
  enabled: number;
  created_at: Date;
  updated_at: Date;
  resource_url: string;
  players: Player[];
}

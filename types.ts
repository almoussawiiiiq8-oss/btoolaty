export type Tournament = {
  id: string;
  name: string;
  logo_url: string | null;
  start_date: string | null;
  end_date: string | null;
  time_text: string | null;
  days_text: string | null;
  teams_count: number;
  players_per_team: number;
  registration_open: boolean;
  draw_done: boolean;
  created_at: string;
};

export type Registration = {
  id: string;
  tournament_id: string;
  second_name: string;
  nickname: string;
  phone: string;
  created_at: string;
};

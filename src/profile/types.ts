export interface IEditUserRequest {
  username?: string;
  password?: string;
  email?: string;
}

interface IScore {
  id: number;
  createdAt: string;
  updatedAt: any;
  value: number;
  level: any;
  gameName: string;
  userId: number;
}

interface IWinsCount {
  id: number;
  createdAt: string;
  updatedAt: string;
  value: number;
  level: string;
  gameName: string;
  userId: number;
}

export interface IGameStatistics {
  name: string;
  score: IScore | null;
  winsCount: IWinsCount | null;
}

export interface IStatisticsState {
  gameStatistics: IGameStatistics[];
  isLoading: boolean;
}

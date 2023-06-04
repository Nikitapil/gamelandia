export interface IGameCard {
  id: number;
  gameName: string;
  pictureName: string;
  description: string;
  path: string;
  isOutside: boolean;
  labels: string[];
  mobileSuitable: boolean;
}

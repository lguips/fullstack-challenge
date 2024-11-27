export interface CreateNivelDTO {
  nivel: string;
}

export interface GetNivelDTO {
  id: number;
  nivel: string;
  associatedDevs?: number;
}
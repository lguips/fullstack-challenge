export interface CreateDesenvolvedorDTO {
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date;
  hobby: string;
  idade: number;
}

export interface GetDesenvolvedorDTO {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date;
  idade: number;
  hobby: string;
  nivel: {
    id?: number;
    nivel?: string;
  }
}

export interface UpdateDesenvolvedorDTO {
  nome: string;
  hobby: string;
  nivel_id: number;
  sexo: string;
  data_nascimento: Date;
  idade: number;
}
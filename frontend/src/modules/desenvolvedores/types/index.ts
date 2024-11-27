export interface Desenvolvedor {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel: {
    id: number;
    nivel: string;
  }
}

export interface CreateDesenvolvedorDTO {
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel_id: number;
}

export interface UpdateDesenvolvedorDTO {
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
  nivel_id: number;
}

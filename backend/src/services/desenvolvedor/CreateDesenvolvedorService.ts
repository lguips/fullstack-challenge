import { CreateDesenvolvedorDTO, GetDesenvolvedorDTO } from "../../dtos/desenvolvedor";
import prismaClient from "../../prisma";

class CreateDesenvolvedorService {
  async execute(data: CreateDesenvolvedorDTO): Promise<GetDesenvolvedorDTO> {
    if (!data.nivel_id) {
      throw new Error("nivel_id do desenvolvedor é um campo obrigatório.");
    }

    if (!data.nome) {
      throw new Error("nome do desenvolvedor é um campo obrigatório.");
    }

    if (!data.sexo) {
      throw new Error("sexo do desenvolvedor é um campo obrigatório.");
    }

    if (!data.data_nascimento) {
      throw new Error("data_nascimento do desenvolvedor é um campo obrigatório e deve estar no formato yyyy-mm-dd.");
    }

    if (!data.idade) {
      throw new Error("idade do desenvolvedor é um campo obrigatório.");
    }

    if (!data.hobby) {
      throw new Error("hobby do desenvolvedor é um campo obrigatório.");
    }

    const nivelExists = await prismaClient.nivel.findFirst({
      where: { id: data.nivel_id }
    });

    if (!nivelExists) {
      throw new Error("id de nível não existe, informe um id válido");
    }

    const createdDev = await prismaClient.desenvolvedor.create({
      data: {
        nivel_id: data.nivel_id,
        nome: data.nome,
        sexo: data.sexo,
        data_nascimento: new Date(data.data_nascimento),
        hobby: data.hobby,
        idade: data.idade
      }
    });

    const devNivel = await prismaClient.nivel.findFirst({
      where: { id: data.nivel_id }
    });

    return {
      id: createdDev.id,
      nome: createdDev.nome,
      sexo: createdDev.sexo,
      data_nascimento: createdDev.data_nascimento,
      idade: createdDev.idade,
      hobby: createdDev.hobby,
      nivel: {
        id: devNivel?.id,
        nivel: devNivel?.nivel
      }
    }
  }
}

export { CreateDesenvolvedorService };
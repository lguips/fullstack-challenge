import { GetDesenvolvedorDTO, UpdateDesenvolvedorDTO } from "../../dtos/desenvolvedor";
import prismaClient from "../../prisma";

class UpdateDesenvolvedorService {
  async execute(id: string, data: UpdateDesenvolvedorDTO): Promise<GetDesenvolvedorDTO> {
    const record = await prismaClient.desenvolvedor.findFirst({
      where: { id: +id }
    });

    if (!record) {
      throw new Error("Id de desenvolvedor inexistente.");
    }

    if (data.nome) {
      record.nome = data.nome;
    }

    if (data.nivel_id) {
      const checkIfNivelExists = await prismaClient.nivel.findFirst({
        where: { id : +data.nivel_id }
      });
  
      if (!checkIfNivelExists) {
        throw new Error("nivel_id não existe, informe um nivel_id válido");
      }

      record.nivel_id = +data.nivel_id;
    }

    if (data.nome) {
      record.nome = data.nome;
    }

    if (data.hobby) {
      record.hobby = data.hobby;
    }

    if (data.sexo) {
      record.sexo = data.sexo;
    }

    if (data.idade) {
      record.idade = +data.idade;
    }

    if (data.data_nascimento) {
      record.data_nascimento = data.data_nascimento;
    }

    const updatedRecord = await prismaClient.desenvolvedor.update({
      where: { id: +id },
      data: {
        nome: record.nome,
        hobby: record.hobby,
        nivel_id: record.nivel_id,
        sexo: record.sexo,
        idade: record.idade,
        data_nascimento: new Date(record.data_nascimento)
      }
    });

    const devNivel = await prismaClient.nivel.findFirst({
      where: { id: +data.nivel_id }
    });

    return {
      id: updatedRecord.id,
      nome: updatedRecord.nome,
      sexo: updatedRecord.sexo,
      data_nascimento: updatedRecord.data_nascimento,
      idade: updatedRecord.idade,
      hobby: updatedRecord.hobby,
      nivel: {
        id: devNivel?.id,
        nivel: devNivel?.nivel
      }
    }
  }
}

export { UpdateDesenvolvedorService };
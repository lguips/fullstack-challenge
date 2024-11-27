import { GetDesenvolvedorDTO } from "../../dtos/desenvolvedor";
import prismaClient from "../../prisma";

class GetDesenvolvedorByIdService {
  async execute(id: string): Promise<GetDesenvolvedorDTO> {
    const record = await prismaClient.desenvolvedor.findFirst({
      where: { id: +id },
      include: {
        nivel: true,
      },
    });

    if (!record) {
      throw new Error("Id de desenvolvedor inexistente.");
    }

    return {
      id: record.id,
      nome: record.nome,
      sexo: record.sexo,
      data_nascimento: record.data_nascimento,
      idade: record.idade,
      hobby: record.hobby,
      nivel: {
        id: record.nivel_id,
        nivel: record.nivel.nivel
      }
    }
  }
}

export { GetDesenvolvedorByIdService };
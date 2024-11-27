import { GetNivelDTO } from "../../dtos/nivel";
import prismaClient from "../../prisma";

class UpdateNivelService {
  async execute(id: string, nivel: string): Promise<GetNivelDTO> {
    if (!nivel) {
      throw new Error("Nível é obrigatório");
    }

    const record = await prismaClient.nivel.findFirst({
      where: { id: +id }
    });

    if (!record) {
      throw new Error("Id de nível inexistente.");
    }

    const updatedRecord = await prismaClient.nivel.update({
      where: { id: +id },
      data: {
        nivel
      },
    });

    return {
      id: updatedRecord.id,
      nivel: updatedRecord.nivel
    }
  }
}

export { UpdateNivelService };
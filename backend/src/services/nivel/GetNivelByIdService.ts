import { GetNivelDTO } from "../../dtos/nivel";
import prismaClient from "../../prisma";

class GetNivelByIdService {
  async execute(id: string): Promise<GetNivelDTO> {
    const record = await prismaClient.nivel.findFirst({
      where: { id: +id }
    });

    if (!record) {
      throw new Error("Id de nível inexistente.");
    }

    return {
      id: record.id,
      nivel: record.nivel
    }
  }
}

export { GetNivelByIdService };
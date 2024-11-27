import { CreateNivelDTO, GetNivelDTO } from "../../dtos/nivel";
import prismaClient from "../../prisma";

class CreateNivelService {
  async execute({ nivel }: CreateNivelDTO): Promise<GetNivelDTO> {
    if (!nivel) {
      throw new Error("Nivel é um campo obrigatório.");
    }

    const createdNivel = await prismaClient.nivel.create({
      data: { nivel }
    });

    return {
      id: createdNivel.id,
      nivel: createdNivel.nivel
    }
  }
}

export { CreateNivelService };
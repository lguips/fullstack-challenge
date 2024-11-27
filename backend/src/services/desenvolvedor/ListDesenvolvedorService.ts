import { GetDesenvolvedorDTO } from "../../dtos/desenvolvedor";
import prismaClient from "../../prisma";

class ListDesenvolvedorService {
  async execute(): Promise<GetDesenvolvedorDTO[]> {
    const list = await prismaClient.desenvolvedor.findMany({
      include: {
        nivel: true,
      },
      orderBy: [
        {
          nome: 'asc',
        }
      ]
    });

    return list.map(dev => {
      return {
        id: dev.id,
        nome: dev.nome,
        sexo: dev.sexo,
        data_nascimento: dev.data_nascimento,
        idade: dev.idade,
        hobby: dev.hobby,
        nivel: {
          id: dev.nivel_id,
          nivel: dev.nivel.nivel
        }
      }
    });
  }
}

export { ListDesenvolvedorService };
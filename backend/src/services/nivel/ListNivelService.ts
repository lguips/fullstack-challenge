import { GetNivelDTO } from "../../dtos/nivel";
import prismaClient from "../../prisma";

class ListNivelService {
  async execute(): Promise<GetNivelDTO[]> {
    const list = await prismaClient.nivel.findMany({
      include: {
        desenvolvedores: true
      },
      orderBy: [
        {
          nivel: 'asc',
        }
      ]
    });
    
    return list.map(nivel => {
      return {
        id: nivel.id,
        nivel: nivel.nivel,
        associatedDevs: nivel.desenvolvedores.length
      }
    });
  }
}

export { ListNivelService };
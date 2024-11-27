import { Prisma } from "@prisma/client";
import prismaClient from "../../prisma";

class DeleteNivelService {
  async execute(id: string) {
    const record = await prismaClient.nivel.findFirst({
      where: { id: +id }
    });

    if (!record) {
      throw new Error("Id de nível inexistente.");
    }

    try {
      const deletedRecord = await prismaClient.nivel.delete({
        where: {
          id: +id
        }
      });
      return deletedRecord;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new Error('O nível não pode ser excluído porque há desenvolvedores dependentes');
        }
      }
    }
  }
}

export { DeleteNivelService };
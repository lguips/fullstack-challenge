import prismaClient from "../../prisma";

class DeleteDesenvolvedorService {
  async execute(id: string) {
    const record = await prismaClient.desenvolvedor.findFirst({
      where: { id: +id }
    });

    if (!record) {
      throw new Error("Id de desenvolvedor inexistente.");
    }

    const deletedRecord = await prismaClient.desenvolvedor.delete({
      where: {
        id: +id
      }
    });
    return deletedRecord;
  }
}

export { DeleteDesenvolvedorService };
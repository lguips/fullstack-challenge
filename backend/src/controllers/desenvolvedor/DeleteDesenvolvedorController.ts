import { Request, Response } from 'express';
import { DeleteDesenvolvedorService } from '../../services/desenvolvedor/DeleteDesenvolvedorService';

class DeleteDesenvolvedorController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const deleteDesenvolvedorService = new DeleteDesenvolvedorService();
    const deletedRecord = await deleteDesenvolvedorService.execute(id);
    return res.status(204).json(deletedRecord);
  }
}

export { DeleteDesenvolvedorController };
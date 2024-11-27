import { Request, Response } from 'express';
import { DeleteNivelService } from '../../services/nivel/DeleteNivelService';

class DeleteNivelController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const deleteNivelService = new DeleteNivelService();
    const deletedRecord = await deleteNivelService.execute(id);
    return res.status(204).json(deletedRecord);
  }
}

export { DeleteNivelController };
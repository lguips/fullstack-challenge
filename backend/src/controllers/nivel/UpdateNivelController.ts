import { Request, Response } from 'express';
import { UpdateNivelService } from '../../services/nivel/UpdateNivelService';
import { GetNivelDTO } from '../../dtos/nivel';

class UpdateNivelController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const nivel = req.body.nivel;
    const updateNivelService = new UpdateNivelService();
    const updatedRecord: GetNivelDTO = await updateNivelService.execute(id, nivel);
    return res.json(updatedRecord);
  }
}

export { UpdateNivelController };
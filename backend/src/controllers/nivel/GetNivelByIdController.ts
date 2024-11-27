import { Request, Response } from 'express';
import { GetNivelByIdService } from '../../services/nivel/GetNivelByIdService';
import { GetNivelDTO } from '../../dtos/nivel';

class GetNivelByIdController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const getNivelByIdService = new GetNivelByIdService();
    const record: GetNivelDTO = await getNivelByIdService.execute(id);
    return res.json(record);
  }
}

export { GetNivelByIdController };
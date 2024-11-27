import { Request, Response } from 'express';
import { ListNivelService } from '../../services/nivel/ListNivelService';
import { GetNivelDTO } from '../../dtos/nivel';

class ListNivelController {
  async handle(req: Request, res: Response) {
    const listNivelService = new ListNivelService();
    const list: GetNivelDTO[] = await listNivelService.execute();
    return res.json(list);
  }
}

export { ListNivelController };
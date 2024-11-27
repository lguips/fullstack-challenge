import { Request, Response } from 'express';
import { ListDesenvolvedorService } from '../../services/desenvolvedor/ListDesenvolvedorService';
import { GetDesenvolvedorDTO } from '../../dtos/desenvolvedor';

class ListDesenvolvedorController {
  async handle(req: Request, res: Response) {
    const listDesenvolvedorService = new ListDesenvolvedorService();
    const list: GetDesenvolvedorDTO[] = await listDesenvolvedorService.execute();
    return res.json(list);
  }
}

export { ListDesenvolvedorController };
import { Request, Response } from 'express';
import { CreateDesenvolvedorService } from '../../services/desenvolvedor/CreateDesenvolvedorService';
import { GetDesenvolvedorDTO } from '../../dtos/desenvolvedor';

class CreateDesenvolvedorController {
  async handle(req: Request, res: Response) {
    const createDesenvolvedorService = new CreateDesenvolvedorService();
    const desenvolvedor: GetDesenvolvedorDTO = await createDesenvolvedorService.execute(req.body);
    return res.status(201).json(desenvolvedor);
  }
}

export { CreateDesenvolvedorController };
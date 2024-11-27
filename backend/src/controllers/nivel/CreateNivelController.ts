import { Request, Response } from 'express';
import { CreateNivelService } from '../../services/nivel/CreateNivelService';
import { GetNivelDTO } from '../../dtos/nivel';

class CreateNivelController {
  async handle(req: Request, res: Response) {
    const createNivelService = new CreateNivelService();
    const nivel: GetNivelDTO = await createNivelService.execute({
      nivel: req.body.nivel
    });
    return res.status(201).json(nivel);
  }
}

export { CreateNivelController };
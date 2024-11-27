import { Request, Response } from 'express';
import { GetDesenvolvedorByIdService } from '../../services/desenvolvedor/GetDesenvolvedorByIdService';
import { GetDesenvolvedorDTO } from '../../dtos/desenvolvedor';

class GetDesenvolvedorByIdController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const getDesenvolvedorByIdService = new GetDesenvolvedorByIdService();
    const result: GetDesenvolvedorDTO = await getDesenvolvedorByIdService.execute(id);
    return res.json(result);
  }
}

export { GetDesenvolvedorByIdController };
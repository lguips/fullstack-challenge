import { Request, Response } from 'express';
import { UpdateDesenvolvedorService } from '../../services/desenvolvedor/UpateDesenvolvedorService';
import { GetDesenvolvedorDTO } from '../../dtos/desenvolvedor';

class UpdateDesenvolvedorController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const desenvolvedor = req.body;
    const updateDesenvolvedorService = new UpdateDesenvolvedorService();
    const updatedData: GetDesenvolvedorDTO = await updateDesenvolvedorService.execute(id, desenvolvedor);
    return res.json(updatedData);
  }
}

export { UpdateDesenvolvedorController };
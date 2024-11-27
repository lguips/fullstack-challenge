import { Router } from 'express';
import { CreateNivelController } from './controllers/nivel/CreateNivelController';
import { ListNivelController } from './controllers/nivel/ListNivelController';
import { DeleteNivelController } from './controllers/nivel/DeleteNivelController';
import { UpdateNivelController } from './controllers/nivel/UpdateNivelController';
import { CreateDesenvolvedorController } from './controllers/desenvolvedor/CreateDesenvolvedorController';
import { ListDesenvolvedorController } from './controllers/desenvolvedor/ListDesenvolvedorController';
import { DeleteDesenvolvedorController } from './controllers/desenvolvedor/DeleteDesenvolvedorController';
import { UpdateDesenvolvedorController } from './controllers/desenvolvedor/UpdateDesenvolvedorController';
import { GetNivelByIdController } from './controllers/nivel/GetNivelByIdController';
import { GetDesenvolvedorByIdController } from './controllers/desenvolvedor/GetDesenvolvedorByIdController';

const router = Router();

// Niveis
router.post('/niveis', new CreateNivelController().handle);
router.get('/niveis', new ListNivelController().handle);
router.get('/niveis/:id', new GetNivelByIdController().handle);
router.delete('/niveis/:id', new DeleteNivelController().handle);
router.put('/niveis/:id', new UpdateNivelController().handle);

// Desenvolvedores
router.post('/desenvolvedores', new CreateDesenvolvedorController().handle);
router.get('/desenvolvedores', new ListDesenvolvedorController().handle);
router.get('/desenvolvedores/:id', new GetDesenvolvedorByIdController().handle);
router.delete('/desenvolvedores/:id', new DeleteDesenvolvedorController().handle);
router.put('/desenvolvedores/:id', new UpdateDesenvolvedorController().handle);

export { router };
import { Router } from 'express';
import { asyncHandler } from '../../shared/middlewares/asyncHandler';
import { DemoController } from './demo.controller';

const router = Router();
const controller = new DemoController();

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', asyncHandler(controller.create));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

export default router;

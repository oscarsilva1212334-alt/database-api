import { Router } from 'express';
import demoRoutes from '../../modules/demo/demo.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'API v1 funcionando', timestamp: new Date().toISOString() });
});

router.use('/demo', demoRoutes);

export default router;

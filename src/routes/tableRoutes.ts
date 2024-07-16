import { Router } from 'express';
import { getTables, createTable } from '../controllers/tableController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getTables);
router.post('/', authMiddleware, createTable);

export default router;

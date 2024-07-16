import { Router } from 'express';
import { getTables, createTable, updateTableStatus } from '../controllers/tableController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getTables);
router.post('/', authMiddleware, createTable);
router.put('/:id', authMiddleware, updateTableStatus);

export default router;

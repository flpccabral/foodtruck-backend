import { Router } from 'express';
import { createEstablishment, getEstablishments, getEstablishmentById } from '../controllers/establishmentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createEstablishment);
router.get('/', getEstablishments);
router.get('/:id', getEstablishmentById);

export default router;

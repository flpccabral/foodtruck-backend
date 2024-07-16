import { Router } from 'express';
import { createReport, getReports, getReportById } from '../controllers/reportController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports);
router.get('/:id', authMiddleware, getReportById);

export default router;

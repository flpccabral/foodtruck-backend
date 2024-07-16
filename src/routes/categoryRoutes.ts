import { Router } from 'express';
import { getCategories, createCategory, getProductsByCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getCategories);
router.post('/', authMiddleware, createCategory);
router.get('/:categoryId/products', authMiddleware, getProductsByCategory); // Adicionar rota para obter produtos por categoria

export default router;

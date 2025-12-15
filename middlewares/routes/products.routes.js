import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import * as productsController from '../controllers/products.controller.js';

const router = Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/create', authenticateToken, productsController.createProduct);
router.delete('/:id', authenticateToken, productsController.deleteProduct);

export default router;

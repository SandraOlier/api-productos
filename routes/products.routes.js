import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../config/controllers/products.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllProducts);
router.post('/', authenticateToken, createProduct);
router.post('/delete-multiple', authenticateToken, async (req, res) => {
  // delegado al controller para mantener estructura
  try {
    const { deleteMultiple } = await import('../config/controllers/products.controller.js');
    return deleteMultiple(req, res);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.get('/:id', getProductById);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;

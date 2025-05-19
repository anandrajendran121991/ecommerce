import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router: Router = Router();
// GET /products
router.get('/', ProductController.getAllProducts);

export default router;

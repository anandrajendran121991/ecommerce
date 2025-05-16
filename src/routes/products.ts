import { Router } from 'express';
import { getAllProducts } from '../controllers/product';

const router: Router = Router();
// GET /products
router.get('/', getAllProducts);

export default router;

import {Router} from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;
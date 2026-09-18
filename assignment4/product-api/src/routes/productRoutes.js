import express from 'express';
import { createProductHandler, deleteProductByIdHandler, findAllProductsHandler, findProductByIdHandler, updateProductByIdHandler } from '../controllers/productController.js';
import { validateCreateProduct, validateProductId, validateProductQuery, validateUpdateProduct } from '../middleware/productValidation.js';

const router = express.Router();

router.get('/', validateProductQuery, findAllProductsHandler);
router.get('/:id', validateProductId, findProductByIdHandler);
router.post('/', validateCreateProduct, createProductHandler);
router.put('/:id', validateProductId, validateUpdateProduct, updateProductByIdHandler);
router.delete('/:id', validateProductId, deleteProductByIdHandler)


export default router;

import express from 'express';
import { createProductHandler, deleteProductByIdHandler, findAllProductsHandler, findProductByIdHandler, updateProductByIdHandler } from '../controllers/productController.js';

const router = express.Router();

router.get('/', findAllProductsHandler);
router.get('/:id', findProductByIdHandler);
router.post('/', createProductHandler);
router.put('/:id', updateProductByIdHandler);
router.delete('/:id', deleteProductByIdHandler)


export default router;

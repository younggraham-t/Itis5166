import { createProduct, deleteProductById, findAllProducts, findProductById, updateProductById } from '../services/productService.js';
/**
 * Controller handler to retrieve all products.
 * Responds with HTTP status 200 and JSON array of products.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export function findAllProductsHandler(req, res) {
	const products = findAllProducts();
	res.json(products);
}

/**
 * Controller handler to retrieve a single product by ID.
 * Responds with HTTP status 200 and product JSON.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export function findProductByIdHandler(req, res) {
	const id = parseInt(req.params.id);
	const product = findProductById(id);
	res.status(200).json(product);

}

/**
 * Controller handler to create a new product.
 * Responds with HTTP status 201 Created and the new product JSON.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export function createProductHandler(req, res) {
	const { title, price, inStock } = req.body;
	const newProduct = createProduct({ title, price, inStock });
	res.status(201).json(newProduct);
	
}

/**
 * Controller handler to update an existing product.
 * Responds with HTTP status 200 and updated product JSON.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export function updateProductByIdHandler(req, res) {
	const {title, price, inStock} = req.body;
	const id = parseInt(req.params.id);
	const updatedProduct = updateProductById(id, {title, price, inStock});
	res.status(200).json(updatedProduct);
}

/**
 * Controller handler to delete a product by ID.
 * Responds with HTTP status 204 NO CONTENT.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export function deleteProductByIdHandler(req, res) {
	const id = parseInt(req.params.id);
	deleteProductById(id);
	res.status(204).send();
}

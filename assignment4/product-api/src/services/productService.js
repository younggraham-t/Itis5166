/**
 * Product Service
 * NOTE: The autograder executes unit tests directly against the functions in this file.
 * Business logic and 404 error handling must be implemented here.
 */

import { create, deleteById, findAll, findById, updateById } from "../repositories/productRepo.js"
/**
 * Retrieves all products from the repository.
 * @returns {Array<Object>} The array of all product objects.
 */
export function findAllProducts() {
	return findAll();
}

/**
 * Retrieves a single product by its ID.
 * @param {number} id - The numeric ID of the product.
 * @returns {Object} The product object if found.
 * @throws {Error} If the product with the given ID does not exist.
 */
export function findProductById(id) {
	const product = findById(id);
	if (product) return product;
	else {
		const err = new Error(`Product #${id} not found`);
		err.status = 404;
		throw err;
	}
}

/**
 * Passes new product data to the repository for creation.
 * @param {Object} productData - Object containing product details (name, price, inStock).
 * @returns {Object} The newly created product object including its assigned id.
 */
export function createProduct(productData) {
	return create(productData);
}

/**
 * Updates an existing product by its ID through the repository.
 * @param {number} id - The numeric ID of the product to update.
 * @param {Object} updatedData - Object containing properties to update.
 * @returns {Object} The updated product object.
 * @throws {Error} If the product with the given ID does not exist.
 */
export function updateProductById(id, updatedData) {
	const product = updateById(id, updatedData);
	if (product) return product;
	else {
		const err = new Error(`Product #${id} not found`);
		err.status = 404;
		throw err;
	}
}

/**
 * Deletes a product by its ID through the repository.
 * @param {number} id - The numeric ID of the product to delete.
 * @returns {boolean} true if successfully deleted.
 * @throws {Error} If the product with the given ID does not exist.
 */
export function deleteProductById(id) {
	const result = deleteById(id);
	if (result) {
		return result;
	}
	else {
		const err = new Error(`Product #${id} not found`);
		err.status = 404;
		throw err;
	}
}

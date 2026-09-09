/**
 * Product Repository
 * NOTE: The autograder executes unit tests directly against the functions in this file.
 * Do not bypass this repository layer or change exported function signatures.
 */

import { getNextId, products } from "../db/products.js";
/**
 * Retrieves all products.
 * @returns {Array<Object>} The array of all product objects.
 */
export function findAll() {
	return products;
}

/**
 * Finds a single product by its ID.
 * @param {number} id - The numeric ID of the product to find.
 * @returns {Object|undefined} The product object if found, or undefined if not found.
 */
export function findById(id) {
	const product = products.find(product => product.id === id);
	return product;
}

/**
 * Creates a new product with an auto-incremented ID and adds it to the products array.
 * @param {Object} productData - Object containing name, price, and inStock.
 * @returns {Object} The newly created product object including its assigned id.
 */
export function create(productData) {
	const newProduct = {
		id: getNextId(),
		title: productData.title,
		price: productData.price,
		inStock: productData.inStock
	}
	products.push(newProduct);
	return newProduct;
}

/**
 * Updates an existing product by its ID.
 * @param {number} id - The numeric ID of the product to update.
 * @param {Object} updatedData - Object containing properties to update.
 * @returns {Object|undefined} The updated product object if found, or undefined if not found.
 */
export function updateById(id, updatedData) {
	const product = findById(id);
	if (product) {
		if (updatedData.title) product.title = updatedData.title;
		if (updatedData.price) product.price = updatedData.price;
		if (updatedData.inStock) product.inStock = updatedData.inStock;

	}

	return product;
}

/**
 * Removes a product from the products array by its ID.
 * @param {number} id - The numeric ID of the product to delete.
 * @returns {boolean} true if deleted, false if not found.
 */
export function deleteById(id) {
	const ind = products.findIndex(product => product.id === id);
	if (ind === -1) {
		return false;
	}
	products.splice(ind, 1);
	return true;
	
}

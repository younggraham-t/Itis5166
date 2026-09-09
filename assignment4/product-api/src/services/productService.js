/**
 * Product Service
 * NOTE: The autograder executes unit tests directly against the functions in this file.
 * Business logic and 404 error handling must be implemented here.
 */

/**
 * Retrieves all products from the repository.
 * @returns {Array<Object>} The array of all product objects.
 */
export function findAllProducts() {}

/**
 * Retrieves a single product by its ID.
 * @param {number} id - The numeric ID of the product.
 * @returns {Object} The product object if found.
 * @throws {Error} If the product with the given ID does not exist.
 */
export function findProductById(id) {}

/**
 * Passes new product data to the repository for creation.
 * @param {Object} productData - Object containing product details (name, price, inStock).
 * @returns {Object} The newly created product object including its assigned id.
 */
export function createProduct(productData) {}

/**
 * Updates an existing product by its ID through the repository.
 * @param {number} id - The numeric ID of the product to update.
 * @param {Object} updatedData - Object containing properties to update.
 * @returns {Object} The updated product object.
 * @throws {Error} If the product with the given ID does not exist.
 */
export function updateProductById(id, updatedData) {}

/**
 * Deletes a product by its ID through the repository.
 * @param {number} id - The numeric ID of the product to delete.
 * @returns {boolean} true if successfully deleted.
 * @throws {Error} If the product with the given ID does not exist.
 */
export function deleteProductById(id) {}

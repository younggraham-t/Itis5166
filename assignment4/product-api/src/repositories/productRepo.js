/**
 * Product Repository
 * NOTE: The autograder executes unit tests directly against the functions in this file.
 * Do not bypass this repository layer or change exported function signatures.
 */

/**
 * Retrieves all products.
 * @returns {Array<Object>} The array of all product objects.
 */
export function findAll() {}

/**
 * Finds a single product by its ID.
 * @param {number} id - The numeric ID of the product to find.
 * @returns {Object|undefined} The product object if found, or undefined if not found.
 */
export function findById(id) {}

/**
 * Creates a new product with an auto-incremented ID and adds it to the products array.
 * @param {Object} productData - Object containing name, price, and inStock.
 * @returns {Object} The newly created product object including its assigned id.
 */
export function create(productData) {}

/**
 * Updates an existing product by its ID.
 * @param {number} id - The numeric ID of the product to update.
 * @param {Object} updatedData - Object containing properties to update.
 * @returns {Object|undefined} The updated product object if found, or undefined if not found.
 */
export function updateById(id, updatedData) {}

/**
 * Removes a product from the products array by its ID.
 * @param {number} id - The numeric ID of the product to delete.
 * @returns {boolean} true if deleted, false if not found.
 */
export function deleteById(id) {}

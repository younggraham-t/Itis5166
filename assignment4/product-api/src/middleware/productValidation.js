import { body, param, query, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

// TODO (Section 1): Validate route parameter id for GET, PUT, and DELETE /api/products/:id
export const validateProductId = [
	param('id')
		.trim()
		.escape()
		.isInt({ min: 1 })
		.withMessage('ID must be a positive integer'),

	handleValidationErrors,
];

// TODO (Section 1): Validate payload in request for POST /api/products
export const validateCreateProduct = [
	body('name')
		.isString()
		.withMessage("Name must be a string")
		.bail()
		.trim()
		.escape()
		.exists({ values: 'falsy' })
		.withMessage("Name is required")
		.bail()
		.isLength({ min: 5 })
		.withMessage("Name must be at least 5 characters long"),

	body('price')
		.isFloat({ gt: 0 })
		.withMessage("Price must be a positive number"),

	body('inStock')
		.isBoolean()
		.withMessage("inStock must be a boolean"),

	handleValidationErrors,
];

// TODO (Section 1): Validate payload in request for PUT /api/products/:id
export const validateUpdateProduct = [
	oneOf([
		body('name').exists({ values: 'falsy' }),
		body('price').exists({ values: 'falsy' }),
		body('inStock').exists()
	],
		{ message: "At least one field (name, price, or inStock) must be provided" },
	),
	body('name')
		.optional()
		.isString()
		.withMessage("Name must be a string")
		.bail()
		.trim()
		.escape()
		.bail()
		.isLength({ min: 5 })
		.withMessage("Name must be at least 5 characters long"),

	body('price')
		.optional()
		.isFloat({ gt: 0 })
		.withMessage("Price must be a positive number"),

	body('inStock')
		.optional()
		.isBoolean()
		.withMessage("inStock must be a boolean"),
	handleValidationErrors,
];

//TODO (Section 2): Validate query parameters for GET /api/products
export const validateProductQuery = [
	
	query('search')
	.optional()
	.trim()
	.escape(),
	
	query('inStock')
	.optional()
	.trim()
	.isBoolean()
	.withMessage('inStock must be a boolean'),
	
	query('minPrice')
	.optional()
	.isFloat({min: 0})
	.withMessage('minPrice must be a non-negative number'),

	query('maxPrice')
	.optional()
	.isFloat({min: 0})
	.withMessage('maxPrice must be a non-negative number'),

	query('sortBy')
	.optional()
	.isIn(['id', 'name', 'price'])
	.withMessage('sortBy must be one of id, name, price'),

	query('order')
	.optional()
	.toLowerCase()
	.isIn(['asc', 'desc'])
	.withMessage('order must be in asc or desc'),
	
	query('offset')
	.optional()
	.isInt({min: 0})
	.withMessage('offset must be a non-negative integer'),
	
	query('limit')
	.optional()
	.isInt({min: 1})
	.withMessage('limit must be a non-negative integer'),

	handleValidationErrors,
];

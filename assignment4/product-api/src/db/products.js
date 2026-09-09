const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 29.99, inStock: true },
  { id: 2, name: 'USB-C Cable', price: 12.5, inStock: false },
];

export const products = DEFAULT_PRODUCTS.map((p) => ({ ...p }));
let nextId = Math.max(...products.map((p) => p.id), 0);

export function getNextId() {
  nextId++;
  return nextId;
}

/**
 * Resets the database.
 * @param {Array} initialData Optional custom seed data for autograder tests.
 */
export function resetDb(initialData = DEFAULT_PRODUCTS) {
  products.length = 0;

  const clonedData = initialData.map((item) => ({ ...item }));
  products.push(...clonedData);

  nextId = Math.max(...products.map((p) => p.id), 0);
}

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 29.99, inStock: true },
  { id: 2, name: 'USB-C Cable', price: 12.5, inStock: false },
  { id: 3, name: 'Mechanical Keyboard', price: 89.99, inStock: true },
  { id: 4, name: 'Gaming Headset', price: 49.99, inStock: true },
  { id: 5, name: '4K Monitor', price: 299.99, inStock: false },
  { id: 6, name: 'Laptop Stand', price: 34.99, inStock: true },
  { id: 7, name: 'Bluetooth Speaker', price: 59.99, inStock: false },
  { id: 8, name: 'Webcam 1080p', price: 39.99, inStock: true },
  { id: 9, name: 'Desk Mat XL', price: 19.99, inStock: true },
  { id: 10, name: 'HDMI Cable 6ft', price: 9.99, inStock: false },
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

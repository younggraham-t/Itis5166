export const posts = [
  {
    id: 1,
    title: 'My First Blog',
    content: 'This is my first blog',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'My second Blog',
    content: 'This is my blog number 2',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'My Blog 3',
    content: 'This is my blog number 3',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'My Blog 4',
    content: 'This is my blog number 4',
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'My Blog 5',
    content: 'This is my blog number 5',
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'My Blog 6',
    content: 'This is my blog number 6',
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: 'My Blog 7',
    content: 'This is my blog number 7',
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    title: 'My Blog 8',
    content: 'This is my blog number 8',
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    title: 'My Blog 9',
    content: 'This is my blog number 9',
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    title: 'My Blog 10',
    content: 'This is my blog number 10',
    createdAt: new Date().toISOString(),
  },
];
let nextId = posts.length;

export function getNextId() {
  nextId++;
  return nextId;
}

export function resetDb() {
  posts.length = 0;
  nextId = posts.length;
}

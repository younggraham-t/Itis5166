import express from 'express';
import morgan from 'morgan';
import { posts } from './db/posts.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('tiny'));

app.get('/api/posts', (req, res) => {
  res.json({ posts });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

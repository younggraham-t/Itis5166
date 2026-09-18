import express from 'express';
import productRoutes from './routes/productRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/products', productRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack);
  }
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: [err.message] });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;

import express from 'express';
import { createPostHandler, deletePostByIdHandler, getALlPostsHandler, getPostByIdHandler, updatePostHandler } from '../controllers/postController.js';

const router = express.Router();
router.get('/', getALlPostsHandler);
router.get('/:id', getPostByIdHandler);
router.post('/', createPostHandler);
router.put('/:id', updatePostHandler);
router.delete('/:id', deletePostByIdHandler);



export default router;

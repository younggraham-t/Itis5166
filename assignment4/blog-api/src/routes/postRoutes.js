import express from 'express';
import { createPostHandler, deletePostByIdHandler, getALlPostsHandler, getPostByIdHandler, updatePostHandler } from '../controllers/postController.js';

import { validateId, validateCreatePost, validateUpdatePost } from '../middleware/postValidators.js';


const router = express.Router();
router.get('/', getALlPostsHandler);
router.get('/:id', validateId, getPostByIdHandler);
router.post('/', validateCreatePost, createPostHandler);
router.put('/:id', validateId, validateUpdatePost, updatePostHandler);
router.delete('/:id', validateId, deletePostByIdHandler);



export default router;

import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../services/postService.js";


export function getALlPostsHandler(req, res) {

	let posts = getAllPosts();

	res.json(posts);
}

export function getPostByIdHandler(req, res) {
	const id = parseInt(req.params.id);
	const post = getPostById(id);
	res.status(200).json(post);

}


export function createPostHandler(req, res) {
	const { title, content } = req.body;
	const newPost = createPost({ title, content });
	res.status(201).json(newPost);
}

export function updatePostHandler(req, res) {
	const id = parseInt(req.params.id);
	const { title, content } = req.body;

	const updatedPost = updatePost(id, { title, content });

	return res.status(200).json(updatedPost);
}

export function deletePostByIdHandler(req, res) {
	const id = parseInt(req.params.id);
	deletePost(id);
	res.status(204).send();
}

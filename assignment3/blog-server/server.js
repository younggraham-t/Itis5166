// server.js
// This module sets up an Express server and defines HTTP routes for blog management.

import express from 'express';
import { createPost, deletePost, listPosts, readPost, resetPosts, updatePost } from './blogService.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// ------------------- Routes -------------------

/**
 * Resets posts.json to its initial state.
 * Response (200 OK): { message: "All posts have been cleared" }
 */
app.post('/reset', async (req, res) => {
	await resetPosts();
	res.json({ message: 'All posts have been cleared' });
});

// TODO: Implement the following routes:
/**
 * POST /posts
 * Creates a new blog post with a unique ID, timestamp, and views initialized to 0.
 * Expected Request Body: { title: string, content: string }
 * Success Response (201 Created): Newly created post object as JSON
 * Error Response (400 Bad Request): { message: "Title and content are required" } if title or content is missing
 */

app.post('/posts', async (req, res) => {
	// console.log(req.body);
	const title = req.body.title;
	const content = req.body.content;

	if (!title || !content) {
		console.log("missing title or content")
		res.status(400).json({ "message": "Title and content are required" });
	}
	else {
		const newPost = await createPost(title, content);
		console.log(newPost)
		res.status(201).json(newPost);
	}

})
/**
 * GET /posts/:id
 * Retrieves a single post by ID (and increments its view count).
 * Success Response (200 OK): Post object as JSON if found
 * Error Response (404 Not Found): { message: "Post #<id> not found" } if ID does not exist
 */
app.get('/posts/:id', async (req, res) => {
	// console.log(req.params.id);
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		// res.status(400).json({message: "id must be a number"});
		res.status(404).json({ message: `Post #${id} not found` });
	}
	else {
		const post = await readPost(id);
		// console.log(post);


		if (!post) {
			res.status(404).json({ message: `Post #${id} not found` });
		}
		else {
			res.status(200).json(post);
		}

	}

})

/**
 * PUT /posts/:id
 * Updates an existing post's title and/or content.
 * Expected Request Body: { title?: string, content?: string }
 * Success Response (200 OK): { message: "Post #<id> updated" }
 * Error Response (400 Bad Request): { message: "Must provide title or content to update" } if both fields are missing
 * Error Response (404 Not Found): { message: "Post #<id> not found" } if ID does not exist
 */

app.put('/posts/:id', async (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	if (!title && !content) {
		res.status(400).json({message: "Must provide title or content to update"});

	}
	const id = parseInt(req.params.id);
	console.log(id);
	console.log(title);
	console.log(content);
	if (isNaN(id)) {
		// res.status(400).json({message: "id must be a number"});
		res.status(404).json({ message: `Post #${id} not found` });
	}
	else {


		const updatedPost = await updatePost(id, title, content);

		if (!updatedPost) {
			res.status(404).json({ message: `Post #${id} not found` });
		}
		else {
			res.status(200).json({ message: `Post #${id} updated` });
		}

	}

})


/**
 * DELETE /posts/:id
 * Deletes a post by ID.
 * Success Response (200 OK): { message: "Post #<id> deleted" }
 * Error Response (404 Not Found): { message: "Post #<id> not found" } if ID does not exist
 */

app.delete('/posts/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	console.log(id);
	if (isNaN(id)) {
		// res.status(400).json({message: "id must be a number"});
		res.status(404).json({ message: `Post #${id} not found` });
	}
	else {

		const deleted = await deletePost(id);


		if (!deleted) {
			res.status(404).json({ message: `Post #${id} not found` });
		}
		else {
			res.status(200).json({ message: `Post #${id} deleted` });
		}

	}

})

/**
 * GET /posts
 * Retrieves all blog posts.
 * Success Response (200 OK): Array of post objects as JSON
 */

app.get("/posts", async (req, res) => {
	const posts = await listPosts();
	res.status(200).json(posts);
})
/**
 * ===============================
 * IMPORTANT – DO NOT MODIFY
 * ===============================
 *
 * Runs automatically when executing `npm start`.
 * Automatically bypassed during testing in gradescope.
 */

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;

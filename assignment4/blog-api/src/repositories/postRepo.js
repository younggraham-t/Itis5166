
import { getNextId, posts } from '../db/posts.js';

export function getAll() {
	return posts;
}

export function getById(id) {
	return posts.find((post) => post.id === id);
}

export function create(postData) {
	const newPost = {
		id: getNextId(),
		title: postData.title,
		content: postData.content,
		createdAt: new Date().toISOString()
	}
	posts.push(newPost);
	return newPost;
}

export function update(id, updatedData) {
	const post = getById(id);
	if (!post) return undefined;
	if(updatedData.title) post.title = updatedData.title;
	if(updatedData.content) post.content = updatedData.content;
	return post;
}

export function remove(id) {
	const index = posts.findIndex(post => post.id === id);
	if (index === -1) {
		return false;
	}
	posts.splice(index, 1);
	return true;
}

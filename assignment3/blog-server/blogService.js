// blogService.js
// This module handles blog post CRUD operations

import fs from 'fs/promises';
import { join } from 'path';
import { format } from 'date-fns';
import { read } from 'fs';

// Filepath for posts.json. Use this for reading/writing posts.
const postsFile = join(process.cwd(), 'posts.json');

const DEFAULT_DATA = {
	nextId: 1,
	posts: []
};
const JSON_PRETTY_FORMAT_INDENT = 2
const JSON_PRETTY_FORMAT = null

/**
 * Helper: reads in all posts data from posts.json
 * @param {string} filePath - the file path of posts.json
 * @returns {object} the data stored in posts.json
 */
async function readAllPostsData(filePath) {
	try {
		// I wouldn't want to use this approach if the file were to be very large, but I'd also use a database if that were necessary
		const postsData = await fs.readFile(filePath, "utf8").then(data => JSON.parse(data));
		return postsData
	}
	catch {
		console.log("Could not find file: " + filePath + "\nReturning empty data");
		return DEFAULT_DATA
	}
}

/**
 * Helper: writes postsData back to posts.json
 * @param {string} postsFile - the file path of posts.json
 * @param {object} postsData - the data that will be written to the file
 */
async function writePostsData(postsFile, postsData) {
	try {
		await fs.writeFile(postsFile, JSON.stringify(postsData, JSON_PRETTY_FORMAT, JSON_PRETTY_FORMAT_INDENT));
	}
	catch (e) {
		console.log("Could not find file: " + postsFile);
		console.error(e)
	}
}

/**
 * Reset posts.json: clear all posts and set nextId back to 1.
 */
export async function resetPosts() {
	await writePostsData(postsFile, DEFAULT_DATA)
}


/**
 * Add a new post with a unique ID and timestamp.
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {object} The newly created post object (with views: 0)
 */
export async function createPost(title, content) {

	const postsData = await readAllPostsData(postsFile)

	// console.log(postsData)

	// console.log(postsData.nextId);
	const dateCreated = format(Date.now(), "y-M-d hh:mm aaa")
	const newPost = {
		id: postsData.nextId++,
		title,
		content,
		views: 0,
		createdAt: dateCreated

	}
	// console.log(newPost)
	// console.log(postsData.nextId);
	postsData.posts.push(newPost)

	await writePostsData(postsFile, postsData)

	return newPost
}


/**
 * Retrieves a post by its ID, recording a view. Returns the updated post object, or undefined if not found.
 * @param {number} id - Post ID
 * @returns {object|undefined} The updated post if found, otherwise undefined
 */
export async function readPost(id) {
	const postsData = await readAllPostsData(postsFile)
	const filtered = postsData.posts.filter((post) => {

	return post.id === id});

	if (filtered.length === 0) {
		return undefined;
	}
	else {
		const post = filtered[0];
		post.views++;
		
		await writePostsData(postsFile, postsData)
		return post;
	}

}

/**
 * Update a post's title and/or content.
 * @param {number} id - Post ID
 * @param {string} newTitle - New title (optional)
 * @param {string} newContent - New content (optional)
 * @returns {boolean} True if updated successfully, false if post not found
 */
export async function updatePost(id, newTitle, newContent) {
	const postsData = await readAllPostsData(postsFile)
	const filtered = postsData.posts.filter((post) => {
		console.log(post);
		return post.id === id; });
	if (filtered.length === 0) {
		// console.log(postsData)
		// console.log(filtered)
		return false;
	}
	else {
		// console.log(filtered)
		let post = filtered[0]
		// console.log(post)
		post.title = newTitle ? newTitle : post.title;
		post.content = newContent ? newContent : post.content;
	

		await writePostsData(postsFile, postsData)

		return true;

	}
}

/**
 * Delete a post by its ID.
 * @param {number} id - Post ID
 * @returns {boolean} True if deleted successfully, false if post not found
 */
export async function deletePost(id) {
	let postsData = await readAllPostsData(postsFile);
	const filtered = postsData.posts.filter(post => post.id !== id);

	//if there was no matching id filtered will be the same length as the unfiltered array
	if (filtered.length === postsData.posts.length) {
		return false;
	}

	postsData = {...postsData, ...{posts: filtered}}

	await writePostsData(postsFile, postsData);
	return true;

}

/**
 * Return all posts as an array of objects.
 * @returns {Array<object>} Array of all post objects
 */
export async function listPosts() {
	const postsData = await readAllPostsData(postsFile)
	return postsData.posts;
}

// index.js
// This module reads commands from commands.json and executes them sequentially.

import fs from 'fs/promises';
import { join } from 'path';
//TODO: Import your blog service functions here

import { createPost, deletePost, listPosts, readPost, resetPosts, updatePost } from './blogService.js';
/**
 * Executes a single blog command object.
 * The command object has an "action" property and optional data (title, content, id).
 * Each case performs any necessary input validation, executes the action, and logs the outcome.
 *
 * @param {object} cmd - The command to process
 *
 * Implement each case based on the descriptions below.
 */
export async function processCommand(cmd) {
	switch (cmd.action) {
		case 'reset': {
			// Clears all posts and resets nextId to 1
			await resetPosts()
			// Logs: "[RESET] All posts have been cleared"
			console.log("[RESET] All posts have been cleared")
			break;
		}
		case 'create': {
			// Check that title and content are provided
			if (!cmd.title || !cmd.content) {
			// If missing, log "[ERROR] Title and content are required"
				console.log("[ERROR] Title and content are required")
				break;
			}
			// Otherwise, create a new post with a unique ID, timestamp, and views initialized to 0

			const newPost = await createPost(cmd.title, cmd.content);

			// Logs: "[SUCCESS] Created post #<id>: '<title>'"
			console.log(`[SUCCESS] Created post #${newPost.id}: '${newPost.title}'`)
			break;
		}
		case 'read': {
			// Look up a post by ID (readPost increments the views count!)
			// If found, log "[POST #<id> | <views> views] '<title>' - <content>"
			// If not found, log "[ERROR] Post #<id> not found"
			if (!cmd.id) {
				break;
			}

			const post = await readPost(cmd.id);
			if (!post) {
				console.log(`[ERROR] Post #${cmd.id} not found`)
				break;
			}

			console.log(`[POST #${post.id} | ${post.views} views] '${post.title}' - ${post.content}`)

			break;
		}
		case 'update': {
			// Ensure at least title or content is provided
			if (!cmd.title && !cmd.content) {
				console.log(`[ERROR] Must provide title or content to update`)
			}
			if (!cmd.id) {
				break;
			}

			const success = await updatePost(cmd.id, cmd.title, cmd.content);
			if (success) {
				console.log(`[SUCCESS] Post #${cmd.id} updated`)
			}
			else {
				
				console.log(`[ERROR] Post #${cmd.id} not found`)
			}
			// If both are empty, log "[ERROR] Must provide title or content to update"
			// Update the post if it exists
			// Log "[SUCCESS] Post #<id> updated" if successful
			// Log "[ERROR] Post #<id> not found" if ID does not exist
			break;
		}
		case 'delete': {
			// Delete a post by ID
			if (!cmd.id) {
				break;
			}
			const success = await deletePost(cmd.id)

			if (success) {
				console.log(`[SUCCESS] Post #${cmd.id} deleted`)
			}
			else {
				
				console.log(`[ERROR] Post #${cmd.id} not found`)
			}

			// Log "[SUCCESS] Post #<id> deleted" if successful
			// Log "[ERROR] Post #<id> not found" if ID does not exist
			break;
		}
		case 'list': {
			// Lists all posts as an array of objects
			const posts = await listPosts()
			console.log(`[LIST] Total posts: ${posts.length}\n ${JSON.stringify(posts, null, 2)}`)
			// Logs: "[LIST] Total posts: <count>\n[<array of post objects>]"
			break;
		}
		case 'exit': {
			console.log('[INFO] Exiting program');
			process.exit(0);
		}
		default: {
			console.log(`[ERROR] Unknown action: ${cmd.action}`);
			break;
		}
	}
}

/**
 * ===============================
 * IMPORTANT – DO NOT MODIFY
 * ===============================
 *
 * Runs automatically when executing `node index.js`.
 * Automatically bypassed during testing in gradescope.
 */

if (process.env.NODE_ENV !== 'test') {
	const commandsFilePath = join(process.cwd(), 'commands.json');

	const data = await fs.readFile(commandsFilePath, 'utf-8');
	const commands = JSON.parse(data);

	for (const cmd of commands) {
		await processCommand(cmd);
	}
}

import type { Actions, PageServerLoad } from './$types.js';
import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		todos: await db.getTodos()
	};
};

export const actions = {
	create: async (e) => {
		const data = await e.request.formData();

		const description = data.get('description');
		if (!description) {
			return fail(400, { error: true, message: 'The description field is required' });
		}

		const todo = await db.getTodoByDesc(description.toString());
		if (todo) {
			return fail(409, { error: true, message: 'The description already exist' });
		}

		await db.createTodo({
			id: 0,
			is_done: false,
			description: description.toString(),
			updated_at: new Date()
		});

		return { success: true, message: 'The description succesfully added' };
	},
	updateDone: async (e) => {
		const data = await e.request.formData();

		const id = data.get('id');
		if (!id) {
			return fail(400, { error: true, message: 'The id field is required' });
		}

		const todo = await db.getTodoByID(parseInt(id.toString()));
		if (!todo) {
			return fail(404, { error: true, message: 'The id field is not found' });
		}

		todo.is_done = !todo.is_done;
		todo.updated_at = new Date();

		await db.updateTodo(todo);

		if (todo.is_done == true) {
			return { success: true, message: 'Congratulations ⭐️ ✨' };
		}

		return null;
	}
} satisfies Actions;

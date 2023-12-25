import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import type { Todo } from '$lib/types/todo';

const db = await open({
	filename: '/Users/ahmadferdian/Developer/Playgrounds/SVELTE/todo-list/tmp/database.db',
	driver: sqlite3.Database
});

export const createTodo = (todo: Todo) => {
	return db.run(
		`INSERT INTO todos (is_done, description, updated_at) VALUES(?, ?, ?);`,
		todo.is_done,
		todo.description,
		todo.updated_at.toString()
	);
};

export const updateTodo = (todo: Todo) => {
	return db.run(
		`UPDATE todos SET is_done=?, description=?, updated_at=? WHERE id=?;`,
		todo.is_done,
		todo.description,
		todo.updated_at.toString(),
		todo.id
	);
};

export const getTodos = () => {
	return db.all<Todo[]>(
		`SELECT id, description, is_done, updated_at FROM todos ORDER BY updated_at DESC;`
	);
};

export const getTodoByID = (id: Number) => {
	return db.get<Todo>(`SELECT id, description, is_done, updated_at FROM todos WHERE id = ?;`, id);
};

export const getTodoByDesc = (desc: String) => {
	return db.get<Todo>(
		`SELECT id, description, is_done, updated_at FROM todos WHERE description = ? COLLATE NOCASE;`,
		desc
	);
};

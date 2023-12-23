import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		todos: [
			{ id: 1, done: false, description: 'Take a lunch', updated_at: new Date() },
			{ id: 2, done: false, description: 'Study', updated_at: new Date() },
			{ id: 3, done: true, description: 'Pray', updated_at: new Date() },
			{ id: 4, done: false, description: 'Go to sleep', updated_at: new Date() }
		]
	};
};

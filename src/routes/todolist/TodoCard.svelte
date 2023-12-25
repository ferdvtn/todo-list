<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import type { Todo } from '$lib/types/todo';

	export let todos: Todo[];
	export let title: String;

	const is_finished = title == 'Finished';
</script>

<div class="{is_finished ? 'bg-green-100' : 'bg-red-100'} w-full h-full space-y-5">
	<div
		class="p-3 rounded font-semibold {is_finished ? 'bg-green-200' : 'bg-red-200'} {is_finished
			? 'text-green-500'
			: 'text-red-500'} text-center text-3xl"
	>
		<h1>{title}</h1>
	</div>
	{#if todos.length > 0}
		<ul
			class="divide-y {is_finished
				? 'bg-green-200 divide-green-300'
				: 'bg-red-200 divide-red-300'} rounded [&>*:last-child]:rounded-b [&>*:first-child]:rounded-t"
		>
			{#each todos as todo (todo.id)}
				<li
					class="flex justify-between py-2 px-3 hover:{is_finished
						? 'bg-green-300'
						: 'bg-red-300'} hover:cursor-default"
					in:fly={{ x: 20, duration: 400 }}
					out:fly={{ x: 20, duration: 200 }}
				>
					<div>{todo.description}</div>
					<form method="post" action="?/updateDone" use:enhance>
						<input type="hidden" name="id" value={todo.id} />
						<button
							type="submit"
							class="btn btn-circle btn-xs {is_finished
								? 'bg-red-200 text-red-500 border-red-500 hover:bg-red-300 hover:text-red-600 hover:border-red-600'
								: 'bg-green-200 text-green-500 border-green-500 hover:bg-green-300 hover:text-green-600 hover:border-green-600'}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
							</svg>
						</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>

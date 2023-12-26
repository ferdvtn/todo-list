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
					class="flex justify-between py-2 px-3 space-x-1 hover:{is_finished
						? 'bg-green-300'
						: 'bg-red-300'} hover:cursor-default"
					in:fly={{ x: 20, duration: 400 }}
					out:fly={{ x: 20, duration: 200 }}
				>
					<div class="flex-grow">{todo.description}</div>
					<form method="post" action="?/updateDone" use:enhance>
						<input type="hidden" name="id" value={todo.id} />
						<button
							type="submit"
							class="rounded {is_finished
								? 'bg-red-200 text-red-500 border-red-500 hover:bg-red-300 hover:text-red-600 hover:border-red-600'
								: 'bg-green-200 text-green-500 border-green-500 hover:bg-green-300 hover:text-green-600 hover:border-green-600'}"
						>
							{#if is_finished}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
							{:else}
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
							{/if}
						</button>
					</form>
					<form method="post" action="?/remove" use:enhance>
						<input type="hidden" name="id" value={todo.id} />
						<button
							type="submit"
							class="rounded bg-gray-200 text-gray-500 border-gray-500 hover:bg-gray-300 hover:text-gray-600 hover:border-gray-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>

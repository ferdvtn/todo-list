<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageServerData } from './$types';

	interface ITodo {
		id: Number;
		done: Boolean;
		description: String;
		updated_at: Date;
	}

	export let data: PageServerData;

	let todos: ITodo[] = data.todos;

	$: finished = todos.filter((todo) => todo.done);
	$: unfinished = todos.filter((todo) => !todo.done);

	const doneHandler = (todo: ITodo) => {
		todos = todos
			.map((val) => {
				if (todo == val) {
					val.done = !val.done;
					val.updated_at = new Date();
				}

				return val;
			})
			.sort((a, b) => {
				return b.updated_at.valueOf() - a.updated_at.valueOf();
			});
	};
</script>

<div
	class="flex justify-between items-start min-h-screen space-x-5 [&>*]:p-5 [&>*]:rounded text-slate-700 font-semibold"
>
	<div class="bg-red-100 w-full h-full space-y-5">
		<div class="p-3 rounded font-semibold bg-red-200 text-red-500 text-center text-3xl">
			<h1>Unfinished</h1>
		</div>
		{#if unfinished.length > 0}
			<ul
				class="divide-y bg-red-200 divide-red-300 rounded [&>*:last-child]:rounded-b [&>*:first-child]:rounded-t"
			>
				{#each unfinished as unfintodo (unfintodo.id)}
					<li
						class="flex justify-between py-2 px-3 hover:bg-red-300 hover:cursor-default"
						in:fly={{ x: 20, duration: 400 }}
						out:fly={{ x: 20, duration: 200 }}
					>
						<div>{unfintodo.description}</div>
						<button
							class="btn btn-circle btn-xs bg-green-200 text-green-500 border-green-500 hover:bg-green-300 hover:text-green-600 hover:border-green-600"
							on:click={() => doneHandler(unfintodo)}
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
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<div class="bg-green-100 w-full h-full space-y-5">
		<div class="p-3 rounded font-semibold bg-green-200 text-green-500 text-center text-3xl">
			<h1>Finished</h1>
		</div>
		{#if finished.length > 0}
			<ul
				class="divide-y bg-green-200 divide-green-300 rounded [&>*:last-child]:rounded-b [&>*:first-child]:rounded-t"
			>
				{#each finished as fintodo (fintodo.id)}
					<li
						class="flex justify-between py-2 px-3 hover:bg-green-300 hover:cursor-default"
						in:fly={{ x: -20, duration: 400 }}
						out:fly={{ x: -20, duration: 200 }}
					>
						<div>{fintodo.description}</div>
						<button
							class="btn btn-circle btn-xs bg-red-200 text-red-500 border-red-500 hover:bg-red-300 hover:text-red-600 hover:border-red-600"
							on:click={() => doneHandler(fintodo)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/></svg
							>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

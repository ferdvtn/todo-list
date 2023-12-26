<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { ActionData, PageServerData } from './$types';
	import TodoCard from './TodoCard.svelte';
	import TodoInput from './TodoInput.svelte';

	export let data: PageServerData;
	export let form: ActionData;

	$: finished = data.todos.filter((todo) => todo.is_done);
	$: unfinished = data.todos.filter((todo) => !todo.is_done);
</script>

<div class="flex justify-center mb-5">
	<TodoInput />
</div>

<div
	class="flex justify-between items-start h-full space-x-5 [&>*]:p-5 [&>*]:rounded text-slate-700 font-semibold"
>
	<TodoCard title="Unfinished" todos={unfinished} />
	<TodoCard title="Finished" todos={finished} />
</div>

{#if form?.success && form.message}
	<p
		in:fly={{ x: 100, duration: 200 }}
		out:fade={{ duration: 200 }}
		class="absolute top-5 right-5 px-3 py-1 rounded bg-success text-success-content"
	>
		{form.message}
	</p>
{/if}

{#if form?.error && form.message}
	<p
		in:fly={{ x: 100, duration: 200 }}
		out:fade={{ duration: 200 }}
		class="absolute top-5 right-5 px-3 py-1 rounded bg-error text-error-content"
	>
		{form.message}
	</p>
{/if}

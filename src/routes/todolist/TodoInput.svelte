<script>
	import { enhance } from '$app/forms';
</script>

<form method="post" action="?/create" use:enhance>
	<div class="join">
		<input
			type="text"
			class="input input-bordered join-item border border-gray-200 outline-gray-300"
			name="description"
			placeholder="Do homework"
		/>
		<button type="submit" class="btn join-item rounded-r border border-gray-200 outline-gray-300">
			Add
		</button>
	</div>
</form>

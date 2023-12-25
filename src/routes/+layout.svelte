<script>
	import '../app.css';
</script>

<div class="container mx-auto flex min-h-screen">
	<div class="flex-grow relative">
		<div class="navbar bg-slate-100 text-slate-700">
			<div class="navbar-start">
				<a href="/" class="btn btn-ghost text-xl">Welcome</a>
			</div>
			<div class="navbar-center">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/todolist">To Do List</a></li>
				</ul>
			</div>
			<div class="navbar-end"></div>
		</div>

		<div class="p-5">
			<slot />
		</div>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData['data'];
	console.log(data);
	console.log(data[0]);

	// Sorting functionality
	let sortColumn: string | null = null;
	let sortAscending = true;

	function sortData(column: string) {
		if (sortColumn === column) {
			sortAscending = !sortAscending;
		} else {
			sortColumn = column;
			sortAscending = true;
		}
		data.movies.sort((a, b) => {
			if (a[column] < b[column]) return sortAscending ? -1 : 1;
			if (a[column] > b[column]) return sortAscending ? 1 : -1;
			return 0;
		});
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Lotan leffanurkkaus</h1>
	<table>
		<thead>
			<tr>
				<th on:click={() => sortData('title')}>Title</th>
				<th on:click={() => sortData('rating')}>Rating</th>
                <th on:click={() => sortData('service')}>Service</th>
				<th>Genres</th>
                <th>More Info</th>
			</tr>
		</thead>
		<tbody>
			{#each data.movies as item}
				<tr>
					<td>{item.title}</td>
                    <td>{item.rating}</td>
					<td>{item.service}</td>
					<td>{item.genres.join(', ')}</td>
                    <td><a href={item.more_info} target="_blank">More Info</a></td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}
	th {
		cursor: pointer;
		background-color: #f2f2f2;
	}
</style>

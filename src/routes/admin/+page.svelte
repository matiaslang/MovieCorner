<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Movie } from '../../types/movie';
	import { WithAuth } from '../../services/oauthClient';
	import type { User } from '@auth0/auth0-spa-js';
	import { enhance } from '$app/forms';
	import { NumberInput, Switch, CheckboxGroup } from '@svelteuidev/core'
	import { goto } from '$app/navigation';

	let loggedIn = writable(false);
	const auth = WithAuth();
	let isMovie = false;
	function logout() {
		auth.logout();
		loggedIn.set(false);
	}

    loggedIn.subscribe((value) => {
        console.log(value);
    });

	let user: User;
	auth.user.subscribe((value) => {
		console.log(value);
		if (value) {
			user = value;
			loggedIn.set(true);
		}else {
            loggedIn.set(false);
        }
	});

	const onChange = (event: any) => {
		isMovie = !isMovie;
	};

	const genreItems = [
		{ label: 'Toiminta', value: 'Toiminta' },
		{ label: 'Seikkailu', value: 'Seikkailu' },
		{ label: 'Komedia', value: 'Komedia' },
		{ label: 'Draama', value: 'Draama' },
		{ label: 'Kauhu', value: 'Kauhu' },
		{ label: 'Fantasia', value: 'Fantasia' },
		{ label: 'Musiikki', value: 'Musiikki' },
		{ label: 'Romantiikka', value: 'Romantiikka' },
		{ label: 'Scifi', value: 'Scifi' },
		{ label: 'Trilleri', value: 'Trilleri' },
		{ label: 'Western', value: 'Western' },
		{ label: 'Dokumentti', value: 'Dokumentti' },
		{ label: 'Animaatio', value: 'Animaatio' },
		{ label: 'Perhe', value: 'Perhe' },
		{ label: 'Jännitys', value: 'Jännitys' },
		{ label: 'Sota', value: 'Sota' },
		{ label: 'Urheilu', value: 'Urheilu' },
		{ label: 'Mysteeri', value: 'Mysteeri' },
		{ label: 'Historia', value: 'Historia' },
		{ label: 'Rikos', value: 'Rikos' },
		{ label: 'Kotimainen', value: 'Kotimainen' },
		{ label: 'Klassikko', value: 'Klassikko' },
		{ label: 'Muut', value: 'Muut' }
	];

	let genreValue: string[] = [];

	const items = [
		{ label: 'Netflix', value: 'Netflix' },
		{ label: 'Disney+', value: 'Disney+' },
		{ label: 'HBO', value: 'HBO' },
		{ label: 'Amazon Prime', value: 'Amazon Prime' },
		{ label: 'Apple TV', value: 'Apple TV' },
		{ label: 'Hulu', value: 'Hulu' },
		{ label: 'Youtube', value: 'Youtube' },
		{ label: 'Other', value: 'Other' }
	];
	let value: string[] = [];
</script>

{#if $loggedIn}
	<div>
		<button class="logout-button" on:click={logout}>Logout</button>
		<h1>Lisää elokuva</h1>
		<div>
			<form
				method="POST"
				use:enhance={(formData) => {
					formData.formData.append('created_by', user.email ?? '');
					formData.formData.append('is_movie', isMovie.toString());
					formData.formData.append('service', value.join(',') ?? '');
                    formData.formData.append('genre', genreValue.join(',') ?? '');
				}}
			>
				<div class="form-group">
					<label for="title">Title</label>
					<input id="title" type="text" name="title" placeholder="Title" required />
				</div>
				<div class="form-group">
					<label for="rating">Rating</label>
					<NumberInput required placeholder="0-10" name="rating" min={0} max={10} />
				</div>
				<div class="form-group">
					<label for="moreInfo">Description</label>
					<input id="moreInfo" type="text" name="more_info" placeholder="More Info" required />
				</div>
				<div class="form-group">
					<label for="genre">Genre</label>
					<CheckboxGroup items={genreItems} bind:value={genreValue} name="genre" />
				</div>
				<div class="form-group">
					<label for="service">Service</label>
					<CheckboxGroup {items} bind:value name="services" />
				</div>
				<Switch
					name="is_movie"
					on:change={onChange}
					label="This is a movie?"
					size="xl"
					color="orange"
				/>
				<button class="submit-button" type="submit">Add Movie</button>
			</form>
		</div>
	</div>
{:else}
	<div class="blur1">
		<div class="modal">
			<h2>Paina tästä niin kirjaudutaan sisään :)</h2>
			<button class="logout-button" on:click={() => goto('/')}>Takaisin</button>
			<button class="logout-button" on:click={auth.logout}>Logout</button>
			<button class="login-button" on:click={auth.login}>Login</button>
		</div>
		<div class="overlay"></div>
	</div>
{/if}

<style>
	:global(body) {
		background-color: #e6e2d8;
		color: #719972;
		font-family: 'Arial', sans-serif;
		margin: 0;
		padding: 0;
	}

	.blur {
		filter: blur(5px);
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #1e1e1e;
		color: #e0e0e0;
		padding: 2rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		z-index: 10;
		border-radius: 5px;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 5;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	input[type='text'],
	input[type='number'],
	input[type='checkbox'] {
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.5rem;
		border: 1px solid #444;
		border-radius: 5px;
		background: #e6e2d8;
		color: #719972;
	}

	button {
		padding: 0.75rem 1.5rem;
		margin-top: 1rem;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.logout-button {
		background: #ff6b6b;
		color: #fff;
	}

	.submit-button {
		background: #32ff7e;
		color: #1e1e1e;
	}

	.login-button {
		background: #32ff7e;
		color: #1e1e1e;
	}
</style>

<script>
	import {onMount} from "svelte"
	import { Router, Link, Route } from "svelte-navigator";
	import Frontpage from "./pages/Frontpage.svelte";
	import Items from "./pages/ItemPage.svelte"
	import About from "./pages/About.svelte"
	import Profile from "./pages/Profile.svelte";
	import Login from "./pages/Login.svelte";
	import {currentUser} from "./store/generalStore.js"

</script>


<main>
	<h1>.</h1>
	<Router>
		<nav>
			<Link to="/">Home</Link>
			<Link to="about">About</Link>
			<Link to="items">Items</Link>
			{#if $currentUser !== null}
			<Link to="profile">Profile</Link>
			{/if}
			{#if $currentUser == null}
			<Link to="login">Log in</Link>
			{/if}

		</nav>
		<div>
			<Route path="/">
				<Frontpage />
			</Route>
			<Route path="about" component={About} />
			<Route path="items/*">
				<Route path="/">
					<Items />
				</Route>
				<!--Route path=":id" component={BlogPost} /-->
			</Route>
			<Route path="profile">
				<Profile/>
			</Route>
			<Route path="login">
				<Login/>
			</Route>
		</div>
	</Router>
	
</main>


<footer>
	{new Date().getFullYear()}
	Contact
	About
</footer>

<style>
main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		min-height: calc(100vh - 4em); 
	} 
	footer {
		background-color: grey;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
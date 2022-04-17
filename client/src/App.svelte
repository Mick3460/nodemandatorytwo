<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Frontpage from "./pages/Frontpage.svelte";
	import ItemPage from "./pages/ItemPage.svelte"
	import About from "./pages/About.svelte"
	import Profile from "./pages/Profile.svelte";
	import Login from "./pages/Login.svelte";
	import PrivateRoute from "./pages/PrivateRoute.svelte";
	import {currentUser} from "./store/generalStore.js"
	import SpecificItem from "./pages/SpecificItem.svelte";
	import {allItemsInStore, cartList} from "./store/itemsStore.js"
import CartList from "./pages/CartList.svelte";
console.log($cartList);

//TODO: make a function that check if the currentUser is null or not
</script>


<main>
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
			{#if $cartList != null}
			<Link to ="cartList">Your cart</Link>
			{/if}

		</nav>
		<div style="height: 70%">
			<Route path="/">
				<Frontpage />
			</Route>
			<Route path="about" component={About}/>
			<Route path="items/*">
				<Route path="/" >
					<ItemPage></ItemPage>
				</Route>
				<Route path=":id" let:params>
						<SpecificItem id={params.id}></SpecificItem>
				</Route>
			</Route>
			<PrivateRoute path="profile">
				<Profile/>
			</PrivateRoute>
			<Route path="login">
				<Login/>
			</Route>
			<Route path="cartList" primary={false}>
				<CartList></CartList>
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
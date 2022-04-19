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
import { SvelteToast } from '@zerodevx/svelte-toast'
//TODO: make a function that check if the currentUser is null or not
</script>

<SvelteToast/>
<main>
	<Router>
		<nav>
			<ul>
			<li><Link to="/" class="aTest">Home</Link></li>
			<li><Link to="about">About</Link></li>
			<li><Link to="items">Items</Link></li>
			{#if $currentUser !== null}
			<li><Link to="profile">Profile</Link></li>
			{/if}
			{#if $currentUser == null}
			<li><Link to="login">Log in</Link></li>
			{/if}
			{#if $cartList != null}
			<li><Link to ="cartList">Your cart: ({$cartList.length})</Link></li>
			{/if}
			</ul>
		</nav>
		<div>
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
				<CartList/>
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
	
ul {
	list-style: none;
    display: flex;
    justify-content: center;
    flex-direction: row;
}
li{
	margin: 30px
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
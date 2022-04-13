<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import {currentUser, fetchOneUser,logInAttempts} from "../store/generalStore.js"
	


	const navigate = useNavigate();
	const location = useLocation();

	let username = "LolFixed";
	let password = "Iaintgotnomoney@lol.dk";

	async function handleSubmit() {
		const givenInfo= {name: username, email: password}
		const fetchedUserData = await fetchOneUser(givenInfo)
		//console.log("fetched user data in Login.svelte: ",fetchedUserData);
		if (fetchedUserData == null) {
			//console.log("Error was returned in Login, dont do nothing. User not found");
			$logInAttempts +=1
		} else if (fetchedUserData == 429){
			console.log("Too many tries, come back later");
			navigate("/", { replace: true });
		}
		else {
			$currentUser = fetchedUserData.data
			const from = ($location.state && $location.state.from) || "/";
			//console.log("from:", from);
			$logInAttempts = 0;
			navigate("/profile", { replace: true });
		}
	}
</script>

<h3>Login</h3>
<form on:submit|preventDefault={handleSubmit}>
	<input
		bind:value={username}
		type="text"
		name="username"
		placeholder="Username"
	/>
	<br />
	<input
		bind:value={password}
		type="password"
		name="password"
		placeholder="Password"
	/>
	<br />
	<button type="submit">Login</button>
</form>

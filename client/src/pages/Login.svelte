<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import {currentUser, fetchOneUser,fetchOneUserByEmail,insertCustomer,logInAttempts,sessionKey} from "../store/generalStore.js"
	


	const navigate = useNavigate();
	const location = useLocation();

	let email = "mail@lol.dk";
	let password = "lol";
	let signUpName = "";
	let signUpEmail ="";
	let signUpPassword ="";

	async function handleSubmit() {
		const givenInfo= {email, password}
		const fetchedUserData = await fetchOneUser(givenInfo)
		//console.log("fetched user data in Login.svelte: ",fetchedUserData);
		if (fetchedUserData == null) {
			$logInAttempts +=1
		} else if (fetchedUserData == 429){
			console.log("Too many tries, come back later");
			navigate("/", { replace: true });
		}
		else {
			$currentUser = fetchedUserData.data
			const from = ($location.state && $location.state.from) || "/";
			$sessionKey = fetchedUserData.sessionKey
			$logInAttempts = 0;
			navigate("/profile", { replace: true });
		}
	}

	async function handleSignupSubmit() {
		const givenInfo = {signUpName, signUpEmail, signUpPassword};
		const response = await fetchOneUserByEmail(givenInfo.signUpEmail);
		if (response === 0){
			console.log("Email is being used");
		} else if (response === 1) {
			
			const makeCustomer = await insertCustomer(givenInfo);
			const newCustomer = {name: makeCustomer.data.signUpName, email: makeCustomer.data.signUpEmail, password: makeCustomer.data.signUpPassword}
			$currentUser = newCustomer
			$sessionKey = makeCustomer.sessionID
			
			navigate("/profile", { replace: true });
		}

	}
</script>
<div>
	
<h3>Login</h3>
<form on:submit|preventDefault={handleSubmit}>
	<input
		bind:value={email}
		type="text"
		name="email"
		placeholder="email"
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
</div>

<div>
<h3>Signup</h3>
<form on:submit|preventDefault={handleSignupSubmit}>
	<input
		bind:value={signUpName}
		type="text"
		name="signUpName"
		placeholder="Name"
	/>
	<br />
	<input
		bind:value={signUpEmail}
		type="text"
		name="signUpEmail"
		placeholder="email"
	/>
	<br />
	<input
		bind:value={signUpPassword}
		type="password"
		name="signUpPassword"
		placeholder="Password"
	/>
	<br />
	<button type="submit">Login</button>

</form>
</div>
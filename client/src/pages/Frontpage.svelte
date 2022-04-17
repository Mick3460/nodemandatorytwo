<script>
	import {onMount} from "svelte"
    import {allUsers, currentUser, users,sessionKey} from "../store/generalStore.js"
let username;
let password;


onMount( async () => {
    //TODO: make a function that check if the currentUser is null or not
        const alllUsers = await allUsers()
        console.log("users: ", alllUsers.data[0]);
        $users = JSON.stringify(alllUsers.data[0])
	});

</script>

<main>
<h3>Frontpage</h3>
<p>random user: {$users}</p>
<p>current user: {$currentUser}</p>
<p>sessionKey: {$sessionKey}</p>
</main>

<style>
    
</style>
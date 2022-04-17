<script>
    //lav fetch som henter brugerens info
    import { useNavigate } from "svelte-navigator";
    import {currentUser,logOutOfSession,sessionKey} from "../store/generalStore.js"
    const navigate = useNavigate();

    import Content from '../components/Content.svelte';
    import Modal from 'svelte-simple-modal';

    function handleLogout() {
		$currentUser = null;
        $sessionKey = null;
        logOutOfSession();
        navigate("/", { replace: true });
	}

</script>

<div>
    <h3>Profile stuff</h3>
    <p>{$currentUser?.name}</p>
    <p>{$currentUser?.email}</p>
    
    <button on:click|preventDefault={handleLogout}>Log out</button>
    <Modal>
        <Content customer={$currentUser} />
    </Modal>
</div>

<style>

</style>
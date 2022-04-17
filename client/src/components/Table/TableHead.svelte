<script>
    export let header;

    //please work dispatch, I really dont get you
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function sortTableByHeader(event) {
        const target = event.target.id
		dispatch('myOwnEvent', {
			header: target
		});
	}
</script>


{#each header as head}
    <th on:click={sortTableByHeader} id={head}>{head}</th>
{/each}


<style>
    th {
        background-color:cornflowerblue;
        cursor: pointer;
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        display: inline-block;
        height: 50px;
        width: 100px;
    }
    
</style>
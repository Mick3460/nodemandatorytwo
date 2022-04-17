<script>
    import {cartList,sendEmailFetch} from "../store/itemsStore.js"
    import ItemTable from "../components/Table/ItemTable.svelte"
    import { useNavigate, useLocation } from "svelte-navigator";
    import { currentUser } from "../store/generalStore.js";

    const navigate = useNavigate();

    let headers = $cartList;
    if (headers != null || headers != undefined){
    headers = Object.keys($cartList[0])
    }
    console.log("headers",headers);

    function handleBuySubmit(){
        //TODO: Send email with purchase CALL METHOD TO SEND IN ITEMS ROUTE
        const response = sendEmailFetch()
        //use toastr to make a notification that says something neat
        
        $cartList = null;
        
        //bonus: simulate purchase.. (no time lol)
        navigate("/", { replace: true })
    }
</script>



<div>
<ItemTable headers={headers} items={$cartList}> </ItemTable>
{#if $currentUser != null}
<button on:click|preventDefault={handleBuySubmit}>Buy now</button>
{:else}
    <h3>Log in to buy!</h3>
{/if}
</div>

<style>

</style>
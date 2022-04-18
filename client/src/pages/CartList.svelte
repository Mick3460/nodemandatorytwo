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
    import { toast } from '@zerodevx/svelte-toast'
    function handleBuySubmit(){
        //TODO: Send email with purchase CALL METHOD TO SEND IN ITEMS ROUTE
        const response = sendEmailFetch()
        //use toastr to make a notification that says something neat
        
        
        toast.push('Thanks for you purchase! A confirmation email has been sent to you!')
        //bonus: simulate purchase.. (no time lol)
        setTimeout(() => {
            navigate("/", { replace: true })
            $cartList = null;
        },4000)
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
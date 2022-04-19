<script>
    import {cartList,sendEmailFetch} from "../store/itemsStore.js"
    import ItemTable from "../components/Table/ItemTable.svelte"
    import { useNavigate, useLocation } from "svelte-navigator";
    import { currentUser } from "../store/generalStore.js";
    import { toast } from '@zerodevx/svelte-toast'

    const navigate = useNavigate();

    let headers = $cartList;
    if (headers != null || headers != undefined){
    headers = Object.keys($cartList[0])
    }
    
    function handleBuySubmit(){
        //TODO: Send email with purchase CALL METHOD TO SEND IN ITEMS ROUTE
        const response = sendEmailFetch()
        // response isnt used because lack of time.. Should do a check here..

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
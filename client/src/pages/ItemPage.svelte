<script>
import { useNavigate, useLocation } from "svelte-navigator";
import {allItems, allItemsInStore} from "../store/itemsStore.js"
import {onMount} from "svelte"
import Item from "../components/Item.svelte"
/*
$allItemsInStore = [{name:"pantsOne", price:1200, size_s:10, size_m:9, size_l:3},
{name:"pantsTwo", price:100, size_s:14, size_m:3, size_l:1}]
*/
let testOfItems = $allItemsInStore
onMount( async () => {
        const items = await allItems()
        console.log("items from fetch: ", items.data);
        testOfItems = items.data
        $allItemsInStore= items.data
        console.log("all items in store: ", $allItemsInStore);
	});


</script>

<div id="outer">
    <h4>This is the items page</h4>
    <div id="itemsBox">
    {#each testOfItems as item (item.id)} <!-- make better key lol-->
    <Item id={item.id}
    name={item.name} 
    price={item.price }
    size_s={item.size_s} 
    size_m={item.size_m }
    size_l={item.size_l}
    pictureUrl={item.pictureUrl}/>
    {/each}
    </div>
</div>

<style>
#outer {
    width: 100%;
    height: 70%;
    background-color: brown;
    
}
#itemsBox {
    background-color: rgb(39, 32, 111);
    display: table-cell;
    text-align: center;
    padding: 10px;
    border: 1px dashed gray;
    width: 25%;
    height: 25%;

}
</style>
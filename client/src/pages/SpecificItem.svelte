<script>
    export let id = "lol";
    import {allItemsInStore,cartList} from "../store/itemsStore.js"
    import { useNavigate } from "svelte-navigator";


    function findItem(id) {
        const itemArray = $allItemsInStore;
        const selectedItemIndex = itemArray.findIndex(item => item.id === Number(id))
        if(selectedItemIndex !== -1){
            return itemArray[selectedItemIndex]
        }
    }
    
    const selectedItem = findItem(id)
    //items har disse keys: id, name, price, size_s,size_m,size_l,pictureUrl

    function handleSubmit() {
        if($cartList == null){
            $cartList = []
        }
        $cartList.push(selectedItem)
        $cartList=$cartList
    }

    const navigate = useNavigate();
    

</script>

<div style="height: 70vh; display:block">
    
    <div id="itemBox" style="background-image: url({selectedItem.pictureUrl}); background-size: cover">
        <div id="innerBox">
        <p>Item name:
            {selectedItem.name}</p>
        <p>Price:
            {selectedItem.price}</p>
        <p>Amount of items in small:
            {selectedItem.size_s}</p>
        <p>Amount of items in medium:
            {selectedItem.size_m}</p>
        <p>Amount of items in large:
            {selectedItem.size_l}</p>
        <p><button on:click|preventDefault={handleSubmit}>Add me to cart</button></p>
        </div>
    </div>
    <div id="rightBox">
        <h2>Something else here?</h2>
    </div>
    <div>
    <button on:click="{() => navigate(-1)}">Back to items page</button>
    <button on:click="{() => navigate("/cartList")}">Go to cart list</button>
    </div>
</div>

<style>
    #itemBox{ 
        background-color: blanchedalmond;
        width: 70%;
        height: 100%;
        display: flex;
        float: left;
        align-items: flex-end;
    }
    #innerBox{
        display: flex;
        float: left;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-evenly;
        width: 100%;
        height: 30%;
    }
    p {
        display: flex;
        width: 30%;
        height: 40%;
        padding: 2px;
        border-color: black;
        border-style: solid;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    #rightBox {
        background-color: darkkhaki;
        width: 30%;
        height: 100%;
        display: flex;
        float:right;

    }

</style>
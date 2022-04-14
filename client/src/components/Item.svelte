<script>
export let id;
export let name;
export let price;
export let size_s;
export let size_m;
export let size_l;
export let pictureUrl;

</script>

<div id="inner" style="background-image: url({pictureUrl}); background-size: cover">
    <p>name: {name}</p>
    <p>price: {price}</p>
    <p>amount of small: {size_s}</p>
    <p>amount of medium:{size_m}</p>
    <p>amount of large: {size_l}</p>
</div>

<style>
    #inner {
        background-color: aquamarine;
        display:block;
        width: 31%;
        height: 31%;
        margin: 0.1em;
        float: left;
        text-align: center;
        

    }
    p {
        padding: 1px;
        height: 20%;
        width: 15%;
    }
    
</style>
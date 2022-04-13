<script>
export let name;
export let price;
export let size_s;
export let size_m;
export let size_l;

</script>

<div id="inner">
    <p class="test">{name}</p>
    <p>{price}</p>
    <p class="test">{size_s}</p>
    <p>{size_m}</p>
    <p class="test">{size_l}</p>
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
    p.test{
       background-color: blueviolet; 
    }
</style>
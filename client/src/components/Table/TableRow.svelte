<script>
    export let items;
</script>

{#each items as item}
    <tr>
    {#each Object.keys(item) as key}  <!-- Object.keys(item) returns an array of all the keys in the object-->
        {#if key.toString() == "pictureUrl"}
            <td> <img src='{item[key]}' alt='Avatar of item' height="80"/> </td>
        {:else}
        <td>{item[key]} </td> <!-- "key" would just give "name" or "email".. We need to specify it's from the item-->
        {/if}
    {/each}
    </tr>
{/each}

<style>
   td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        display: inline-block;
        height: 100px;
        width: 100px;
    }
</style>
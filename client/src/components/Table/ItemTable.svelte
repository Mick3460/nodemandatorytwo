<script>
    import TableHead from './TableHead.svelte'
    import TableRow from './TableRow.svelte'
    export let headers;
    export let items;
    
    let latestSort = '' ;
    function sort(event){
        const target = event.detail.header;
        //console.log(typeof(target)) // it's a string, use it?
        if(target !== latestSort){ // remember hard equality so Anders wont hit you
            latestSort = target;
            items = items.sort(function(a,b){
                if(a[target] < b[target]) return -1;
                else if(b[target] < a[target]) return 1;
                else return 0;
                })
        } else {
            items = items.reverse()
        }
    }
</script>

<table>    
    <tr>
    <TableHead header={headers} on:myOwnEvent={sort} /> 
    </tr>
    <TableRow items={items} />
</table>

<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    tr {
        border: 2px;
    }
</style>
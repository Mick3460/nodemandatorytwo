import { readable, writable } from "svelte/store";
const url = "http://localhost:3000"

export async function allItems() {
    const response = await fetch(url + "/items/"); //$baseURL+
    const itemsData = await response.json();
    return itemsData
}


export const allItemsInStore = writable("all items in here");



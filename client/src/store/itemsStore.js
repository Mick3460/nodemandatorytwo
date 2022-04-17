import { readable, writable } from "svelte/store";
const url = "http://localhost:3000"

export async function allItems() {
    const response = await fetch(url + "/items/"); //$baseURL+
    const itemsData = await response.json();
    return itemsData
}

export async function sendEmailFetch() {
    const response = await fetch(url + "/items/buy"); //$baseURL+
    if (response.status == 204) {
        return 0; //ERROR
    } 
    else if (response.status == 200){
        return 1; //SUCCESS
    }
}

export const allItemsInStore = writable([]);

export const cartList = writable(null)





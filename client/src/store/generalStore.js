//Contains alot of app specific variables.

import { readable, writable } from "svelte/store";

export const baseURL = readable("http://localhost:3000")
const url = "http://localhost:3000"
export async function allUsers() {
    const response = await fetch(url + "/customer/"); //$baseURL+
    const customerData = await response.json();
    return customerData
}

export async function logOutOfSession() {
    const response = await fetch(url + "/customer/logout");
}

export async function fetchOneUser(body) {
    const options = makeOptions("POST",body)
    const response = await fetch(url + "/customer/auth/login",options); //$baseURL+
    //console.log("response: ",response);
    if (response.status == 200) {
        const customerData = await response.json();
        //console.log("customer data in fetchOneUserNEW() ", customerData);
        return customerData
    } else if(response.status ==429) {
        return 429;
    } 
    else {
        //console.log("Not cool, throw error?");
        return null;
    }
}

function makeOptions(method, body) {
    const opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) { //Observe how we can add new fields to an object when needed
        opts.body = JSON.stringify(body);
    }
    return opts;
}

/*
// Example POST method implementation:
export async function aaaaaaaaaaaaaaaaafetchOneUser(data) {
    // Default options are marked with *
    const response = await fetch("http://localhost:3000/customer/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    //console.log("this is the body in fetchOneUser() ", body);
    return response.json(); // parses JSON response into native JavaScript objects
  }
*/

export const users = writable("Update this")
export const sessionKey = writable("Update this")
export const currentUser = writable(null)
export const logInAttempts = writable(0);



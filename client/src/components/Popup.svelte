<script>
    export let customer = "";
    export let message = 'Hi';
    import { useNavigate } from "svelte-navigator";
    import {fetchOneUser,updateCustomer,currentUser,sessionKey} from "../store/generalStore.js"
    

    const navigate = useNavigate();
    let name=customer.name;
    let email=customer.email
    let password=""
    const savedEmail = $currentUser.email;
    
    async function handleSave (){   
        const givenInfo= {name, email: savedEmail, password}
        console.log("given info:",givenInfo);
		const fetchedUserData = await fetchOneUser(givenInfo)
        const fetchedUser = fetchedUserData.data
        const fetchedKey = fetchedUserData.sessionKey
        if (fetchedUserData == null) {
			//NOT CORRECT LOGIN
		} else if (fetchedUserData == 429){
			console.log("Too many tries, come back later");
			navigate("/", { replace: true });
		}
		else {
            // TODO: currentUser update og sessionKey check

            if($sessionKey == fetchedKey){
            const updatedCustomer = {id: fetchedUser.id, name:givenInfo.name ,email: email, password: givenInfo.password,sessionKey: fetchedKey } 
            console.log("updatedCustomer: ",updatedCustomer);
            const savedUser = await updateCustomer(updatedCustomer) 
            $currentUser = updatedCustomer
			//const from = ($location.state && $location.state.from) || "/";
			navigate("/profile", { replace: true });
            }
		}
    }



    //SUBSCRIBE KNAP: https://svelte.dev/tutorial/checkbox-inputs
  </script>
  <h3>Name</h3>
  <input type=text bind:value={name}>
  <h3>Email</h3>
  <input type=text bind:value={email}>
  
  <h4>Verify with password</h4>
  <input bind:value={password}>

  <button on:click|preventDefault={handleSave}>Save changes</button>
  



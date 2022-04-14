<script>
    export let customer = "";
    export let message = 'Hi';

    let name=customer.name;
    let email=customer.email
    let password=""

    async function handleSave (){
        const givenInfo= {email, password}
		const fetchedUserData = await fetchOneUser(givenInfo)
        if (fetchedUserData == null) {
			//NOT CORRECT LOGIN
		} else if (fetchedUserData == 429){
			console.log("Too many tries, come back later");
			navigate("/", { replace: true });
		}
		else {
            // TODO: HER SKAL DU BRUGE DIN UPDATE FUNKTION I CUSTOMER ROUTER
            //const saveUser = gør noget her, din hjerne er stegt.
			const from = ($location.state && $location.state.from) || "/";
			navigate("/profile", { replace: true });
		}
    }



    //SUBSCRIBE KNAP: https://svelte.dev/tutorial/checkbox-inputs
  </script>
  
  <p>🎉 {message} 🍾</p>

  <h3>Name</h3>
  <input type=text bind:value={name}>
  <h3>Email</h3>
  <input type=text bind:value={email}>
  
  <h4>Verify with password</h4>
  <input bind:value={password}>

  <button on:click|preventDefault={handleSave}>Save changes</button>
  <button on:click|preventDefault={handleSave}>Cancel</button>



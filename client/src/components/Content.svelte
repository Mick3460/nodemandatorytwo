<script>
    import { getContext } from 'svelte';
    import Popup from './Popup.svelte';
    export let customer = "";
    const { open } = getContext('simple-modal');
    const editProfile = () => open(Popup, { message: "It's a modal!",customer });
  </script>
  
  <p>
      <button on:click={editProfile}>Edit your profile</button>
  </p>
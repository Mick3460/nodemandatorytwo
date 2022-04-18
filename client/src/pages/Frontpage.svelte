<script>
	import {onMount} from "svelte"
    import {allUsers, currentUser, users,sessionKey} from "../store/generalStore.js"
let username;
let password;


onMount( async () => {
    //TODO: make a function that check if the currentUser is null or not
        const alllUsers = await allUsers()
        console.log("users: ", alllUsers.data[0]);
        $users = JSON.stringify(alllUsers.data[0])
	});

</script>

<main>
    <link href="carousel.css" rel="stylesheet">
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
              <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src="https://www.twi-global.com/image-library/hero/sustainability-istock-473558826.jpg" width="100%" height="100%" alt="Picture">
            <div class="container">
              <div class="carousel-caption text-start">
                <h1>Thinking about buying greener?</h1>
                <p>We care more about the environment than Al Gore</p>
                <p><a class="btn btn-lg btn-primary" href="/login">Sign up today</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
              <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src="https://i.ytimg.com/vi/zx04Kl8y4dE/maxresdefault.jpg" width="100%" height="100%" alt="Picture">
            
            <div class="container">
              <div class="carousel-caption">
                <h1>Read all about how neat we are</h1>
                <p>If you read up on our core values, you would definitely buy our stuff</p>
                <p><a class="btn btn-lg btn-primary" href="/about">About us</a></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src="data:image/jpeg;base64,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" width="100%" height="100%" alt="Picture">
            <div class="container">
              <div class="carousel-caption text-end">
                <h1>Interested in spending money?</h1>
                <p>Witness some of the greatess pieces of clothing ever to be created</p>
                <p><a class="btn btn-lg btn-primary" href="/items">Browse items</a></p>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
</main>

<style>
    h1{
        color: orangered;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

    }
    p{
        color: orangered;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

    }
</style>
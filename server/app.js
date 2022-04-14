import express from "express";
const app = express();
import dotenv from "dotenv"
dotenv.config();

app.use(express.json()); // Forudser at vi får brug for at kunne læse JSON fra vores database, da de kommer tilbage som json objekter.

//part of Node.js core, so no need for an install.
import path from "path";
app.use(express.static(path.resolve("../client/public"))) 
/*den her server svelte mappen, så den kan findes på samme port som Node
You can get the absolute path calculation of a relative path using path.resolve()
*/
//You could have this import within a function to save memory on load 
//npm install express-rate-limit
import rateLimit from 'express-rate-limit'
const baseLimiter = rateLimit({ // Create an instance of IP rate-limiting middleware for Express.
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const authLimiter = rateLimit({ // Create an instance of IP rate-limiting middleware for Express.
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(baseLimiter); //the base limiter should be ABOVE our auth limiter.
//REMEMBER TO ALWAYS HAVE THE BASE LIMITER ON THE TOP.
app.use("customer/auth/*", authLimiter);

// #################
//  SESSION ON BACKEND SERVERS
// ################# https://www.npmjs.com/package/express-session for explanation about resave and
import session from 'express-session';
app.use(session({
    secret: 'keyboardCat', //process.env.SESSION_SECRET
    resave: false, //Forces the session to be saved back to the session store, even if the session was never modified during the request. 
    saveUninitialized: true, //Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. 
    cookie: { secure: false } //secure true only works if the server is https. This aint it chief.
  }))


//customers router
import customerRouter from "./routers/customerRouter.js"
app.use(customerRouter);
//customers router
import itemsRouter from "./routers/itemsRouter.js"
app.use(itemsRouter);






//wildcard route
/*The order of the routes are important. 
If the wildcard is in the top, our next() functions will hit that before any other routes,
as it is the first valid route to hit. (I think lol)
app.get("*", (req,res) => {
    res.send("<h1>Not found 404 lol</h1>")
})

*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on PORT: ",PORT)
})




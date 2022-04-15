import { Router } from "express";
/**
 * import dotenv from "dotenv"
dotenv.config();
 */

import {selectAllFunction, getUserById,insertIntoMySql, deleteCustomer, 
    updateCustomer, getUserByEmailAndPassword} from "../database/SQLqueries.js";


const customerRouter = Router();

customerRouter.get("/customer/logout/",async (req,res) => {
    req.session.destroy( () => console.log("session DESTROYED"))
})

//Gets all customers, sends the first user
customerRouter.get("/customer/", async (req,res) => {
    const selectAll = await selectAllFunction();
    console.log(req.session.loggedInUser);
    if (selectAll){
        res.send( { data: selectAll})
    }
    else {
        res.send( { data: "yayeet"} )
    }
    
})
//..
//GET SPECIFIC CUSTOMER by ID
customerRouter.get("/customer/:customerId", async (req,res) => {
    const id = req.params.customerId
    const selectedCustomer = await getUserById(id);
    console.log("Selected Customer: " , selectedCustomer);

    if (selectedCustomer){
        res.send({data: selectedCustomer[0]});
    }
    else {
        res.send( { data: "yayeet"} )
    }
})


//POST customers
customerRouter.post("/customer", async (req,res) => {
    const newCustomer = req.body;
    const resultSetHeader = await insertIntoMySql(newCustomer);
    if (resultSetHeader.affectedRows>0){
        newCustomer.id =resultSetHeader.insertId;
        res.send({data:newCustomer})
    } else {
        res.status(204).send({})
    }
})

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

customerRouter.use(baseLimiter); //the base limiter should be ABOVE our auth limiter.
//REMEMBER TO ALWAYS HAVE THE BASE LIMITER ON THE TOP.
//customerRouter.use("customer/auth/login", authLimiter); //VIRKER IKKE?????


//LOG IN 
//POST /GET SPECIFIC CUSTOMER, name and email/password? POST for security... authLimiter,
//TODO: APPLY authLimiter
customerRouter.post("/customer/auth/login", authLimiter,  async (req,res) => {
    const newCustomer = req.body;
    console.log("LOG IN ROUTER",newCustomer);
    const selectedCustomer = await getUserByEmailAndPassword(newCustomer);
    if (selectedCustomer){
        //console.log("selected:" ,selectedCustomer[0]);
        req.session.loggedInUser = selectedCustomer[0];
        console.log("CUSTOMER ROUTER PRINTS, AUTH LOGIN");
        console.log("sessionID : ",req.sessionID);
        console.log("loggedInUser session:",req.session.loggedInUser);
        res.send({data: selectedCustomer[0], sessionKey: req.sessionID}) //sending the object instead of array
    } else {
        //console.log("INGEN CUSTOMER");
        res.status(204).send(null)
    }
})

//TODO: ADD AUTH LIMITER
//UPDATE CUSTOMER
customerRouter.put("/customer/:customerId", authLimiter, async (req,res) => {
    const idToUpdate = Number(req.params.customerId);
    const keySent = req.body.sessionKey
    const newCustomerInfo = {id: idToUpdate, email: req.body.email, name: req.body.name, password: req.body.password}
    
    //const selectedCustomer = await getUserById(idToUpdate)  dont need actually?
    
    console.log("ROUTER: customer id from req: ", idToUpdate);
    console.log("ROUTER: key sent: ",keySent);
    console.log("ROUTER: newInfoToSave:",newCustomerInfo);
    console.log("key on node:",req.sessionID);
    if (req.sessionID == keySent){
        console.log("ROUTER UPDATE, keys match");
        const updatedCustomer = updateCustomer(newCustomerInfo)
        res.send({data: updatedCustomer})
    } else {
        res.status(404).send({data: "Id not found"})
    }
})

//DELETE Customer
customerRouter.delete("/customer/:customerId", async (req,res) => {
    const idToDelete = req.params.customerId;
    const resultSetHeader = await deleteCustomer(idToDelete);
    if (resultSetHeader.affectedRows >0){
        res.send({data: "Successfully deleted!"})
    } else {
        res.status(404).send({data: "Couldn't find id"})
    }

})



export default customerRouter;
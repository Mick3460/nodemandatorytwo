import { Router } from "express";
/**
 * import dotenv from "dotenv"
dotenv.config();
 */

import {selectAllFunction, getUserById,insertIntoMySql, deleteCustomer, 
    updateCustomer, getUserByNameAndEmail} from "../database/SQLqueries.js";


const customerRouter = Router();

customerRouter.get("/customer/logout/",async (req,res) => {
    req.session.destroy( () => console.log("session"))
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
customerRouter.post("/customer/auth/login", authLimiter, async (req,res) => {
    const newCustomer = req.body;
    const selectedCustomer = await getUserByNameAndEmail(newCustomer);
    if (selectedCustomer[0]){
        //console.log("selected:" ,selectedCustomer[0]);
        req.session.loggedInUser = selectedCustomer[0];
        console.log("sessionID : ",req.sessionID);
        console.log("loggedInUser session:",req.session.loggedInUser);
        res.send({data: selectedCustomer[0]}) //sending the object instead of array
    } else {
        //console.log("INGEN CUSTOMER");
        res.status(204).send(null)
    }
})

//UPDATE CUSTOMER
customerRouter.put("/customer/:customerId", async (req,res) => {
    const idToUpdate = Number(req.params.customerId);
    const newCustomerInfo = req.body
    const selectedCustomer = await getUserById(idToUpdate)
    
    console.log("id to update: ",idToUpdate);
    console.log("selected customer: ",selectedCustomer);

    if (selectedCustomer.id !== null){
        const updatedCustomer = {...selectedCustomer[0], ...newCustomerInfo, id: idToUpdate}
        updateCustomer(updatedCustomer)
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
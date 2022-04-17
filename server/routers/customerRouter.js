import { Router } from "express";

import dotenv from "dotenv"
dotenv.config();
 

import {selectAllFunction, getUserById,insertIntoMySql, deleteCustomer, 
    updateCustomer, getUserByEmailAndPassword, getUserByEmail} from "../database/SQLqueries.js";
    
import { sendEmail } from "../nodemailer.js";

const customerRouter = Router();

customerRouter.get("/customer/logout/",async (req,res) => {
    req.session.destroy( () => console.log("session DESTROYED"))
})

//Gets all customers, sends the first user
customerRouter.get("/customer/", async (req,res) => {
    const selectAll = await selectAllFunction();
    if (selectAll){
        res.send( { data: selectAll})
    }
    else {
        res.send( {} )
    }
    
})
//..
//GET SPECIFIC CUSTOMER by ID
customerRouter.get("/customer/:customerId", async (req,res) => {
    const id = req.params.customerId
    const selectedCustomer = await getUserById(id);
    if (selectedCustomer){
        res.send({data: selectedCustomer[0]});
    }
    else {
        res.send( {} )
    }
})

//Fetch with Email
customerRouter.get("/customer/email/:email", async (req,res) => {
    const customer = await getUserByEmail(req.params.email);
    if (customer.length === 1){ //match in db
        res.status(200).send({data: "Email used"})
    } else {
        res.status(204).send({data: undefined})
    }
})
  
//POST customers INSERT INTO + send email
customerRouter.post("/customer", async (req,res) => {
    const newCustomer = req.body;
    const resultSetHeader = await insertIntoMySql(newCustomer);

    if (resultSetHeader.rows.affectedRows>0){
        newCustomer.id =resultSetHeader.insertId;
        newCustomer.signUpPassword = resultSetHeader.hashedPassword
        sendEmail(newCustomer.signUpEmail)
        res.status(200).send({data:newCustomer, sessionID: req.sessionID})
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

//LOG IN AUTH
//POST /GET SPECIFIC CUSTOMER, name and email/password? POST for security... authLimiter,
customerRouter.post("/customer/auth/login", authLimiter,  async (req,res) => {
    const newCustomer = req.body;
    const selectedCustomer = await getUserByEmailAndPassword(newCustomer);
    if (selectedCustomer){
        req.session.loggedInUser = selectedCustomer[0];
        res.send({data: selectedCustomer[0], sessionKey: req.sessionID}) //sending the object instead of array
    } else {
        res.status(204).send(null)
    }
})

//UPDATE CUSTOMER
customerRouter.put("/customer/:customerId", authLimiter, async (req,res) => {
    const idToUpdate = Number(req.params.customerId);
    const keySent = req.body.sessionKey
    const newCustomerInfo = {id: idToUpdate, email: req.body.email, name: req.body.name, password: req.body.password}

    if (req.sessionID == keySent){
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
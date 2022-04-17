import { Router } from "express";
import { selectAllItems, getItemById, insertItemIntoMySql} from "../database/itemsSQLqueries.js"
import { sendEmail } from "../nodemailer.js";
const itemRouter = Router();

itemRouter.get("/items/", async (req,res) => {
    const selectAll = await selectAllItems();
    if(selectAll){ //selectAll.ok ??
        res.send({data: selectAll})
    } else {
        res.status(404).send({})
    }

})

//TODO: change the email
itemRouter.get("/items/buy", async (req,res) => {
    const response = sendEmail("mich8g56@stud.kea.dk","Thank you for your purchase!","Thank you for your purchase smileeee :)")
    if(response === 0) { //error occured
        res.status(204).send({});
    } else if (response ===1){ //email sent
        res.status(200).send({})
    }
})

export default itemRouter;


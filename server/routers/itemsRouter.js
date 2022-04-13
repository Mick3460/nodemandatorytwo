import { Router } from "express";
import { selectAllItems, getItemById, insertItemIntoMySql} from "../database/itemsSQLqueries.js"

const itemRouter = Router();

itemRouter.get("/items/", async (req,res) => {
    const selectAll = await selectAllItems();
    console.log("selectAllItems in router:", selectAll);
    if(selectAll){ //selectAll.ok ??
        res.send({data: selectAll})
    } else {
        res.status(404).send({})
    }

})



export default itemRouter;


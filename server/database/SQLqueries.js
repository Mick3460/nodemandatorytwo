import db from "./createMySQLConnection.js";
import bcrypt from 'bcrypt'
const saltRounds = 12;

export const selectAllFunction = async () => {
    const [rows, fields] = await db.execute('SELECT * FROM `customers`;');
    return rows;
}
export const getUserById =  async (id) =>  {
    const [rows, fields] = await db.execute('SELECT * FROM `customers` WHERE `id` = ?',[id])
    return rows;
}

export const getUserByEmail =  async (email) =>  {
    const [rows, fields] = await db.execute('SELECT * FROM `customers` WHERE `email` = ?',[email])
    return rows;
}
export const getUserByEmailAndPassword =  async (customerObj) =>  {

    //check if email is in DB
    const checkUser = await getUserByEmail(customerObj.email);
    if (checkUser[0] != null){ //!== doesnt work?
        const isSame = await bcrypt.compare(customerObj.password, checkUser[0].password )
        if(isSame) {
            const [rows, fields] = await db.execute('SELECT * FROM `customers` WHERE `email` = ? AND `password` = ?' ,[customerObj.email, checkUser[0].password])
            return rows;
        } else return null;
    } else return null;

}

export const insertIntoMySql = async (customerObj) => {
    const hashedPassword = await bcrypt.hash(customerObj.signUpPassword,saltRounds)
    const [rows, fields] = await db.execute(`INSERT INTO customers (name,email,password) VALUES (?,?,?) ;`,[customerObj.signUpName, customerObj.signUpEmail,hashedPassword]);
    const returnObj = {rows,hashedPassword}
    return returnObj;
}

export const updateCustomer = async (customerObj) => {
    const [rows,fields] = await db.execute(`UPDATE customers SET name = ?, email = ? WHERE id = ?`,[customerObj.name,customerObj.email,customerObj.id])
}
export const deleteCustomer = async (id) => {
    const [rows, fields] = await db.execute(`DELETE FROM customers WHERE id = ?`,[id])
    return rows;
}

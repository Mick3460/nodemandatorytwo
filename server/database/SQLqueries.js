import db from "./createMySQLConnection.js";

export const selectAllFunction = async () => {
    const [rows, fields] = await db.execute('SELECT * FROM `customers`;');
    return rows;
}
export const getUserById =  async (id) =>  {
    const [rows, fields] = await db.execute('SELECT * FROM `customers` WHERE `id` = ?',[id])
    return rows;
}
export const getUserByNameAndEmail =  async (customerObj) =>  {
    const [rows, fields] = await db.execute('SELECT * FROM `customers` WHERE `name` = ? AND `email` = ?' ,[customerObj.name, customerObj.email])
    return rows;
}

export const insertIntoMySql = async (customerObj) => {
    const [rows, fields] = await db.execute(`INSERT INTO customers (name,email) VALUES (?,?) ;`,[customerObj.name, customerObj.email]);
    return rows;
}

export const updateCustomer = async (customerObj) => {
    const [rows,fields] = await db.execute(`UPDATE customers SET name = ?, email = ? WHERE id = ?`,[customerObj.name,customerObj.email,customerObj.id])
}
export const deleteCustomer = async (id) => {
    const [rows, fields] = await db.execute(`DELETE FROM customers WHERE id = ?`,[id])
    return rows;
}


/**
 * ######################################################
 * ######################################################
 * ###################################################### 
 */


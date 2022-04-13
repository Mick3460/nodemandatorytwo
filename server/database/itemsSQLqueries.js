import db from "./createMySQLConnection.js";

export const selectAllItems = async () => {
   //const [rows, fields] = await db.execute('SELECT * FROM `items`;');
   //return rows;
   return [{name:"pantsOne", price:1200, size_s:10, size_m:9, size_l:3},
   {name:"pantsTwo", price:100, size_s:14, size_m:3, size_l:1},
   {name:"pantsThree", price:900, size_s:4, size_m:4, size_l:2},
   {name:"pantsFour", price:700, size_s:3, size_m:5, size_l:4},
   ]
}

export const getItemById =  async (id) =>  {
   const [rows, fields] = await db.execute('SELECT * FROM `items` WHERE `id` = ?',[id])
   return rows;
}
export const insertItemIntoMySql = async (customerObj) => {
   const [rows, fields] = await db.execute(`INSERT INTO items (name, price, size_s, size_m, size_l) VALUES (?,?,?,?,?) ;`
   ,[customerObj.name, customerObj.price, customerObj.size_s, customerObj.size_m, customerObj.size_l, ]);
   return rows;
}
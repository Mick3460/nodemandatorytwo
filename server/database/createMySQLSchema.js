import db from "./createMySQLConnection.js"

const query = db.query(`
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(70),
    email VARCHAR(50)
);
`);


//db.end(); //ends the script so it stops "hanging".

export default query;
import db from "./createMySQLConnection.js"

const drop = db.query(`DROP TABLE IF EXISTS customers;`);

const query = db.query(`
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(70),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
);
`);

const seed = db.query(`INSERT INTO customers (name,email,password) VALUES ('Michael','min@email.dk','$2b$12$lk4fyI14Z6cfYmx17/yYyORCDS53ZiMHMV86k2MIborgv26rR0rdu') ;`)

db.end(); //ends the script so it stops "hanging".

export default query;
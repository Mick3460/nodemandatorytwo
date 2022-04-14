//we should use routers instead of just files, but we are practising.


import bcrypt from 'bcrypt'

const saltRounds = 12;
const plaintextPassword = "lol" //dont do this IRL... 
const hashedPassword = "$2b$12$lk4fyI14Z6cfYmx17/yYyORCDS53ZiMHMV86k2MIborgv26rR0rdu" //example, dont do this


//async because the compare function takes time   

const isSame = await bcrypt.compare(plaintextPassword,hashedPassword)
console.log("is it the same?: ",isSame) //^This function is case-sensitive btw.

const resultingHashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
console.log("hashed: ",resultingHashedPassword);

/*
//async because the compare function takes time   
async function loginRouter() {
    const isSame = await bcrypt.compare(plaintextPassword,hashedPassword)
    console.log(isSame) //^This function is case-sensitive btw.
}

async function signupRouter() {
    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
    console.log(hashedPassword);
}


signupRouter();
loginRouter();

*/



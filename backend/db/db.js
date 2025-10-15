const mongoose = require('mongoose');
require('dotenv').config(); 

const connectToDB = async () => {
    try {

        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Successfully connected to DB ✅');
    } catch (error) {
 
        console.error('Could not connect to DB ❌:', error.message);
    }
};


module.exports=connectToDB;
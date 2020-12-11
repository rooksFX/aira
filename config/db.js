const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = 'mongodb+srv://airaUser:aira123!@rfx.uujvx.mongodb.net/aira?retryWrites=true&w=majority';
        const conn = await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongdoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    }
    catch (err) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
}


module.exports = connectDB;
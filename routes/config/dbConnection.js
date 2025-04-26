const mongoose = require('mongoose');

const connectDb = async () => {
    try{
const conn = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch (error) {
        console.error(error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDb;
//CONNECTION_STRING=mongodb+srv://asefaeyob962:E9g1NuThHCRD45TE@cluster0.hfvlwqq.mongodb.net/mycontacts-backend?retryWrites=true&w=majority&appName=Cluster0

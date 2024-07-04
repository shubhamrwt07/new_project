const mongoose= require('mongoose');


const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
MONGO_URI=process.env.MONGO_URI
// process.env.MONGO_URI//
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, connectionParams)
    .then(() => {
        console.log('Connected to the database...!');
        // initial();
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db.js')

app.use(express.json());

//Connecting to Mongo Atlas
const url = 'mongodb+srv://admin:admin@portfolio-cluster.df4iy0u.mongodb.net/?retryWrites=true&w=majority'
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        //Connection message
        console.log('Connected to the Mongoose Atlas Cluster database... ')
        //Server running
        const PORT = 3001
        app.listen(PORT, () => {
            console.log('Server is running on', PORT)
        })

       
    })
    //Catch method
    .catch( (err) => {
        console.error(`Error connecting to the database...\nError: ${err}`);
    })
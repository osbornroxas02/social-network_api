const express = require('express');
const mongoose = require('mongoose');
const { Db } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// connect to if the environment variable MONGODB_URI exists, otherwise short-circuit to the local MongoDB server's database 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`🌍 Connected on localhost:${PORT}`)
});
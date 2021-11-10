const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gmdfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected')
    }
    finally {

    }
}

run().catch(console.dir);

// console.log(uri);

app.get('/', (req, res) => {
    res.send('Click flick server is working!')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
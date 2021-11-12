const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gmdfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('click_flick');
        const productsCollection = database.collection('products');
        console.log('hitting database');

        // fetch products data from server
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products)
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

// console.log(uri);

app.get('/', (req, res) => {
    res.send('Click flick server is working!')
})

app.get('/hi', (req, res) => {
    res.send('lalalala');
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
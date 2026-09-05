const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config()
const port = 3000;




const client = new MongoClient(process.env.DB_URI);

 async function connectToMongoDB() {
  try {
    await client.connect();

    
    const db = client.db("e-commerce");
    const productsCollection = db.collection("products");

    app.get('/products', async(req, res)=>{
      const cursor = await productsCollection.find()
      const result = await cursor.toArray();
      res.send(result)
    })


    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB();








app.get('/', (req, res) => {
  res.send('Hello World!. I am practicing CRUD');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
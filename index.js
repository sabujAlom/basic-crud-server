const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()
const port = 3000;




const client = new MongoClient(process.env.DB_URI);

 async function connectToMongoDB() {
  try {
    await client.connect();

    
    const db = client.db("e-commerce");
    const productsCollection = db.collection("products")

    app.get('/products', async(req, res)=>{
      const result =await productsCollection.find().toArray();
      res.send(result)

    })

    app.get('/products/:productId', async(req, res)=>{
      const productId = req.params.productId;
      const query = {_id:new ObjectId(productId)}
       const result =await productsCollection.findOne(query)
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
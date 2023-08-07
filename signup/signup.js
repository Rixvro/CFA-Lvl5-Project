const express = require("express");
const cors = require("cors");
const PORT = 5500;
require('dotenv').config()
const envDb = `${process.env.dbName}`
const envCollection = `${process.env.dbCollectionName}`

const app = express();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.dbUserName}:${process.env.dbUserPass}@${process.env.dbClusterName}.${process.env.dbMongoId}.mongodb.net/${process.env.envDb}?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

    app.route("/signup")
      .put(async (req, res) => {
      const formData = req.body;
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db(envDb).command({ ping: 1 });
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
          );
          const collection = client.db(envDb).collection(envCollection);
          const result = await collection.find({email: req.body.email}).toArray();

          if (result.length === 0){
            await collection.insertOne(formData);
          } else{
            throw new Error("Account already exists!");
          }
          
          res.status(200).json({message: "Completed!"});

        } catch (e) {
          console.dir(e);
          res.status(500).json({message: `${e}`});
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })


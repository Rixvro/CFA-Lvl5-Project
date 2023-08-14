const express = require("express");
const cors = require("cors");
const PORT = 3000;
require('dotenv').config()
const envDb = `${process.env.dbName}`
const envCollection = `${process.env.dbCollectionName}`
require('./MongoDBToJSON') /// Updates the list from mongo db
const app = express();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const { error } = require("console");
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
            await collection.insertOne(formData).then(res.status(200).json({message: "Completed!"}));
          } else if (result.length !== 0){
            res.status(412).json({message: "Account already exists!"})
          } else{
            throw error;
          }

        } catch (e) {
          console.dir(e);
          res.status(500).json({message: `${e}`});
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      });

      app.route("/signin")
      .put(async (req, res) => {
      const formData = req.body;

      console.log(formData);
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db(envDb).command({ ping: 1 });
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
          );
          const collection = client.db(envDb).collection(envCollection);
          const result = await collection.find({
            email: formData.email,
            password: formData.password
          }).toArray();

          console.log(result);
          console.log(result[0].email);
          console.log(result[0].password);


          if (result[0].email === formData.email || result[0].password === formData.password){
            res.status(200).json({message: "Success!"});
          } else{
            throw new Error('Incorrect login info!');
          }


        } catch (e) {
          console.dir(e);
          res.status(500).json({message: `${e}`});
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      });

      app.route("/account/fName")
  .put(async (req, res) => {
    const request = req.body
    try {
      await client.connect();
      await client.db(envDb).command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      const collection = client.db(envDb).collection(envCollection);
      const result = await collection.findOneAndUpdate({
        email: localStorage.getItem('email')
      }, {
        fName: request.fName
      }, { new: true });
      console.log(result)
      res.status(200).json({ message: "Completed!" })
    } catch (e) {
      console.dir(e)
    } finally {
      await client.close();
    }
  })
app.route("/account")
  .get(async (req, res) => {
    try {
      await client.connect();
      await client.db(envDb).command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      const collection = client.db(envDb).collection(envCollection);
      const result = await collection.find({
        email: localStorage.getItem('email')
        //  localStorage.getItem('email')
      }).toArray();
      res.json(result[0])
    } catch (e) {
      console.dir(e)
    } finally {
      await client.close();
    }
  })


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })



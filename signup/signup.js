const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("card-form");
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const emailInput = document.getElementById("email-input").value;
//     const passwordInput = document.getElementById("password-input").value;

//     console.log(emailInput);
//     console.log(passwordInput);
// });

    app.route("/signup").post(async (req, res) => {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("CFA-Project-EthicalClothing").command({ ping: 1 });
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
        );

        const collection = client.db("CFA-Project-EthicalClothing").collection("user credentials");

        res.sendStatus(200);

      } catch (e) {
        console.dir(e);
        res.status(500).send("Error");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    });


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })


const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const mongodbinfo = require("./mongodb.json");
const password = mongodbinfo.password;
const app = express();
const PORT = 3000;

const uri =
  "mongodb+srv://cfastudentuser:" +
  password +
  "@cluster0.zn2ajed.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());

async function fetchItemsFromMongoDB() {
  let client; // Define the client variable here
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const collection = client.db("items").collection("itemdata");
    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
}

async function saveItemsToJSONFile(items) {
  try {
    const data = JSON.stringify({ items }, null, 2);
    fs.writeFileSync('items.json', data, 'utf8');
    console.log('Items have been written to items.json');
  } catch (error) {
    console.error('Error saving items to items.json:', error);
  }
}

async function updateMongoDBWithJSONData() {
  try {
    const data = fs.readFileSync('items.json', 'utf8');
    const jsonData = JSON.parse(data);
    const items = jsonData.items;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const collection = client.db("items").collection("itemdata");
    await collection.deleteMany({}); // Clear the existing data
    await collection.insertMany(items); // Insert new data
    client.close();
    console.log('MongoDB has been updated with data from items.json');
  } catch (error) {
    console.error('Error updating MongoDB with data from items.json:', error);
  }
}

async function startServer() {
  try {
    // Update MongoDB with data from items.json
    await updateMongoDBWithJSONData();

    // Fetch the items from MongoDB
    const items = await fetchItemsFromMongoDB();

    // Save items to items.json
    saveItemsToJSONFile(items);

    // Route to send the items data as JSON
    app.get('/items', (req, res) => {
      res.json(items);
    });

    // Start listening on the specified port
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}


// Start the server after fetching the items
startServer();

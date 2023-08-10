const { MongoClient, ServerApiVersion } = require('mongodb');
const mongodbinfo = require("./mongodb.json");
const password = mongodbinfo.password;
const fs = require('fs');

const uri = 
  `mongodb+srv://cfastudentuser:dr0WeyzUlmGpfSnM@cluster0.j3uu4xc.mongodb.net/?retryWrites=true&w=majority`;

async function fetchItemsFromMongoDB() {
  let client;
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const collection = client.db("EthicalClothing-Proj").collection("clothing-info");
    const query = {};
    const cursor = collection.find(query);
    
    const items = [];

    await cursor.forEach(item => {
      items.push(item);
    });

    // Update items.json with the fetched items, overwriting old data
    const data = JSON.stringify({ items }, null, 2);
    fs.writeFileSync('items.json', data, 'utf8');
    console.log('Items have been updated in items.json');
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.close();
    }
  }
}

// Fetch items and update items.json
fetchItemsFromMongoDB().catch(error => {
  console.error("Error:", error);
});

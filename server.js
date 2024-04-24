const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 3000;

const uri =
  "mongodb+srv://ankurDev:hjBCCkfkXQNPq8Uq@ankurapi.vpwxcu4.mongodb.net/ankurApi?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// POST route to write data to MongoDB
app.post("/data", async (req, res) => {
  const newData = req.body;
  const db = client.db("ankurApi");
  const collection = db.collection("data");

  try {
    await collection.insertOne(newData);
    console.log("Data saved to MongoDB successfully:", newData);
    res.status(201).send("Data saved to MongoDB successfully.");
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// GET route to read data from MongoDB
app.get("/data", async (req, res) => {
  const db = client.db("ankurApi");
  const collection = db.collection("data");

  try {
    const allData = await collection.find().toArray();
    res.json(allData);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).send("Internal Server Error.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

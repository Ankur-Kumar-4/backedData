const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoose = require("mongoose");
uri =
  "mongodb+srv://kumarankur20047:gbo2obmTnDeQgqrJ@cluster0.vcn3u4f.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;

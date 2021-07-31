"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async (dbName) => {
  console.log(MONGO_URI);
  const client = new MongoClient(MONGO_URI, options);
  // creates a new client
  try {
    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");
    await db.collection("Users").insertOne({ name: "Hello Rogers 2" });

    // close the connection to the database server
    client.close();
  } catch (err) {
    console.log("********", err);
  }
  console.log("disconnected!");
  client.close();
};
dbFunction("SoCine");

module.exports = { dbFunction };

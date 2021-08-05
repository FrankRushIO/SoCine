"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const assert = require("assert");
const dbName = "SoCine";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// MongoDB handlers
const createUser = async (req, res) => {
  const dbName = "SoCine";
  console.log(MONGO_URI);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("connected!");
    const result = await db.collection("Users").insertOne(req.body);
    assert.equal(true, result.acknowledged);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getUserByEmail = async (req, res) => {
  const dbName = "SoCine";
  const client = new MongoClient(MONGO_URI, options);

  const email = req.params.email;
  console.log(email);
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("connected!");

    const result = await db.collection("Users").findOne({ email: email });
    console.log(result);
    result
      ? res.status(200).json({ status: 200, email, data: result })
      : res.status(404).json({ status: 404, email, data: "Not Found" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 400, message: "nope" });
  }
  client.close();
  console.log("disconnected!");
};

const getUserById = async (req, res) => {
  const dbName = "SoCine";
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;

  try {
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(dbName);
    console.log("connected!");

    const result = await db.collection("Users").updateOne({ id });
    console.log("result", result);
    result
      ? res.status(200).json({ status: 200, id, data: result })
      : res.status(404).json({ status: 404, id, data: "Not Found" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "Error" });
  }
  client.close();
  console.log("disconnected!");
};

const getUsers = async (req, res) => {
  const dbName = "SoCine";
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("connected");
    const result = await db.collection("Users").find({}).toArray();
    client.close();
    console.log(`disconnected from ${dbName}`);
    assert.equal(true, result.length !== 0);
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const updateLikedMovies = async (req, res) => {
  const dbName = "SoCine";
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;
  console.log("id:", id);
  console.log(req.body);

  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("connected");
    if (req.body.type === "like") {
      await db
        .collection("Users")
        .updateOne(
          { _id: id },
          { $addToSet: { likedMovies: req.body.searchInput } }
        );
    } else {
      await db
        .collection("Users")
        .updateOne(
          { _id: id },
          { $pull: { likedMovies: req.body.searchInput } }
        );
    }

    client.close();
    console.log(`disconnected from ${dbName}`);
    res.status(200).json({
      status: 200,
      message: "change made",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateLikedMovies,
};

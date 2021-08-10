"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
  updateLikedMovies,
  getUserByPseudo,
  getAllFaqs,
  updateFollowing,
} = require("./handlers/mongoHandlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .post("/createUser", createUser)
  .get("/profile/users/:email", getUserByEmail)
  .get("/user/:id", getUserById)
  .get("/users", getUsers)
  .patch("/user/:id", updateLikedMovies)
  .get("/pseudo/:pseudo", getUserByPseudo)
  .get("/faqs", getAllFaqs)
  .patch("/following/:id", updateFollowing)
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

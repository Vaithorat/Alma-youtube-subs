const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const subscriberModel = require("./models/subscribers");

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello. This project is made by Vaibhav Thorat");
});

// sending GET request
app.get("/subscribers", async (req, res) => {
  try {
    // get all the subscribers from the database and exclude the __v field
    const subscribers = await subscriberModel.find().select("-__v");
    // return the subscribers to the client with a status code of 200
    res.status(200).json(subscribers);
  } catch (err) {
    // if there is an error, return a 500 status code with an error message
    res.status(500).json({ error: "database invalid" });
  }
});

//sending GET request
app.get("/subscribers/:id", async (req, res) => {
  // check if the id in the request params is a valid ObjectId
  if (ObjectId.isValid(req.params.id)) {
    // get the subscriber with the given id from the database
    const subscribers = await subscriberModel
      .findOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        // return the subscriber to the client with a status code of 200
        res.status(200).json(result);
      })
      .catch((err) => {
        // if there is an error, return a 500 status code with an error message
        res.status(500).json({
          error: `Error in fetching data with id ${ObjectId(req.params.id)}`,
        });
      });
  } else {
    // if the id is not a valid ObjectId, return a 500 status code with an error message
    res.status(500).json({ error: "invalid id" });
  }
});
module.exports = app;

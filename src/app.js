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
    // return the subscribers with a status code of 200
    res.status(200).json(subscribers);
  } catch (err) {
    //incase of an error, return a status code of 500 with the following message
    res.status(500).json({ error: "database invalid" });
  }
});

//Sending POST request
app.post("/subscribers", async (req, res) => {
  //body to add details about the subscriber
  const body = req.body;
  //create a new subscriber and add it to database
  const subscriber = await subscriberModel
    .create(body)
    .then((result) => {
      //return the new result with status code of 200
      res.status(200).json(result);
    })
    .catch((err) => {
      //incase of an error, return a status code of 500 with the following message
      res.status(500).json({ error: "Cannot add the element" });
    });
});
//sending GET request
app.get("/subscribers/:id", async (req, res) => {
  // check if the id is a valid ObjectId
  if (ObjectId.isValid(req.params.id)) {
    // get the subscriber with the given id from the database
    const subscribers = await subscriberModel
      .findOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        // return the subscriber to the client with a status code of 200
        res.status(200).json(result);
      })
      .catch((err) => {
        //incase of an error, return a status code of 500 with the following message
        res.status(500).json({
          error: `Error in fetching data with id ${ObjectId(req.params.id)}`,
        });
      });
  } else {
    // if the id is not a valid ObjectId, return a  status code of 500 with an error message
    res.status(500).json({ error: "invalid id" });
  }
});

//sending DELETE request
app.delete("/subscribers/:id", async (req, res) => {
  // check if the id in the request params is a valid ObjectId
  if (ObjectId.isValid(req.params.id)) {
    // delete the subscriber with the given id from the database
    const subscribers = await subscriberModel
      .find()
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        // return the result of the delete operation to the client with a status code of 200
        res.status(200).json(result);
      })
      .catch((err) => {
        //incase of an error, return a status code of 500 with the following message
        res.status(500).json({ error: "Error in deleting" });
      });
  } else {
    // if the id is not a valid ObjectId, return a  status code of 500 with an error message
    res.status(500).json({ error: "invalid id" });
  }
});

app.patch("/subscribers/:id", async (req, res) => {
  // check if the id in the request params is a valid ObjectId
  if (ObjectId.isValid(req.params.id)) {
    // update the subscriber with the given id in the database with the request body and return the updated document
    const subscribers = await subscriberModel
      .find()
      .updateOne({ _id: ObjectId(req.params.id) }, req.body, { new: true })
      .then((subscriber) => {
        // return the updated subscriber document to the client with a status code of 200
        res.status(200).json(subscriber);
      })
      .catch((err) => {
        //incase of an error, return a status code of 500 with the following message
        res.status(500).json({ error: "Invalid request" });
      });
  } else {
    // if the id is not a valid ObjectId, return a  status code of 500 with an error message
    res.status(500).json({ error: "Invalid id" });
  }
});
module.exports = app;

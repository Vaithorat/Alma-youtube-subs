const express = require("express");
const { ObjectId } = require("mongodb");
const subscriberModel = require("./models/subscribers");
const app = express();
app.use(express.json());

const subscriberRoutes = require('./subscriberRoutes');
require('./databaseConnection');

app.use('/', subscriberRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


module.exports = app;

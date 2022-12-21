const express = require("express");
const routes = require("./src/app");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
app.use(routes);
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Connect to DATABASE
const DATABASE_URL =
  "mongodb+srv://vaibhav:vaibhav141997@cluster0.4wefkqc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));

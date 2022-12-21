const mongoose = require('mongoose');
const uri = "mongodb+srv://vaibhav:vaibhav141997@almabetter.qolyqo7.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

db.once('open', () => {
  console.log('Connected to database');
  // perform actions on the collection object
  mongoose.disconnect();
});

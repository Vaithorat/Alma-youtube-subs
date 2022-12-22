const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vaibhav:vaibhav@cluster0.4wefkqc.mongodb.net/databaseName?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const mongoose = require('mongoose');
// const subscriberModel = require('./models/subscriber');
// const data = require('./data');

mongoose.connect('mongodb+srv://vaibhav:vaibhav@cluster0.4wefkqc.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

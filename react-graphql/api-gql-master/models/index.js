const mongoose = require('mongoose');

module.exports.connect = () => {
  mongoose.connect('mongodb://localhost/hotel-management', { useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  mongoose.connection.on('error', err => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./Hotel');
  require('./BookHotel');
};

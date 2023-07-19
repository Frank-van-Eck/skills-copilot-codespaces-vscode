// Create web server
// 1. Create a web server
// 2. Connect to database
// 3. Create routes
// 4. Listen to the port

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings'),
      imageUploadRoutes = require('./routes/image-upload'),
      reviewRoutes = require('./routes/reviews');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  if (process.env.NODE_ENV !== 'production') {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  }
});

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1', imageUploadRoutes);
app.use('/api/v1/reviews', reviewRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log('I am running!');
});
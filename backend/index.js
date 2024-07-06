const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user');
const slotRouter = require('./routes/slot');
const bookingRouter = require('./routes/booking');


// Replace the following URI with your MongoDB connection string
const MONGODB_URI = 'mongodb://127.0.0.1:27017/firstdb';
const PORT = 5000;

const app = express();
const allowedOrigin = 'http://localhost:5173';

const corsOptions = {
  origin: allowedOrigin,
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));



// Middleware
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/slot', slotRouter);
app.use('/api/booking', bookingRouter);


// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo');
const app = express();

// Configure CORS with specific origins
const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:3000', 'http://127.0.0.1:5000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/todos', todoRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

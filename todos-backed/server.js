const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

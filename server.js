const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Essential Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON data from frontend forms

// 1. Trainees Route
const traineesRouter = require('./routes/trainees');
app.use('/api/trainees', traineesRouter);

// 2. Machine Learning Route
const mlRoutes = require('./routes/ml_Routes');
app.use('/api/ml', mlRoutes);

// 3. Dashboard Stats Route
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalTrainees: 1250,
    placedTrainees: 980,
    activeCourses: 14,
    avgWageIncrease: "24%"
  });
});

app.get('/', (req, res) => {
  res.send('SIH Backend API is running...');
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Global Error Logging
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION:', err);
});
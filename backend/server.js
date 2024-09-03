const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const routes = require('./routes'); // Import the centralized routes

app.use(cors()); // Use cors middleware to allow cross-origin requests
app.use(morgan('dev')); // Use morgan for logging
app.use(express.json()); // Middleware to parse JSON bodies

// routes의 index.js에서 정의한 라우터를 사용
app.use('/api', routes);

// server의 status를 확인하는 라우터
app.get('/status', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
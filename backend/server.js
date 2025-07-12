require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const swapRoutes = require('./routes/swapRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./utils/errorHandler');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', skillRoutes);
app.use('/api', swapRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', notificationRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
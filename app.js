const express = require('express');
const mongoose = require('mongoose');
const contestRoutes = require('./Routes/contestRoutes');
//const aptitudeRoutes = require('./Routes/aptitudeRoute');
const feedbackRoutes = require('./Routes/feedbackRouter');
const participantRoutes = require('./Routes/participantRoutes')

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hms', {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => consoles.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api', contestRoutes);
//app.use('/api', aptitudeRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', participantRoutes);


// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the serverS
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

connectDB();

///Init MiddleWare
app.use(express.json({ extended: false }));

///Define Routes
app.use('/api/users', require('./DEVCONNECTOR/api/users'));
app.use('/api/auth', require('./DEVCONNECTOR/api/auth'));
app.use('/api/profile', require('./DEVCONNECTOR/api/profile'));
app.use('/api/seker', require('./DEVCONNECTOR/api/seker'));
app.use('/api/sekers', require('./DEVCONNECTOR/api/sekers'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

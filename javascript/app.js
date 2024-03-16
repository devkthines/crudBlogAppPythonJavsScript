const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Use the defined routes
app.use('/api', routes);

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
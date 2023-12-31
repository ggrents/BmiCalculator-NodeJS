const express = require('express');

// Create an express application
const app = express();

// Create a root route with a GET method
app.get('/', (req, res) => {
  // Send the words "Hello World" as the response
  res.send('Hello World');
});

// Spin up the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
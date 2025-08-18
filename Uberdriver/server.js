// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'build' directory (where React app will be built)
app.use(express.static(path.join(__dirname, 'build')));

// Any other API routes would go here if this were a fullstack app
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Hello from API!' });
// });

// For any other requests, serve the React app's index.html
// This ensures client-side routing works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Access the app at http://localhost:${port}`);
});

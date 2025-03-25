const express = require('express');
const errorHandler = require('./errorHandler');

const app = express();

// ...existing code for routes and middleware...

// Use the error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

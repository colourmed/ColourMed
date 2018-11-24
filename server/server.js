require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { loginRequired } = require('./middleware/auth');

// Handlers
const errorHandler = require('./handlers/public/error.js');

// Routes
const authRoutes = require('./routes/public/auth.js');

const publicRobeRoutes = require('./routes/public/robes.js');
const publicFeaturedRoutes = require('./routes/public/featured.js');

const adminRobeRoutes = require('./routes/admin/robes.js');
const adminFeaturedRoutes = require('./routes/admin/featured.js');

const app = express();
const port = process.env.PORT || 5000;

// To be changed for production.
let corsOrigin = '';

if (process.env.NODE_ENV !== 'production') {
  corsOrigin = 'http://localhost:3000';
}

app.use(cors({ origin: corsOrigin }));
app.use(bodyParser.json());

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/robes', publicRobeRoutes);
app.use('/api/featured', publicFeaturedRoutes);

// Admin routes
app.use('/api/admin/robes', loginRequired, adminRobeRoutes);
app.use('/api/admin/featured', loginRequired, adminFeaturedRoutes);

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));

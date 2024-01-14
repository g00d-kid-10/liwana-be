require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
    exposedHeaders: ['Authorization', 'Content-Type'],
  })
);

const connectDB = require('./config/db');

// const swaggerSetup = require('./docs/swagger');
// const passport = require('passport');
// const googleAuthSetup = require('./config/passport');

// Import the seed function
// const { seedDatabase } = require('./seed');
// const { NotFoundError } = require('./utils/errorClass');

app.use(express.json());

// Call the connectDB function to establish the database connection
connectDB()
  // .then(
  //   // Seed the database (if needed)
  //   seedDatabase()
  // )
  // .catch(console.dir);
// Include Swagger documentation
// swaggerSetup(app);

// Initialize Passport
// app.use(passport.initialize());

// Response middleware
const extendResponse = require('./middleware/extendResponse');
app.use(extendResponse);

// Mount the user routes
// app.use('/api/users', userRoutes);
// Register authentication routes
// app.use('/auth', authRoutes);
// Register the articles route
// app.use('/api/articles', articleRoutes);
// Register the comments route
// app.use('/api/articles/:articleId/comments', validateArticle, commentRoutes);
// app.use('/api/categories', categoryRoutes);

// Homepage response
app.get('/', (req, res) => {
  res.status(200).json({ message: 'You are at home page' });
});

// Fallback not found page
app.all('*', async (req, res) => {
  throw new NotFoundError('Page Not Found');
});

// Error handler
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port http://localhost:${process.env.PORT}`);
});

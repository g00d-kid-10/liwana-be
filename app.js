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
// const { errorHandler } = require('./middleware/errorHandler');

// Import the seed function
// const { seedDatabase } = require('./seed');
// const { NotFoundError } = require('./utils/errorClass');
// const extendResponse = require('./middleware/extendResponse');

// app.use(express.json());

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

// Apply the extendResponse middleware
// app.use(extendResponse);

// Mount the user routes
// app.use('/api/users', userRoutes);
// Register authentication routes
// app.use('/auth', authRoutes);
// Register the articles route
// app.use('/api/articles', articleRoutes);
// Register the comments route
// app.use('/api/articles/:articleId/comments', validateArticle, commentRoutes);
// app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'You are at home page' });
});

app.all('*', async (req, res) => {
  throw new NotFoundError('Page Not Found');
});

// setup error handler
// app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port http://localhost:${process.env.PORT}`);
});

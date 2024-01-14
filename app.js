require('dotenv').config();
const express = require('express');

const cors = require('cors');
require('express-async-errors');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });

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
connectDB();
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

const Image = require('./data/models/image');
// Endpoint for uploading an image
app.post('/api/images/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Save image information to MongoDB using Mongoose
    const image = new Image({ image: req.file.buffer });
    const savedImage = await image.save();

    // Send a success response
    res.json({ message: 'Image uploaded successfully', objectId: savedImage._id });
  } catch (error) {
    // Handle database or other errors
    res.status(500).json({ error: 'Failed to store image in database' });
  }
});

// Endpoint for retrieving an image by ObjectId
app.get('/api/images/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    // Retrieve the image by ObjectId
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Set the response content type to image/jpeg (adjust accordingly)
    res.contentType('image/jpeg');

    // Send the image buffer as the response
    res.send(image.image);
  } catch (error) {
    // Handle database or other errors
    res.status(500).json({ error: 'Failed to retrieve the image from the database' });
  }
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

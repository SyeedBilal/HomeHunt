const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const upload = require('./utils/multer');

// Enable CORS
app.use(cors());

// Import database connection
const { connectToDatabase } = require('./utils/database');

// Import session configuration
const sessionConfig = require('./utils/session');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionConfig);
app.use(upload.single('photoUrl')); // Ensure the field name matches the form input name(interceptor request looks for the filed photoUrl)

// Other imports
const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const errorsControllers = require('./controllers/errors');
const rootDir = require('./utils/pathutils');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// Routes
app.use(userRouter);
app.use('/host', hostRouter);
app.use(authRouter);

// Error handling
app.use(errorsControllers.pageNotFound);

// MongoDB connection and server start
const PORT = 3000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });

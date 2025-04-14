

Welcome to **Home Hunt**, an Airbnb-inspired web application built with Node.js, Express.js, and MongoDB. This project allows users to register as guests or hosts, browse homes, manage listings, and more.

## Features

**Guest Features:**
- Browse available homes.
- View detailed information about homes.
- Add homes to favorites.
- ⚠️ **Booking homes (Currently not functional)**

**Host Features:**
- Add new homes to the platform.
- Edit or delete existing home listings.
- View a list of homes they have registered.

**Authentication:**
- User registration with validation.
- Login and logout functionality.
- Session-based authentication.

**Other Features:**
- Responsive design using EJS templates and CSS.
- File uploads for home images using Multer.
- MongoDB integration for data storage.

## Tech Stack

- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Frontend:** [EJS (Embedded JavaScript Templates)](https://ejs.co/), CSS
- **Database:** [MongoDB](https://www.mongodb.com/) ([Mongoose ODM](https://mongoosejs.com/))
- **File Uploads:** [Multer](https://github.com/expressjs/multer)
- **Session Management:** [express-session](https://github.com/expressjs/session) with MongoDB session store
- **Validation:** [express-validator](https://express-validator.github.io/)

## Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/home-hunt.git](https://github.com/your-username/home-hunt.git)
   cd home-hunt
2.Install dependencies:
npm install

3.Set up MongoDB:

Create a MongoDB cluster on MongoDB Atlas or run a local instance.
Update the connection URI in your config/database.js or .env file (create one if it doesn't exist).

4.Start the application:
npm start

## File Structure 
Home-Hunt/
├── controllers/         # Application logic (e.g., authentication, home management)
├── models/              # Mongoose schemas for MongoDB
├── public/              # Static assets (CSS, images)
├── routes/              # Route definitions
├── utils/               # Utility functions (e.g., database connection, multer config)
├── views/               # EJS templates for rendering pages
├── config/              # Configuration files (e.g., database connection)
├── app.js               # Main application entry point
├── package.json         # Project metadata and dependencies
└── .gitignore           # Files and directories to ignore in Git

## Key Files
app.js: Main entry point of the application.
routes/: Defines routes for users, hosts, and authentication.
controllers/: Contains logic for handling requests and responses.
views/: EJS templates for rendering the frontend.
utils/multer.js: Configures file uploads for home images.
config/database.js (or .env): Contains MongoDB connection details.


> ⚠️ **Note**: Booking functionality is not implemented yet and is planned for a future update.




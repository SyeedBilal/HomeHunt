Home Hunt 
Welcome to Home Hunt, an Airbnb-inspired web application built with Node.js, Express.js, and MongoDB. This project allows users to register as guests or hosts, browse homes, manage bookings, and more.

**Features**
Guest Features:
Browse available homes.
View detailed information about homes.
Add homes to favorites.
Book homes.
Host Features:
Add new homes to the platform.
Edit or delete existing home listings.
View a list of homes they have registered.
Authentication:
User registration with validation.
Login and logout functionality.
Session-based authentication.
Other Features:
Responsive design using EJS templates and CSS.
File uploads for home images using Multer.
MongoDB integration for data storage.


**Tech Stack**
Backend: Node.js, Express.js
Frontend: EJS (Embedded JavaScript Templates), CSS
Database: MongoDB (Mongoose ODM)
File Uploads: Multer
Session Management: express-session with MongoDB session store
Validation: express-validator

**Installation**
1:clone repository 
git clone https://github.com/your-username/home-hunt.git
cd home-hunt
2: install dependencies 
npm install
Set up MongoDB:

3:Create a MongoDB cluster.
Update the connection URI in database.js.
4:Start the application:
npm start

**File Structure**

Home-Hunt/
├── controllers/         # Application logic (e.g., authentication, home management)
├── models/              # Mongoose schemas for MongoDB
├── public/              # Static assets (CSS, images)
├── routes/              # Route definitions
├── utils/               # Utility functions (e.g., database connection, multer config)
├── views/               # EJS templates for rendering pages
├── app.js               # Main application entry point
├── package.json         # Project metadata and dependencies
└── .gitignore           # Files and directories to ignore in Git

Key Files
app.js: Main entry point of the application.
routes/: Defines routes for users, hosts, and authentication.
controllers/: Contains logic for handling requests and responses.
views/: EJS templates for rendering the frontend.
utils/multer.js: Configures file uploads for home images.


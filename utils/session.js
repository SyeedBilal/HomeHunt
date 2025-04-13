const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const DB_Path = "mongodb+srv://syeedbilalkirmaney:Programming.in1@mongodbairbnb.wik5q.mongodb.net/airbnb?retryWrites=true&w=majority&appName=MONGODBAIRBNB";

const store = new MongoDbStore({
  uri: DB_Path,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
});

// Handle store errors
store.on('error', function(error) {
  console.log('Session store error:', error);
});

const sessionConfig = session({
  secret: 'Session Airbnb Secret',
  resave: false,
  saveUninitialized: false, // Changed to false to comply with GDPR
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
});

module.exports = sessionConfig;
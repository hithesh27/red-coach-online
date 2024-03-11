const mongoose=require('mongoose');

mongoose.connect(process.env.mongo_url,{ useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected',()=> console.log('mongodb connection established'))

db.on('error',()=>console.log('mongodb connection failed'))

module.exports=db;
/*const mongoose = require('mongoose');

// Define your MongoDB connection URL. Make sure to replace 'process.env.mongo_url' with your actual MongoDB connection string.
const mongoUrl = process.env.mongo_url;

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose connection instance
const db = mongoose.connection;

// Event listeners for database connection
db.on('connected', () => console.log('MongoDB connection established'));
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.on('disconnected', () => console.log('MongoDB connection disconnected'));

// Export the mongoose connection instance for use in other files
module.exports = db; */
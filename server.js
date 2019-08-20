// Required Modules
const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cors = require("cors");

// Instanced Modules
const app = express();

// System Variables
const PORT = proccess.env.PORT || 4000;

// MIDDLEWARE //

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Custom Logger
app.use((req, res, next) => {
  const log = {
    url: req.url,
    method: req.method,
    requestedAt: new Date().toLocaleString()
  };
  console.log(
    `method: ${log.method} - url: ${log.url} - time: ${log.requestedAt}`
  );
  next();
});

// User Session
app.use(
  session({
    secret: "Gotta catch em all",
    resave: false,
    saveUninitialized: false // Only save session if a property has been added to req.session
  })
);

// Handle Cors
const corsOptions = {
  origin: ["http://localhost:3000"], // string or array
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

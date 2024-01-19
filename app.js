const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swaggerOptions');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Passport
const initializePassport = require('./passport-config');
initializePassport(passport);

// Middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      passport.authenticate('jwt', { session: false })(req, res, next);
    });
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');


app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);


const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});


app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on http://localhost:${PORT}`);
});

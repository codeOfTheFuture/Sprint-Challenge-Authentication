const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');
const Users = require('./routes-model');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;

  const hashPassword = bcrypt.hashSync(user.password, 14);

  user.password = hashPassword;

  Users.add(user)
    .then(newUser => {
      res.status(201).json({ id: newUser.id, username: newUser.username });
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  // implement user login
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `${user.username} is now logged in`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username,
  };

  const jwtSecret =
    process.env.JWT_SECRET ||
    'add a .env file to root of project with the JWT_SECRET variable';

  const jwtOptions = {
    expiresIn: '1d',
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

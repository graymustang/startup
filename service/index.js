
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//middleware
app.use(express.json());
app.use(cookieParser());

//temporary storage
let users = [];
let rounds = [];

//API router
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/test', (_req, res) => {
  res.send({ msg: 'Roundly service is running' });
});

//Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof password !== 'string' || !password) {
    return res.status(400).send({ msg: 'Email and password required' });
  }

  if (await findUser('email', email)) {
    return res.status(409).send({ msg: 'Existing user' });
  }

  const user = await createUser(email, password);

  setAuthCookie(res, user.token);
  res.send({ email: user.email });
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).send({ msg: 'Email and password required' });
  }

  const user = await findUser('email', email);

  if (user && await bcrypt.compare(password, user.password)) {
    user.token = uuidv4();
    setAuthCookie(res, user.token);
    return res.send({ email: user.email });
  }

  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout the current user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (user) {
    delete user.token;
  }

  res.clearCookie(authCookieName);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Roundly service listening on port ${port}`);
});

const authCookieName = 'token';

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuidv4(),
  };

  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((user) => user[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}
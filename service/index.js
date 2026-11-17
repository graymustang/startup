const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb")
const fs = require("node:fs");
const path = require("node:path")

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000
const authCookieName = "token"

app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))

const apiRouter = express.Router()
app.use("/api", apiRouter)

let users
let rounds

apiRouter.get("/test", (_req, res) => {
  res.send({ msg: "Roundly service is running" })
});

//create new account, hash password
apiRouter.post("/auth/create", async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" ||!email.trim() || typeof password !== "string" || !password) {
    return res.status(400).send({ msg: "Email and password required" })
  }

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);
  const token = uuidv4();

  try {
    const result = await users.insertOne({email: normalizedEmail, passwordHash, token, createdAt: new Date()});

    setAuthCookie(res, token);
    res.send({ email: normalizedEmail, id: result.insertedId.toString() })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({ msg: "Existing user" })
    }
    throw error
  }
});

//log in an existing account and persist the new token
apiRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).send({ msg: "Email and password required" });
  }

  const user = await users.findOne({ email: email.trim().toLowerCase() });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const token = uuidv4();
    await users.updateOne({ _id: user._id }, { $set: { token } });
    setAuthCookie(res, token);
    return res.send({ email: user.email, id: user._id.toString() });
  }

  res.status(401).send({ msg: "Unauthorized" });
});

//remove login token when log out
apiRouter.delete("/auth/logout", async (req, res) => {
  const token = req.cookies[authCookieName]
  if (token) {
    await users.updateOne({ token }, { $unset: { token: "" } })
  }

  res.clearCookie(authCookieName, {
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName]
  const user = token ? await users.findOne({ token }) : null

  if (!user) {
    return res.status(401).send({ msg: "Unauthorized" })
  }

  req.user = user
  next()
};

//return only this users rounds
apiRouter.get("/rounds", verifyAuth, async (req, res) => {
  const userRounds = await rounds.find({ userId: req.user._id.toString() }, { projection: { _id: 0 } }).sort({ date: -1 }).toArray()

  res.send(userRounds);
});

//save round in mongodb for current user
apiRouter.post("/rounds", verifyAuth, async (req, res) => {
  const { course, score, date, fairways, putts } = req.body

  if (
    typeof course !== "string" ||
    !course.trim() ||
    !Number.isInteger(score) ||
    score <= 0 ||
    typeof date !== "string" ||
    !date.trim() ||
    (fairways != null &&
      (!Number.isInteger(fairways) || fairways < 0 || fairways > 100)) ||
    (putts != null && (!Number.isInteger(putts) || putts < 0))
  ) {
    return res.status(400).send({ msg: "Invalid round data" })
  }

  const newRound = {
    id: uuidv4(),
    userId: req.user._id.toString(),
    userEmail: req.user.email,
    date: date.trim(),
    course: course.trim(),
    score,
    fairways: fairways ?? null,
    putts: putts ?? null,
    createdAt: new Date(),
  };

  await rounds.insertOne(newRound)
  res.status(201).send(newRound)
});

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).send({ msg: "API endpoint not found" })
  }

  res.sendFile("index.html", { root: "public" })
});

app.use((error, _req, res, _next) => {
  console.error("Request failed:", error)
  res.status(500).send({ msg: "Server error" })
});

function loadDatabaseConfig() {
  const configPath = path.join(__dirname, "dbConfig.json")
  let fileConfig = {}

  if (fs.existsSync(configPath)) {
    fileConfig = JSON.parse(fs.readFileSync(configPath, "utf8"))
  }

  const connectionString =
    process.env.DB_CONNECTION_STRING || fileConfig.connectionString
  const dbName = process.env.DB_NAME || fileConfig.dbName

  if (!connectionString || !dbName) {
    throw new Error(
      "Set connectionString and dbName in service/dbConfig.json or DB_CONNECTION_STRING and DB_NAME environment variables.",
    );
  }

  return { connectionString, dbName }
}

async function start() {
  const { connectionString, dbName } = loadDatabaseConfig()
  const mongoClient = new MongoClient(connectionString)
  await mongoClient.connect()

  const database = mongoClient.db(dbName)
  users = database.collection("users")
  rounds = database.collection("rounds")
  await users.createIndex({ email: 1 }, { unique: true })
  await users.createIndex({ token: 1 }, { sparse: true })
  await rounds.createIndex({ userId: 1, date: -1 })

  app.listen(port, () => {
    console.log(
      `Roundly service listening on port ${port}; connected to MongoDB database ${dbName}`,
    );
  });
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
  });
}

start().catch((error) => {
  console.error("Unable to start Roundly service:", error.message)
  process.exit(1);
});

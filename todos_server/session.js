import express from "express";
import session from "express-session";
import redis from "redis";
import redisStore from "connect-redis";

const app = express();

const RedisStore = redisStore(session);

const redisClient = redis.createClient({
  port: 6379,
  host: "localhost",
});

// Middleware

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "topSecret",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // in milliseconds
    },
  })
);

// login

app.post("/login", (request, response) => {
  const { email, password } = request;

  req.session.clientId = "abc123";
  req.session.myNum = 5;

  res.json("you are now logged in");
});

//

app.use((req, res, next) => {
    if (!req.session || !req.session.clientId) {
        const err = new Error('You shall not pass');
        err.statusCode = 401;
        next(err);
    }
    next();
});

// 5. plug in all routes that the user can only access if logged in
app.get('/profile', (req, res) => {
    res.json(req.session);
});

app.listen(8080, () => console.log('server is running on port 8080'));
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// ------- Connection to database ---------

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "Todos",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la BDD :", err);
  } else {
    console.log("Connecté à la BDD");
  }
});

// ------ CRUD ---------

app.get("/get-todo", (req, res) => {
  connection.query("SELECT * FROM Todo", (err, result) => {
    if (err) throw err;
    // const data = JSON.parse(result)
    // console.log(data);
    res.send(result);
  });
});

app.post("/add-todo", (request, response) => {
  const newTodo = request.body.newTodo;
  connection.query(
    `INSERT INTO Todo (title, details) VALUES ('${newTodo.title}','${newTodo.details}')`,
    (err, result) => {
      if (err) {
        return console.log(err);
        } else {
        return console.log('newTodo added to database.');;
      }
    }
  );
});

app.delete("/delete-todo/:id", (request, response) => {
  const id = request.params.id;
  connection.query(`DELETE FROM Todo WHERE id = ${id}`, (err, result) => {
    if (err) throw err;
    response.send(`Todo with id = ${id} deleted`);
  });
});

app.listen(PORT, () => console.log(`Le serveur ecoute sur la port ${PORT}.`));

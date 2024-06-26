import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const PORT = 7777;

// Middlewares

app.use(express.json());
app.use(cors());

// ------- Connection to database ---------

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "todos",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la BDD :", err);
  } else {
    console.log("Connecté à la BDD");
  }
});

// ------ CRUD ---------

// TODO : - modifier gestion des erreurs
//        - créer des models

app.get("/todos", (req, res) => {
  connection.query("SELECT * FROM Todo", (err, result) => {
    if (err) throw err;
    console.log(" GET request ==> Todos fetched");
    res.send(result);
  });
});

app.post("/todos", (request, response) => {
  const newTodo = request.body.newTodo;
  connection.query(
    `INSERT INTO Todo (title, details, date_limite) VALUES ('${newTodo.title}','${newTodo.details}','${newTodo.date}')`,
    (err, result) => {
      if (err) throw err;
      response.send("todo added to database");
    }
  );
});

app.delete("/todos/:id", (request, response) => {
  const id = request.params.id;
  connection.query(`DELETE FROM Todo WHERE id = ${id}`, (err, result) => {
    if (err) throw err;
    console.log(`Todo with id = ${id} deleted`);
    response.send("Todo deleted");
  });
});

app.put("/todos/:id", (request, response) => {
  const id = request.params.id;
  const updatedTodo = request.body.updatedTodo;
  connection.query(
    `UPDATE Todo SET title = '${updatedTodo.title}', details = '${updatedTodo.details}' WHERE id = ${id}`,
    (err, result) => {
      if (err) throw err;
      console.log("Todo updated");
      response.send("Todo updated");
    }
  );
});

app.listen(PORT, () =>
  console.log(`Le serveur ecoute sur http://localhost:${PORT}`)
);

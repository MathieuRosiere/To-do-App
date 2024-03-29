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
        return console.log("newTodo added to database.");
      }
    }
  );
});

app.delete("/delete-todo/:id", (request, response) => {
  const id = request.params.id;
  connection.query(`DELETE FROM Todo WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Todo with id = ${id} deleted`);
    }
  });
});

app.put("/edit-todo/:id", (request, response) => {
  const id = request.params.id;
  const updatedTodo = request.body.updatedTodo;
  connection.query(
    `UPDATE Todo SET title = '${updatedTodo.title}', details = '${updatedTodo.details}' WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Todo updated');
      }
    }
  );
});

app.listen(PORT, () => console.log(`Le serveur ecoute sur le port ${PORT}.`));

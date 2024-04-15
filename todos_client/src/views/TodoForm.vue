<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";
import { v4 as newId } from "uuid";

const dialog = document.getElementById("myDialog");

const store = useTodoStore();
const { todos } = storeToRefs(store);



const newTodo = reactive({
  title: "",
  details: "",
});

// Ajout de la nouvelle todo au store.
// const todoPostHandler = () => {
//   const Todo = { id: newId(), ...newTodo };
//   todos.value.push(Todo);
//   console.log(todos.value);
//   showSuccess.value = true;
//   newTodo.title = "";
//   newTodo.details = "";
// };

const todoPostHandler = async () => {
  await axios.post("http://localhost:7777/add-todo", {
    newTodo,
  });  
};


</script>

<template>
  <main>
    <h3>Add a new todo...</h3>
    <form action="#" @submit.prevent="todoPostHandler">
      <div class="label-input">
        <label for="title">Title :</label>
        <input v-model="newTodo.title" type="text" id="title" />
      </div>
      <div class="label-input">
        <label for="desc">Description :</label>
        <textarea
          v-model="newTodo.details"
          name="desc"
          id="desc"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <button @click="dialogHandler()">Submit</button>
    </form>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

form {
  width: 40%;
  height: 70%;
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  overflow: auto;
}

.label-input {
  display: flex;
  flex-flow: column nowrap;
}

textarea {
  resize: none;
}
</style>

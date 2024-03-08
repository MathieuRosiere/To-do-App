<script setup>
import axios from "axios";
import { reactive } from "vue";

const newTodo = reactive({
  title: "",
  details: "",
});

const todoPostHandler = async () => {
  await axios.post("http://localhost:3000/add-todo", {
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
    <button>Submit</button>
  </form>
  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
}

.label-input {
  display: flex;
  flex-flow: column nowrap;
}

</style>

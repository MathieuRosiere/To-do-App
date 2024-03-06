<script setup>
import axios from "axios";
import { ref, reactive } from "vue";

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
  <form action="#" @submit.prevent="todoPostHandler">
    <div class="label&input">
      <label for="title">Title :</label>
      <input v-model="newTodo.title" type="text" id="title" />
    </div>
    <div class="label&input">
      <label for="desc">Description :</label>
      <textarea
        v-model="newTodo.details"
        name="desc"
        id="desc"
        cols="30"
        rows="10"
      ></textarea>
    </div>
    <button>Submit</button>
  </form>
</template>

<style scoped></style>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";

const todosDetails = ref([]);

onMounted(async () => {
  const result = await axios.get("http://localhost:3000/get-todo");
  todosDetails.value = result.data;
});

const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/delete-todo/${id}`);
};
</script>

<template>
  <div v-for="t in todosDetails">
    <p>{{ t.id }}</p>
    <p>{{ t.title }}</p>
    <p>{{ t.details }}</p>
    <button @click="deleteTodo(t.id)">Delete</button>
  </div>
</template>

<style scoped></style>

<script setup>
import ModalEdit from "@/components/ModalEdit.vue";
import axios from "axios";
import { onMounted, onUpdated } from "vue";
import { ref } from "vue";

const todosDetails = ref([]);
const modalDisplay = ref("");

onMounted(async () => {
  const result = await axios.get("http://localhost:3000/get-todo");
  todosDetails.value = result.data;
});

// onUpdated(async () => {
//   const result = await axios.get("http://localhost:3000/get-todo");
//   todosDetails.value = result.data;
// });

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3000/delete-todo/${id}`);
};

const startEditHandler = () => {
    modalDisplay.value = "edit";
}
</script>

<template>
  <main>
  <div class="todo" v-for="t in todosDetails">
    <p>{{ t.title }}</p>
    <p>{{ t.details }}</p>
    <button @click="deleteTodo(t.id)">Delete</button>
    <button @click="startEditHandler">Edit</button>
    <ModalEdit v-if="modalDisplay === 'edit'" :todoID="t.id" @closeModal="modalDisplay = ''"/>
  </div>
  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
}

div.todo {
  display: flex;
  align-items: center;
}

p {
  margin-right: 5px;
}
</style>

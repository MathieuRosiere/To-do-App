<script setup>
import ModalEdit from "@/components/ModalEdit.vue";
import axios from "axios";
import { onMounted, onUpdated } from "vue";
import { ref, Transition } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";

const store = useTodoStore();
const { todos } = storeToRefs(store);

const todosDetails = ref([]);

const modalDisplay = ref("");

onMounted(async () => {
  const result = await axios.get("http://localhost:7777/get-todo");
  console.log(result);
  todosDetails.value = result.data;
});

// onUpdated(async () => {
//   const result = await axios.get("http://localhost:3000/get-todo");
//   todosDetails.value = result.data;
// });

// const deleteTodo = (id) => {
//   todos.value = todos.value.filter((t) => t.id !== id);
// };

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:7777/delete-todo/${id}`);
};

const startEditHandler = () => {
  modalDisplay.value = "edit";
};
</script>

<template>
  <main>
    <div class="todo" v-for="t in todosDetails">
      <p>{{ t.title }}</p>
      <p>{{ t.details }}</p>
      <button @click="deleteTodo(t.id)">Delete</button>
      <button @click="startEditHandler">Edit</button>
      <Transition name = 'modal'>
        <ModalEdit
          v-if="modalDisplay === 'edit'"
          :todo="t"
          @closeModal="modalDisplay = ''"
        />
      </Transition>
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

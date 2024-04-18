<script setup>
import ModalEdit from "@/components/ModalEdit.vue";
import { ref, Transition } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useTodoStore();
const { todos } = storeToRefs(store);
const { deleteTodo } = store;
const router = useRouter();

const modalDisplay = ref("");

const startEditHandler = () => {
  modalDisplay.value = "edit";
};
</script>

<template>
  <main>
    <div v-if="todos.length === 0" class="empty-list">
      <p>Aucune Todo n'a été enregistrée.</p>
      <button @click="router.replace({ path: '/add' })">
        Ajouter une Todo
      </button>
    </div>
    <div v-else class="todo" v-for="t in todos">
      <p>{{ t.title }}</p>
      <p>{{ t.details }}</p>
      <p>{{ t.date_limite }}</p>
      <button @click="deleteTodo(t.id)">Delete</button>
      <button @click="startEditHandler">Edit</button>

      <Transition name="modal">
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

div.empty-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
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

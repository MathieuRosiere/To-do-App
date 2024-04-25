<script setup>
import ModalEdit from "@/components/ModalEdit.vue";
import { ref, Transition } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useTodoStore();
const { todos } = storeToRefs(store);
const { removeTodo } = store;
const router = useRouter();

const modalDisplay = ref("");

const TodoToEdit = ref();

const startEditHandler = (todo) => {
  modalDisplay.value = "edit";
  TodoToEdit.value = todo;
};


</script>

<template>
  <main class="display-flex-row">
    <div v-if="todos.length === 0" class="empty-list display-flex-col">
      <p>Aucune Todo n'a été enregistrée.</p>
      <button @click="router.replace({ path: '/add' })">
        Ajouter une Todo
      </button>
    </div>
    <div v-else class="card display-flex-col" v-for="todo in todos">
      <p>{{ todo.title }}</p>
      <p>{{ todo.date_limite }}</p>
      <div>
        <label for="done">Terminé :</label>
        <input type="checkbox" name="done" id="done" v-model="todo.done"  />
      </div>
      <div class="display-flex-row">
        <button :disabled="!todo.done" class="btn-delete" @click="removeTodo(todo.id)">
          Supprimer
        </button>
        <button @click="startEditHandler(todo)">Details</button>
      </div>
    </div>

    <Transition name="modal">
      <ModalEdit
        v-if="modalDisplay === 'edit'"
        :todo="TodoToEdit"
        @closeModal="modalDisplay = ''"
      />
    </Transition>
  </main>
</template>

<style scoped>
main {
  justify-content: center;
  gap: 2%;
  overflow: auto;
}

div.empty-list {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

div.card {
  width: 15%;
  height: 30%;
  border: 2px solid var(--font-color-white);
  border-radius: 1rem 0 1rem 0;
  padding: 5px;
  align-items: center;
  justify-content: space-between;

  > div {
    gap: 5px;

    > .btn-delete {
      background-color: var(--btn-close);
    }
  }
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

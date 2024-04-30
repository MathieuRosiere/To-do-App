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
  <div class="wrapper display-flex-row">
    <!-- Conditionnal rendering : If todos[] is empty -->
    <div v-if="todos.length === 0" class="empty-list display-flex-col">
      <p>Aucune Todo n'a été enregistrée.</p>
      <button class="btn-valid" @click="router.replace({ path: '/add' })">
        Ajouter une Todo
      </button>
    </div>

    <!-- Conditionnal rendering : If todos[] !empty -->
    <div v-else class="card display-flex-col" v-for="todo in todos">
      <p class="p-title">{{ todo.title }}</p>
      <p>{{ todo.date_limite.replace("T", " ") }}</p>
      <div class="checkbox display-flex-row">
        <label for="done">Terminé :</label>
        <input type="checkbox" name="done" id="done" v-model="todo.done" />
      </div>
      <div class="display-flex-row buttons">
        <button
          :disabled="!todo.done"
          class="btn-close"
          @click="removeTodo(todo.id)"
        >
          Supprimer
        </button>
        <button class="btn-valid" @click="startEditHandler(todo)">
          Details
        </button>
      </div>
    </div>

    <Transition name="modal">
      <ModalEdit
        v-if="modalDisplay === 'edit'"
        :todo="TodoToEdit"
        @closeModal="modalDisplay = ''"
      />
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2%;
}

:nth-child(odd of div.card) {
  background-color:  #d3caca;
}

div.empty-list {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

div.card {
  background-color: var(--darker-bg-color);
  box-shadow: 10px 10px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 15%;
  height: 30%;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  transition: transform 300ms ease;

  > div {
    gap: 5px;

    .btn-close:disabled {
      background-color: var(--btn-close);
      opacity: 0.5;
      box-shadow: none;
      transform: none;
    }
  }

  > div.checkbox {
    gap: 5px;
  }

  > div.buttons {
    gap: 1rem;
  }
}

div.card:hover {
  transform: scale(1.1);
}

.p-title {
  font-weight: bold;
}

.p-title::first-letter {
  text-transform: capitalize;
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

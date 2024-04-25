<script setup>
import { reactive } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const store = useTodoStore();
const { editTodo } = store;

const props = defineProps(["todo"]);
const emits = defineEmits(["closeModal"]);

const updatedTodo = reactive({
  title: props.todo.title,
  details: props.todo.details,
  date_limite: props.todo.date_limite
});
</script>

<template>
  <div class="modal-bg" @click.self="$emit('closeModal')">
    <div class="modal-content display-flex-col">
      <form
        class="display-flex-col"
        action="#"
        @submit.prevent="editTodo(props.todo.id, updatedTodo)"
      >
        <div class="label-input">
          <label for="title">Modifier Titre :</label>
          <input v-model="updatedTodo.title" type="text" id="title" />
        </div>
        <div class="label-input">
          <label for="desc">Modifier Description :</label>
          <textarea
            v-model="updatedTodo.details"
            name="desc"
            id="desc"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div class="label-input">
        <label for="date">Modifier date :</label>
        <input id="date" type="datetime-local" v-model="updatedTodo.date_limite">
        </div>
        <button>Valider</button>
      </form>
      <button class="btn-close" @click="$emit('closeModal')">Fermer</button>
    </div>
  </div>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  place-content: center;
}

.modal-content {
  justify-content: space-between;
  height: 600px;
  padding: 5%;
  box-sizing: border-box;
  border: solid 4px var(--font-color-white);
  border-radius: 1rem;
  aspect-ratio: 1 / 1;
  background-color: var(--body-bg-color);
}

form {
  gap: 5px;

  > button {
    width: 60%;
    align-self: center;
  }
}

.btn-close {
  background-color: var(--btn-close);
  margin-top: 0.5rem;
  width: 40%;
  align-self: flex-end;
}

.label-input {
  display: flex;
  flex-flow: column nowrap;
}

textarea {
  resize: none;
}
</style>
